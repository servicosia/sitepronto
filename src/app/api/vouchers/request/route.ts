import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/client';
import { sendAdminVoucherRequestAlert } from '@/lib/email/service';
import { checkRateLimit } from '@/lib/rate-limit/limiter';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const limit = await checkRateLimit('voucher_request', ip, 5, 600);
    if (!limit.success) {
      return NextResponse.json(
        { error: 'Muitas solicitações enviadas em curto intervalo. Aguarde alguns instantes.' },
        { status: 429, headers: { 'Retry-After': String(limit.retryAfter || 60) } }
      );
    }

    const body = await req.json();
    const { name, email, siteType, message } = body;

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ error: 'Por favor, informe seu nome completo.' }, { status: 400 });
    }

    if (!email || typeof email !== 'string' || !email.includes('@') || !email.includes('.')) {
      return NextResponse.json({ error: 'Por favor, informe um endereço de e-mail válido.' }, { status: 400 });
    }

    if (!siteType || typeof siteType !== 'string' || siteType.trim().length < 2) {
      return NextResponse.json({ error: 'Por favor, informe o tipo de site ou seu ramo de atividade.' }, { status: 400 });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanSiteType = siteType.trim();
    const cleanMessage = message && typeof message === 'string' ? message.trim() : null;

    // Salva a solicitação no banco
    const voucherRequest = await prisma.voucherRequest.create({
      data: {
        name: cleanName,
        email: cleanEmail,
        siteType: cleanSiteType,
        message: cleanMessage,
        status: 'PENDING',
      },
    });

    // Registra evento de auditoria
    await prisma.auditEvent.create({
      data: {
        eventType: 'VOUCHER_REQUESTED',
        metadata: {
          requestId: voucherRequest.id,
          name: cleanName,
          email: cleanEmail,
          siteType: cleanSiteType,
        },
      },
    });

    // Dispara alerta para o administrador (alemaia@alemaia.com.br)
    try {
      const emailResult = await sendAdminVoucherRequestAlert({
        name: cleanName,
        email: cleanEmail,
        siteType: cleanSiteType,
        message: cleanMessage,
        requestId: voucherRequest.id,
      });

      if (!emailResult.success) {
        console.warn('[VoucherRequest] Alerta ao admin falhou, mas solicitação foi salva:', emailResult.error);
      }
    } catch (emailErr) {
      console.error('[VoucherRequest] Erro ao disparar e-mail de alerta:', emailErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Sua solicitação de voucher foi recebida com sucesso! Em breve você receberá as instruções e seu código por e-mail.',
      requestId: voucherRequest.id,
    });
  } catch (err: any) {
    console.error('[VoucherRequest] Erro ao processar:', err);
    return NextResponse.json(
      { error: 'Não foi possível registrar sua solicitação no momento. Tente novamente mais tarde.' },
      { status: 500 }
    );
  }
}
