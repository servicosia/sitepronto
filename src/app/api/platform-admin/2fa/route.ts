import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/client';
import { isAuthorizedAdmin, validateSameOrigin, getAdminPassword } from '@/lib/security/auth';
import { generateTotpSecret, getTotpUri, getTotpQrCodeUrl, verifyTotpCode } from '@/lib/security/totp';
import { timingSafeCompare } from '@/lib/security/crypto';

export async function GET(req: NextRequest) {
  try {
    if (!(await isAuthorizedAdmin(req))) {
      return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
    }

    let config = await prisma.platformSecurity.findUnique({
      where: { id: 'singleton' },
    });

    if (!config) {
      config = await prisma.platformSecurity.create({
        data: { id: 'singleton', admin2faEnabled: false },
      });
    }

    if (config.admin2faEnabled) {
      return NextResponse.json({
        enabled: true,
        message: '2FA está ativo para o Admin Master.',
      });
    }

    // Se não estiver ativado, gera um segredo e QR Code temporário para configuração
    const tempSecret = generateTotpSecret(20);
    const uri = getTotpUri('admin@sitepronto.com.br', 'SitePronto Master', tempSecret);
    const qrCodeUrl = getTotpQrCodeUrl(uri);

    return NextResponse.json({
      enabled: false,
      secret: tempSecret,
      uri,
      qrCodeUrl,
    });
  } catch (error: any) {
    console.error('[Admin2FA] Erro ao carregar status:', error);
    return NextResponse.json({ error: 'Erro ao verificar 2FA: ' + error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!(await isAuthorizedAdmin(req)) || !validateSameOrigin(req)) {
      return NextResponse.json({ error: 'Não autorizado ou origem inválida.' }, { status: 401 });
    }

    const body = await req.json();
    const { action, secret, code, password } = body;

    let config = await prisma.platformSecurity.findUnique({
      where: { id: 'singleton' },
    });

    if (!config) {
      config = await prisma.platformSecurity.create({
        data: { id: 'singleton', admin2faEnabled: false },
      });
    }

    if (action === 'enable') {
      if (!secret || !code) {
        return NextResponse.json({ error: 'Segredo e código de 6 dígitos são obrigatórios.' }, { status: 400 });
      }

      // Validação do código TOTP fornecido
      const isValid = verifyTotpCode(code, secret);
      if (!isValid) {
        return NextResponse.json(
          { error: 'Código de 6 dígitos incorreto ou expirado. Verifique o relógio do seu dispositivo e tente novamente.' },
          { status: 400 }
        );
      }

      // Ativa o 2FA com o segredo validado
      await prisma.platformSecurity.update({
        where: { id: 'singleton' },
        data: {
          admin2faEnabled: true,
          admin2faSecret: secret,
        },
      });

      await prisma.auditEvent.create({
        data: {
          eventType: 'ADMIN_2FA_ENABLED',
          metadata: { timestamp: new Date().toISOString() },
        },
      });

      return NextResponse.json({
        success: true,
        enabled: true,
        message: 'Autenticação em 2 Etapas (2FA) ativada com sucesso para o Admin Master!',
      });
    }

    if (action === 'disable') {
      // Para desativar, exige código TOTP atual ou a senha master
      let isAuthorizedToDisable = false;

      if (code && config.admin2faSecret) {
        isAuthorizedToDisable = verifyTotpCode(code, config.admin2faSecret);
      } else if (password) {
        const correctPassword = getAdminPassword();
        isAuthorizedToDisable = timingSafeCompare(password, correctPassword);
      }

      if (!isAuthorizedToDisable) {
        return NextResponse.json(
          { error: 'Código 2FA ou senha master incorreta para desativar a proteção.' },
          { status: 400 }
        );
      }

      await prisma.platformSecurity.update({
        where: { id: 'singleton' },
        data: {
          admin2faEnabled: false,
          admin2faSecret: null,
        },
      });

      await prisma.auditEvent.create({
        data: {
          eventType: 'ADMIN_2FA_DISABLED',
          metadata: { timestamp: new Date().toISOString() },
        },
      });

      return NextResponse.json({
        success: true,
        enabled: false,
        message: 'Autenticação em 2 Etapas desativada.',
      });
    }

    return NextResponse.json({ error: 'Ação inválida.' }, { status: 400 });
  } catch (error: any) {
    console.error('[Admin2FA] Erro na requisição:', error);
    return NextResponse.json({ error: 'Erro ao processar 2FA: ' + error.message }, { status: 500 });
  }
}
