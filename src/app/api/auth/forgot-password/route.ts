import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/db/client';
import { checkRateLimit } from '@/lib/rate-limit/limiter';
import { sha256 } from '@/lib/security/crypto';
import { sendPasswordResetEmail } from '@/lib/email/service';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    
    // Rate Limit: 3 solicitações por 15 minutos por IP
    const limit = await checkRateLimit('forgot_password', ip, 3, 900);
    if (!limit.success) {
      return NextResponse.json(
        { error: 'Muitas solicitações de recuperação em curto intervalo. Aguarde antes de tentar novamente.' },
        { status: 429, headers: { 'Retry-After': String(limit.retryAfter || 900) } }
      );
    }

    const body = await req.json();
    const { email } = body;

    if (!email || typeof email !== 'string' || !email.includes('@') || !email.includes('.')) {
      return NextResponse.json({ error: 'Por favor, informe um endereço de e-mail válido.' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Busca o usuário na base
    const user = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    // Resposta padrão idêntica para evitar enumeração de usuários (OWASP Best Practice)
    const genericResponse = {
      success: true,
      message: 'Se o e-mail informado estiver cadastrado em nossa plataforma, enviamos um link seguro de recuperação com instruções para cadastrar sua nova senha.',
    };

    if (!user) {
      return NextResponse.json(genericResponse);
    }

    // Gera token criptográfico de alta entropia (32 bytes = 256 bits)
    const rawToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = sha256(rawToken);
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hora de validade

    // Invalida tokens anteriores não utilizados do mesmo e-mail
    await prisma.passwordResetToken.updateMany({
      where: { email: cleanEmail, usedAt: null },
      data: { usedAt: new Date() },
    });

    // Salva o novo token com hash
    await prisma.passwordResetToken.create({
      data: {
        email: cleanEmail,
        tokenHash,
        expiresAt,
      },
    });

    // Registra evento de auditoria
    await prisma.auditEvent.create({
      data: {
        userId: user.id,
        eventType: 'PASSWORD_RESET_REQUESTED',
        ipHash: ip,
        userAgent: req.headers.get('user-agent'),
      },
    });

    // Monta URL de recuperação
    const appUrl = (process.env.APP_URL || 'https://sitepronto.shardweb.app').replace(/\/$/, '');
    const resetUrl = `${appUrl}/recuperar-senha?token=${rawToken}`;

    // Dispara e-mail via Resend
    try {
      await sendPasswordResetEmail({
        clientName: user.name,
        clientEmail: user.email,
        resetUrl,
      });
    } catch (emailErr) {
      console.error('[ForgotPassword] Erro ao disparar e-mail:', emailErr);
    }

    return NextResponse.json(genericResponse);
  } catch (error: any) {
    console.error('[ForgotPassword] Erro interno:', error);
    return NextResponse.json(
      { error: 'Não foi possível processar a recuperação de senha no momento. Tente novamente mais tarde.' },
      { status: 500 }
    );
  }
}
