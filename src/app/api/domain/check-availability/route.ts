import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    let domain = searchParams.get('domain')?.trim().toLowerCase() || '';

    if (!domain) {
      return NextResponse.json({ error: 'Parâmetro domain é obrigatório.' }, { status: 400 });
    }

    // Limpeza e normalização do domínio
    domain = domain.replace(/^https?:\/\//, '').replace(/\/.*$/, '').replace(/^www\./, '');

    // Se o usuário digitou sem extensão, assume .com.br como padrão
    if (!domain.includes('.')) {
      domain = `${domain}.com.br`;
    }

    // Consulta oficial ao Registro.br via endpoint AJAX/raw isavail
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(`https://registro.br/v2/ajax/avail/raw/${encodeURIComponent(domain)}`, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'SitePronto-DomainChecker/1.0',
        'Accept': 'application/json',
      },
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      return NextResponse.json({
        available: false,
        status: res.status,
        domain,
        message: 'Não foi possível consultar o Registro.br no momento.',
        registrationUrl: `https://registro.br/busca-dominio/?fqdn=${encodeURIComponent(domain)}`,
      });
    }

    const data = await res.json();
    const status = data.status;

    // Status Registro.br:
    // 0: Disponível
    // 1: Disponível com tickets concorrentes
    // 2: Já registrado
    // 3: Inválido
    // 4 / 5: Processo de liberação
    let available = false;
    let message = '';

    switch (status) {
      case 0:
        available = true;
        message = `O domínio ${domain} está disponível para registro imediato no Registro.br!`;
        break;
      case 1:
        available = true;
        message = `O domínio ${domain} está disponível (com concorrência no Registro.br).`;
        break;
      case 2:
        available = false;
        message = `O domínio ${domain} já está registrado. Se você já é o titular, pode utilizá-lo normalmente!`;
        break;
      case 3:
        available = false;
        const reasons = Array.isArray(data.reasons) ? data.reasons.join(', ') : 'Formato inválido';
        message = `Domínio inválido no Registro.br: ${reasons}.`;
        break;
      case 4:
      case 5:
        available = false;
        message = `O domínio ${domain} está em processo de liberação no Registro.br.`;
        break;
      default:
        available = false;
        message = `Status de registro: ${status}.`;
        break;
    }

    const suggestions = Array.isArray(data.suggestions)
      ? data.suggestions.slice(0, 6).map((ext: string) => {
          const prefix = domain.split('.')[0];
          return `${prefix}.${ext}`;
        })
      : [];

    return NextResponse.json({
      success: true,
      available,
      status,
      domain,
      fqdn: data.fqdn || domain,
      message,
      suggestions,
      registrationUrl: `https://registro.br/busca-dominio/?fqdn=${encodeURIComponent(domain)}`,
    });
  } catch (error: any) {
    console.warn('[CheckAvailability] Erro ao consultar Registro.br:', error.message);
    return NextResponse.json({
      success: false,
      available: false,
      message: 'Erro na conexão com Registro.br. Tente novamente.',
    }, { status: 500 });
  }
}
