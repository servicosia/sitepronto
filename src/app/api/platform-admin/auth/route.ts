import { NextRequest, NextResponse } from 'next/server';
import { timingSafeCompare } from '@/lib/security/crypto';
import { getAdminPassword, generateAdminSessionToken } from '@/lib/security/auth';
import { checkRateLimit } from '@/lib/rate-limit/limiter';
import { prisma } from '@/lib/db/client';
import { sendSecurityAlertEmail } from '@/lib/email/service';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';

    // Rate Limiting Rigoroso: Máximo 5 tentativas de login a cada 15 minutos
    const limit = await checkRateLimit('admin_login', ip, 5, 900);
    if (!limit.success) {
      // Registra evento de auditoria para tentativa de brute-force
      await prisma.auditEvent.create({
        data: {
          eventType: 'ADMIN_LOGIN_RATE_LIMITED',
          ipHash: ip,
          metadata: { ip, retryAfter: limit.retryAfter },
        },
      });

      // Dispara alerta por e-mail em tempo real para o administrador
      try {
        await sendSecurityAlertEmail({
          alertType: 'Força Bruta no Painel Master (Admin Login)',
          ip,
          userAgent: req.headers.get('user-agent'),
          details: `Bloqueio temporário de 15 minutos aplicado após 5 tentativas incorretas consecutivas.`,
        });
      } catch (emailErr) {
        console.error('[AdminAuth] Erro ao enviar alerta de segurança por e-mail:', emailErr);
      }

      return NextResponse.json(
        { error: 'Muitas tentativas de acesso incorretas. Acesso temporariamente bloqueado. Tente novamente em alguns minutos.' },
        { status: 429, headers: { 'Retry-After': String(limit.retryAfter || 900) } }
      );
    }

    const { password, totpCode } = await req.json();
    const correctPassword = getAdminPassword();

    // Comparação resistente a timing attacks
    const isValid = Boolean(password && timingSafeCompare(password, correctPassword));

    if (!isValid) {
      await prisma.auditEvent.create({
        data: {
          eventType: 'ADMIN_LOGIN_FAILED',
          ipHash: ip,
          userAgent: req.headers.get('user-agent'),
        },
      });

      return NextResponse.json({ error: 'Senha incorreta.' }, { status: 401 });
    }

    // Checa se o 2FA está ativado para o Admin Master
    const config = await prisma.platformSecurity.findUnique({
      where: { id: 'singleton' },
    });

    if (config?.admin2faEnabled && config.admin2faSecret) {
      const { verifyTotpCode } = await import('@/lib/security/totp');
      
      if (!totpCode || typeof totpCode !== 'string') {
        return NextResponse.json({
          requires2FA: true,
          message: 'Autenticação em 2 Etapas ativa. Insira o código de 6 dígitos do seu autenticador.',
        });
      }

      const isTotpValid = verifyTotpCode(totpCode, config.admin2faSecret);
      if (!isTotpValid) {
        await prisma.auditEvent.create({
          data: {
            eventType: 'ADMIN_2FA_FAILED',
            ipHash: ip,
            userAgent: req.headers.get('user-agent'),
          },
        });
        return NextResponse.json(
          { error: 'Código 2FA de 6 dígitos incorreto ou expirado. Tente novamente.', requires2FA: true },
          { status: 401 }
        );
      }
    }

    // Sucesso na autenticação
    const authCookieToken = generateAdminSessionToken();

    await prisma.auditEvent.create({
      data: {
        eventType: 'ADMIN_LOGIN_SUCCESS',
        ipHash: ip,
        userAgent: req.headers.get('user-agent'),
      },
    });

    const res = NextResponse.json({ success: true, message: 'Autenticado com sucesso.' });
    
    // Cookie seguro HttpOnly, SameSite=Strict
    res.cookies.set({
      name: 'platform_admin_session',
      value: authCookieToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 dias
    });

    return res;
  } catch (err: any) {
    console.error('[AdminAuth] Erro interno:', err);
    return NextResponse.json({ error: 'Erro de autenticação: ' + err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const res = NextResponse.json({ success: true, message: 'Desconectado.' });
  res.cookies.delete('platform_admin_session');
  return res;
}
