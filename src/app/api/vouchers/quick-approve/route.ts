import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/client';
import { createVoucher } from '@/lib/vouchers/service';
import { sendClientVoucherEmail } from '@/lib/email/service';
import { verifyVoucherApprovalToken } from '@/lib/security/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const token = searchParams.get('token');

    if (!id || !token) {
      return renderHtmlResponse({
        success: false,
        title: 'Parâmetros Inválidos',
        message: 'O link de aprovação está incompleto ou inválido.',
      }, 400);
    }

    const request = await prisma.voucherRequest.findUnique({
      where: { id },
    });

    if (!request) {
      return renderHtmlResponse({
        success: false,
        title: 'Solicitação Não Encontrada',
        message: 'Não localizamos a solicitação de voucher correspondente no banco de dados.',
      }, 404);
    }

    // Valida assinatura de segurança resistente a falsificação
    const isValidToken = verifyVoucherApprovalToken(request.id, request.email, token);
    if (!isValidToken) {
      return renderHtmlResponse({
        success: false,
        title: 'Acesso Não Autorizado',
        message: 'O token de segurança da solicitação é inválido ou expirou.',
      }, 403);
    }

    // Se já foi aprovado anteriormente, exibe confirmação informativa
    if (request.status === 'APPROVED' && request.voucherCode) {
      return renderHtmlResponse({
        success: true,
        alreadyProcessed: true,
        title: 'Voucher Já Foi Aprovado Anteriormente',
        message: `Esta solicitação já foi aprovada e o voucher foi enviado para ${request.email}.`,
        clientName: request.name,
        clientEmail: request.email,
        voucherCode: request.voucherCode,
        siteType: request.siteType,
      });
    }

    // 1. Gera o voucher no sistema
    let voucherCode = request.voucherCode;
    if (!voucherCode) {
      const voucher = await createVoucher({
        clientName: request.name,
        clientEmail: request.email,
        description: `Solicitação Aprovada via E-mail: ${request.siteType}`,
        plan: 'STANDARD_PRO',
      });
      voucherCode = voucher.code;
    }

    // 2. Dispara e-mail com voucher diretamente para o cliente
    const emailResult = await sendClientVoucherEmail({
      clientName: request.name,
      clientEmail: request.email,
      voucherCode: voucherCode,
      siteType: request.siteType,
    });

    // 3. Atualiza o status no banco de dados
    await prisma.voucherRequest.update({
      where: { id: request.id },
      data: {
        status: 'APPROVED',
        voucherCode: voucherCode,
        sentAt: new Date(),
      },
    });

    // 4. Registra auditoria
    await prisma.auditEvent.create({
      data: {
        eventType: 'VOUCHER_APPROVED_VIA_EMAIL',
        metadata: {
          requestId: request.id,
          name: request.name,
          email: request.email,
          voucherCode,
          emailSent: emailResult.success,
        },
      },
    });

    return renderHtmlResponse({
      success: true,
      alreadyProcessed: false,
      title: '🎉 Voucher Aprovado e Enviado!',
      message: `O voucher foi gerado com sucesso e o e-mail de ativação já foi entregue para ${request.email}.`,
      clientName: request.name,
      clientEmail: request.email,
      voucherCode: voucherCode,
      siteType: request.siteType,
    });

  } catch (error: any) {
    console.error('[QuickApprove] Erro ao aprovar voucher:', error);
    return renderHtmlResponse({
      success: false,
      title: 'Erro ao Processar Aprovação',
      message: error.message || 'Ocorreu um erro interno ao processar a aprovação.',
    }, 500);
  }
}

function renderHtmlResponse(params: {
  success: boolean;
  alreadyProcessed?: boolean;
  title: string;
  message: string;
  clientName?: string;
  clientEmail?: string;
  voucherCode?: string;
  siteType?: string;
}, status = 200) {
  const appUrl = (process.env.APP_URL || 'https://sitepronto.shardweb.app').replace(/\/$/, '');
  const adminUrl = `${appUrl}/platform-admin`;

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${params.title} — SitePronto</title>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #090d16;
      color: #f8fafc;
      margin: 0;
      padding: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
    }
    .card {
      max-width: 540px;
      width: 100%;
      background: #0f172a;
      border: 1px solid #1e293b;
      border-radius: 24px;
      padding: 40px 32px;
      text-align: center;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    }
    .icon-badge {
      width: 64px;
      height: 64px;
      border-radius: 20px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      margin-bottom: 20px;
      background: ${params.success ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)'};
      border: 1px solid ${params.success ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'};
    }
    h1 {
      font-size: 24px;
      font-weight: 800;
      margin: 0 0 12px 0;
      color: #ffffff;
      letter-spacing: -0.5px;
    }
    p {
      color: #94a3b8;
      font-size: 14px;
      line-height: 1.6;
      margin: 0 0 24px 0;
    }
    .voucher-box {
      background: #1e293b;
      border: 2px dashed #3b82f6;
      border-radius: 16px;
      padding: 20px;
      margin: 24px 0;
    }
    .voucher-label {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #94a3b8;
      margin-bottom: 6px;
    }
    .voucher-code {
      font-family: 'Courier New', Courier, monospace;
      font-size: 24px;
      font-weight: 900;
      color: #38bdf8;
      letter-spacing: 2px;
    }
    .details {
      background: #090d16;
      border: 1px solid #1e293b;
      border-radius: 14px;
      padding: 16px;
      text-align: left;
      font-size: 13px;
      margin-bottom: 24px;
    }
    .details-row {
      display: flex;
      justify-content: space-between;
      padding: 6px 0;
      border-bottom: 1px solid #1e293b;
    }
    .details-row:last-child {
      border-bottom: none;
    }
    .details-label {
      color: #64748b;
    }
    .details-val {
      color: #f1f5f9;
      font-weight: 600;
    }
    .actions {
      display: flex;
      gap: 12px;
      justify-content: center;
      margin-top: 24px;
    }
    .btn {
      display: inline-block;
      padding: 12px 24px;
      border-radius: 12px;
      font-size: 13px;
      font-weight: 700;
      text-decoration: none;
      transition: all 0.2s;
    }
    .btn-primary {
      background: #2563eb;
      color: #ffffff;
    }
    .btn-primary:hover {
      background: #1d4ed8;
    }
    .btn-secondary {
      background: #1e293b;
      color: #cbd5e1;
    }
    .btn-secondary:hover {
      background: #334155;
      color: #ffffff;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon-badge">
      ${params.success ? '✅' : '⚠️'}
    </div>
    <h1>${params.title}</h1>
    <p>${params.message}</p>

    ${params.voucherCode ? `
      <div class="voucher-box">
        <div class="voucher-label">Código Gerado e Enviado</div>
        <div class="voucher-code">${params.voucherCode}</div>
      </div>
    ` : ''}

    ${params.clientName ? `
      <div class="details">
        <div class="details-row">
          <span class="details-label">Cliente:</span>
          <span class="details-val">${params.clientName}</span>
        </div>
        <div class="details-row">
          <span class="details-label">E-mail:</span>
          <span class="details-val">${params.clientEmail}</span>
        </div>
        ${params.siteType ? `
        <div class="details-row">
          <span class="details-label">Ramo / Nicho:</span>
          <span class="details-val">${params.siteType}</span>
        </div>
        ` : ''}
        <div class="details-row">
          <span class="details-label">Status:</span>
          <span class="details-val" style="color: #10b981;">Aprovado & E-mail Enviado</span>
        </div>
      </div>
    ` : ''}

    <div class="actions">
      <a href="${adminUrl}" class="btn btn-primary">Abrir Painel Admin</a>
      <a href="${appUrl}" class="btn btn-secondary">Ir para Início</a>
    </div>
  </div>
</body>
</html>`;

  return new NextResponse(html, {
    status,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
