import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/client';
import { createVoucher } from '@/lib/vouchers/service';
import { sendClientVoucherEmail } from '@/lib/email/service';
import { isAuthorizedAdmin, validateSameOrigin } from '@/lib/security/auth';

export async function GET(req: NextRequest) {
  try {
    if (!isAuthorizedAdmin(req)) {
      return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
    }

    const requests = await prisma.voucherRequest.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, requests });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!isAuthorizedAdmin(req) || !validateSameOrigin(req)) {
      return NextResponse.json({ error: 'Não autorizado ou requisição inválida.' }, { status: 401 });
    }

    const { action, requestId, voucherId } = await req.json();

    if (action === 'approve_and_send') {
      const request = await prisma.voucherRequest.findUnique({
        where: { id: requestId },
      });

      if (!request) {
        return NextResponse.json({ error: 'Solicitação não encontrada.' }, { status: 404 });
      }

      // Se já possui voucher gerado, apenas reenviamos
      let voucherCode = request.voucherCode;
      if (!voucherCode) {
        const voucher = await createVoucher({
          clientName: request.name,
          clientEmail: request.email,
          description: `Solicitação: ${request.siteType}`,
          plan: 'STANDARD_PRO',
        });
        voucherCode = voucher.code;
      }

      // Dispara e-mail com o voucher para o cliente
      const emailResult = await sendClientVoucherEmail({
        clientName: request.name,
        clientEmail: request.email,
        voucherCode: voucherCode,
        siteType: request.siteType,
      });

      // Atualiza o status da solicitação
      const updated = await prisma.voucherRequest.update({
        where: { id: requestId },
        data: {
          status: 'APPROVED',
          voucherCode,
          sentAt: new Date(),
        },
      });

      return NextResponse.json({
        success: true,
        message: emailResult.success
          ? `Voucher ${voucherCode} gerado e enviado com sucesso para ${request.email}!`
          : `Voucher ${voucherCode} gerado, mas houve falha no envio do e-mail: ${emailResult.error}`,
        voucherCode,
        emailSent: emailResult.success,
        request: updated,
      });
    }

    if (action === 'resend') {
      const request = await prisma.voucherRequest.findUnique({
        where: { id: requestId },
      });

      if (!request || !request.voucherCode) {
        return NextResponse.json({ error: 'Voucher não associado a esta solicitação ainda.' }, { status: 400 });
      }

      const emailResult = await sendClientVoucherEmail({
        clientName: request.name,
        clientEmail: request.email,
        voucherCode: request.voucherCode,
        siteType: request.siteType,
      });

      await prisma.voucherRequest.update({
        where: { id: requestId },
        data: { sentAt: new Date() },
      });

      return NextResponse.json({
        success: true,
        message: emailResult.success
          ? `Voucher ${request.voucherCode} reenviado para ${request.email} com sucesso!`
          : `Falha ao reenviar: ${emailResult.error}`,
        emailSent: emailResult.success,
      });
    }

    if (action === 'resend_voucher') {
      // Reenvio direto a partir do Voucher ID existente
      const voucher = await prisma.voucher.findUnique({
        where: { id: voucherId },
      });

      if (!voucher || !voucher.clientEmail) {
        return NextResponse.json({ error: 'Voucher não possui e-mail de cliente cadastrado.' }, { status: 400 });
      }

      const emailResult = await sendClientVoucherEmail({
        clientName: voucher.clientName || 'Cliente',
        clientEmail: voucher.clientEmail,
        voucherCode: voucher.code,
        siteType: voucher.description || 'Profissional',
      });

      return NextResponse.json({
        success: true,
        message: emailResult.success
          ? `Voucher ${voucher.code} enviado para ${voucher.clientEmail}!`
          : `Falha ao enviar: ${emailResult.error}`,
        emailSent: emailResult.success,
      });
    }

    if (action === 'delete') {
      await prisma.voucherRequest.delete({
        where: { id: requestId },
      });
      return NextResponse.json({ success: true, message: 'Solicitação removida com sucesso.' });
    }

    return NextResponse.json({ error: 'Ação inválida.' }, { status: 400 });
  } catch (err: any) {
    console.error('[PlatformAdmin VoucherRequests] Erro:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
