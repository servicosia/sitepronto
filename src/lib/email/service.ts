interface SendEmailParams {
  to: string | string[];
  subject: string;
  html: string;
}

/**
 * Função utilitária para envio de e-mails via Resend API
 */
export async function sendEmail({ to, subject, html }: SendEmailParams): Promise<{ success: boolean; id?: string; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[Email] RESEND_API_KEY não configurada no ambiente.');
    return { success: false, error: 'RESEND_API_KEY não configurada.' };
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL || 'SitePronto <onboarding@resend.dev>';
  const recipients = Array.isArray(to) ? to : [to];

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey.trim()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: recipients,
        subject,
        html,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error('[Email] Erro retornado pela Resend:', data);
      return { success: false, error: data.message || 'Erro ao disparar e-mail via Resend.' };
    }

    return { success: true, id: data.id };
  } catch (err: any) {
    console.error('[Email] Falha na conexão com Resend:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Dispara alerta ao administrador (alemaia@alemaia.com.br) informando nova solicitação de voucher
 */
export async function sendAdminVoucherRequestAlert(request: {
  name: string;
  email: string;
  siteType: string;
  message?: string | null;
  requestId?: string;
}) {
  const adminEmail = 'alemaia@alemaia.com.br';
  const appUrl = (process.env.APP_URL || 'https://sitepronto.shardweb.app').replace(/\/$/, '');
  const adminPanelUrl = `${appUrl}/platform-admin`;

  const subject = `🔔 Nova Solicitação de Voucher - ${request.name} (${request.siteType})`;

  const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px; color: #0f172a; }
    .card { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .header { background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 32px 28px; text-align: center; color: #ffffff; }
    .badge { display: inline-block; background-color: #10b981; color: #064e3b; font-size: 11px; font-weight: 800; text-transform: uppercase; padding: 4px 12px; border-radius: 9999px; letter-spacing: 0.5px; margin-bottom: 12px; }
    .title { font-size: 22px; font-weight: 800; margin: 0; line-height: 1.2; }
    .subtitle { font-size: 13px; color: #94a3b8; margin-top: 6px; }
    .content { padding: 32px 28px; }
    .info-table { width: 100%; border-collapse: separate; border-spacing: 0; margin-bottom: 24px; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; }
    .info-table tr:not(:last-child) td { border-bottom: 1px solid #f1f5f9; }
    .info-label { width: 35%; padding: 14px 18px; font-size: 12px; font-weight: 700; color: #64748b; background-color: #f8fafc; text-transform: uppercase; letter-spacing: 0.5px; }
    .info-value { padding: 14px 18px; font-size: 14px; font-weight: 600; color: #1e293b; background-color: #ffffff; }
    .btn-container { text-align: center; margin: 32px 0 16px 0; }
    .btn { display: inline-block; background-color: #2563eb; color: #ffffff !important; text-decoration: none; font-weight: 700; font-size: 14px; padding: 14px 28px; border-radius: 12px; box-shadow: 0 4px 10px rgba(37,99,235,0.25); }
    .footer { text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; padding: 20px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="badge">Novo Lead / Solicitação</div>
      <h1 class="title">Pedido de Voucher Recebido</h1>
      <p class="subtitle">Um visitante solicitou um voucher para criação de site na home do SitePronto.</p>
    </div>
    <div class="content">
      <table class="info-table">
        <tr>
          <td class="info-label">Nome</td>
          <td class="info-value"><strong>${request.name}</strong></td>
        </tr>
        <tr>
          <td class="info-label">E-mail</td>
          <td class="info-value"><a href="mailto:${request.email}" style="color: #2563eb; text-decoration: none;">${request.email}</a></td>
        </tr>
        <tr>
          <td class="info-label">Tipo de Site</td>
          <td class="info-value"><span style="background-color: #e0f2fe; color: #0369a1; padding: 4px 8px; border-radius: 6px; font-size: 13px;">${request.siteType}</span></td>
        </tr>
        ${request.message ? `
        <tr>
          <td class="info-label">Observações</td>
          <td class="info-value">${request.message}</td>
        </tr>
        ` : ''}
        <tr>
          <td class="info-label">Data / Hora</td>
          <td class="info-value">${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</td>
        </tr>
      </table>

      <div class="btn-container">
        <a href="${adminPanelUrl}" class="btn">
          ⚡ Acessar Painel Master para Emitir Voucher
        </a>
      </div>
      <p style="font-size: 12px; text-align: center; color: #64748b; margin-top: 12px;">
        Você pode aprovar e disparar o voucher diretamente pelo painel administrativo em 1 clique.
      </p>
    </div>
    <div class="footer">
      SitePronto Fábrica de Sites • Notificação Automática do Sistema
    </div>
  </div>
</body>
</html>
  `;

  return sendEmail({
    to: adminEmail,
    subject,
    html,
  });
}

/**
 * Dispara e-mail com o código do voucher e link de ativação para o cliente
 */
export async function sendClientVoucherEmail(params: {
  clientName: string;
  clientEmail: string;
  voucherCode: string;
  siteType?: string;
}) {
  const appUrl = (process.env.APP_URL || 'https://sitepronto.shardweb.app').replace(/\/$/, '');
  const activateUrl = `${appUrl}/iniciar?voucher=${encodeURIComponent(params.voucherCode)}`;

  const subject = `🎉 Seu Voucher SitePronto está liberado! Ative seu site agora`;

  const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #0f172a; }
    .card { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 8px 24px rgba(0,0,0,0.06); }
    .header { background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 36px 32px; text-align: center; color: #ffffff; }
    .badge { display: inline-block; background-color: #ffffff; color: #1d4ed8; font-size: 12px; font-weight: 800; text-transform: uppercase; padding: 5px 14px; border-radius: 9999px; letter-spacing: 0.5px; margin-bottom: 12px; }
    .title { font-size: 24px; font-weight: 900; margin: 0; line-height: 1.25; }
    .subtitle { font-size: 14px; color: #dbeafe; margin-top: 8px; }
    .content { padding: 36px 32px; }
    .greeting { font-size: 16px; font-weight: 600; color: #334155; margin-bottom: 16px; }
    .voucher-box { background: linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%); border: 2px dashed #3b82f6; border-radius: 16px; padding: 24px; text-align: center; margin: 24px 0; }
    .voucher-label { font-size: 12px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 1px; margin-bottom: 8px; }
    .voucher-code { font-family: 'Courier New', Courier, monospace; font-size: 26px; font-weight: 900; color: #1d4ed8; letter-spacing: 2px; }
    .btn-container { text-align: center; margin: 28px 0; }
    .btn { display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff !important; text-decoration: none; font-weight: 800; font-size: 16px; padding: 16px 36px; border-radius: 14px; box-shadow: 0 4px 14px rgba(16,185,129,0.35); }
    .steps { background-color: #f8fafc; border-radius: 14px; padding: 20px; margin: 28px 0; border: 1px solid #e2e8f0; }
    .step-item { display: flex; align-items: flex-start; margin-bottom: 12px; font-size: 13px; color: #475569; }
    .step-num { background-color: #2563eb; color: #ffffff; border-radius: 50%; width: 22px; height: 22px; display: inline-flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 800; margin-right: 10px; shrink-0; }
    .footer { text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; padding: 24px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="badge">Acesso Exclusivo Liberado</div>
      <h1 class="title">Seu Voucher Está Pronto!</h1>
      <p class="subtitle">Parabéns! Sua solicitação para criação de site profissional foi aprovada.</p>
    </div>
    <div class="content">
      <div class="greeting">Olá, ${params.clientName}!</div>
      <p style="font-size: 14px; line-height: 1.6; color: #475569; margin: 0 0 16px 0;">
        Temos o prazer de liberar o seu voucher exclusivo para a criação do seu novo site ${params.siteType ? `no segmento de <strong>${params.siteType}</strong>` : ''}.
        Com o SitePronto, você terá um site profissional, moderno, otimizado para o Google e com subdomínio exclusivo incluso em apenas alguns minutos (com suporte opcional a domínio próprio .br).
      </p>

      <div class="voucher-box">
        <div class="voucher-label">Seu Código de Voucher</div>
        <div class="voucher-code">${params.voucherCode}</div>
      </div>

      <div class="btn-container">
        <a href="${activateUrl}" class="btn">
          🚀 Criar Meu Site Agora →
        </a>
      </div>

      <div class="steps">
        <div style="font-size: 13px; font-weight: 700; color: #1e293b; margin-bottom: 12px;">Como ativar em 3 passos simples:</div>
        <div class="step-item">
          <span class="step-num">1</span>
          <span>Clique no botão acima ou acesse o link de ativação exclusivo.</span>
        </div>
        <div class="step-item">
          <span class="step-num">2</span>
          <span>Responda a perguntas rápidas sobre os serviços e dados da sua empresa.</span>
        </div>
        <div class="step-item" style="margin-bottom: 0;">
          <span class="step-num">3</span>
          <span>A esteira inteligente gera a estrutura, textos, fotos e publica seu site!</span>
        </div>
      </div>

      <p style="font-size: 12px; color: #64748b; line-height: 1.5; text-align: center;">
        Ou copie e cole este link no seu navegador:<br>
        <a href="${activateUrl}" style="color: #2563eb; word-break: break-all;">${activateUrl}</a>
      </p>
    </div>
    <div class="footer">
      SitePronto • A esteira inteligente para o seu negócio na internet<br>
      Dúvidas? Entre em contato pelo e-mail contato@sitepronto.com.br.
    </div>
  </div>
</body>
</html>
  `;

  return sendEmail({
    to: params.clientEmail,
    subject,
    html,
  });
}

/**
 * Dispara e-mail de lembrete / redefinição de senha para usuário cadastrado
 */
export async function sendPasswordResetEmail(params: {
  clientName: string;
  clientEmail: string;
  resetUrl: string;
}) {
  const subject = `🔐 Lembrete e Redefinição de Senha — SitePronto`;

  const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #0f172a; }
    .card { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 8px 24px rgba(0,0,0,0.06); }
    .header { background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 36px 32px; text-align: center; color: #ffffff; }
    .badge { display: inline-block; background-color: #3b82f6; color: #ffffff; font-size: 12px; font-weight: 800; text-transform: uppercase; padding: 5px 14px; border-radius: 9999px; letter-spacing: 0.5px; margin-bottom: 12px; }
    .title { font-size: 22px; font-weight: 900; margin: 0; line-height: 1.25; }
    .content { padding: 36px 32px; }
    .btn-container { text-align: center; margin: 28px 0; }
    .btn { display: inline-block; background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: #ffffff !important; text-decoration: none; font-weight: 800; font-size: 15px; padding: 16px 32px; border-radius: 12px; box-shadow: 0 4px 14px rgba(37,99,235,0.3); }
    .notice { background-color: #fef3c7; border: 1px solid #fde68a; border-radius: 12px; padding: 14px; font-size: 12px; color: #92400e; margin-top: 24px; }
    .footer { text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; padding: 24px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="badge">Segurança da Conta</div>
      <h1 class="title">Lembrete de Senha de Acesso</h1>
    </div>
    <div class="content">
      <p style="font-size: 15px; font-weight: 600; color: #1e293b; margin-top: 0;">
        Olá, ${params.clientName || 'Cliente SitePronto'}!
      </p>
      <p style="font-size: 14px; line-height: 1.6; color: #475569;">
        Recebemos uma solicitação de lembrete e redefinição de senha para a sua conta associada ao e-mail <strong>${params.clientEmail}</strong>.
      </p>
      <p style="font-size: 14px; line-height: 1.6; color: #475569;">
        Para cadastrar uma nova senha e recuperar o acesso ao seu painel, clique no botão seguro abaixo:
      </p>

      <div class="btn-container">
        <a href="${params.resetUrl}" class="btn">
          🔒 Redefinir Minha Senha Agora →
        </a>
      </div>

      <div class="notice">
        <strong>Atenção:</strong> Por motivos de segurança, este link é válido por <strong>60 minutos</strong> e só pode ser utilizado uma única vez. Se você não solicitou esta redefinição, por favor ignore este e-mail. Sua senha atual permanecerá segura.
      </div>

      <p style="font-size: 12px; color: #64748b; line-height: 1.5; margin-top: 24px; word-break: break-all;">
        Se o botão não funcionar, copie e cole o seguinte link no seu navegador:<br>
        <a href="${params.resetUrl}" style="color: #2563eb;">${params.resetUrl}</a>
      </p>
    </div>
    <div class="footer">
      SitePronto • Suporte oficial: contato@sitepronto.com.br<br>
      © 2025 SitePronto Tecnologia.
    </div>
  </div>
</body>
</html>
  `;

  return sendEmail({
    to: params.clientEmail,
    subject,
    html,
  });
}
