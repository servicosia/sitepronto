import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/client';
import { checkRateLimit } from '@/lib/rate-limit/limiter';
import { sha256, hashPassword } from '@/lib/security/crypto';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';

    // Rate Limit: 5 tentativas por 15 minutos por IP
    const limit = await checkRateLimit('reset_password', ip, 5, 900);
    if (!limit.success) {
      return NextResponse.json(
        { error: 'Muitas tentativas de redefinição de senha. Aguarde alguns minutos antes de tentar novamente.' },
        { status: 429, headers: { 'Retry-After': String(limit.retryAfter || 900) } }
      );
    }

    const body = await req.json();
    const { token, newPassword } = body;

    if (!token || typeof token !== 'string') {
      return NextResponse.json({ error: 'Token de recuperação inválido ou ausente.' }, { status: 400 });
    }

    if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 8) {
      return NextResponse.json(
        { error: 'A nova senha deve ter no mínimo 8 caracteres com letras e números.' },
        { status: 400 }
      );
    }

    const tokenHash = sha256(token.trim());
    const now = new Date();

    // Busca o token ativo no banco
    const resetRecord = await prisma.passwordResetToken.findUnique({
      where: { tokenHash },
    });

    if (!resetRecord || resetRecord.usedAt || resetRecord.expiresAt < now) {
      return NextResponse.json(
        { error: 'O link de recuperação de senha é inválido ou já expirou. Solicite um novo lembrete.' },
        { status: 400 }
      );
    }

    // Busca o usuário associado
    const user = await prisma.user.findUnique({
      where: { email: resetRecord.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuário não localizado.' }, { status: 404 });
    }

    // Gera hash resistente com scrypt e salt aleatório
    const passwordHash = await hashPassword(newPassword);

    // Atualiza a senha do usuário
    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash },
    });

    // Invalida o token utilizado
    await prisma.passwordResetToken.update({
      where: { id: resetRecord.id },
      data: { usedAt: now },
    });

    // Revoga todas as sessões anteriores ativas do usuário para segurança total
    await prisma.authSession.updateMany({
      where: { userId: user.id, revokedAt: null },
      data: { revokedAt: now },
    });

    // Registra evento de auditoria
    await prisma.auditEvent.create({
      data: {
        userId: user.id,
        eventType: 'PASSWORD_RESET_SUCCESS',
        ipHash: ip,
        userAgent: req.headers.get('user-agent'),
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Senha redefinida com sucesso! Você já pode utilizar sua nova senha.',
    });
  } catch (error: any) {
    console.error('[ResetPassword] Erro interno:', error);
    return NextResponse.json(
      { error: 'Erro ao processar nova senha: ' + error.message },
      { status: 500 }
    );
  }
}
