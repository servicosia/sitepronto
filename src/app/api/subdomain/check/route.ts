import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/client';
import { checkRateLimit } from '@/lib/rate-limit/limiter';

const RESERVED_SUBDOMAINS = new Set([
  'api', 'admin', 'sitepronto', 'mail', 'www', 'app', 'ftp', 'smtp',
  'blog', 'painel', 'master', 'status', 'ns1', 'ns2', 'dns', 'webmail',
  'cpanel', 'whm', 'autodiscover', 'portal', 'dev', 'staging', 'teste'
]);

export async function GET(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const limit = await checkRateLimit('subdomain_check', ip, 40, 60);
    if (!limit.success) {
      return NextResponse.json(
        { error: 'Muitas consultas realizadas em sequência. Aguarde alguns segundos.' },
        { status: 429, headers: { 'Retry-After': String(limit.retryAfter || 10) } }
      );
    }

    const { searchParams } = new URL(req.url);
    const raw = searchParams.get('subdomain')?.trim().toLowerCase() || '';

    // Remove qualquer protocolo, barra ou sufixo
    const clean = raw.replace(/^https?:\/\//, '').replace(/\.servicos\.ia\.br$/, '').replace(/[^a-z0-9-]/g, '').replace(/^-|-$/g, '');

    if (!clean || clean.length < 3) {
      return NextResponse.json({
        available: false,
        subdomain: clean,
        message: 'O subdomínio deve conter pelo menos 3 caracteres (letras, números ou hífen).',
      }, { status: 400 });
    }

    if (RESERVED_SUBDOMAINS.has(clean)) {
      return NextResponse.json({
        available: false,
        subdomain: clean,
        message: `O termo '${clean}' é reservado pelo sistema. Por favor, escolha outro nome.`,
      });
    }

    // 1. Verifica no banco de dados do SitePronto
    const fqdn = `${clean}.servicos.ia.br`;
    const existingSite = await prisma.site.findFirst({
      where: {
        OR: [
          { customDomain: fqdn },
          { slug: clean },
          { slug: `site-${clean}` },
        ],
      },
    });

    if (existingSite) {
      return NextResponse.json({
        available: false,
        subdomain: clean,
        fqdn,
        message: `O endereço '${fqdn}' já está reservado por outro cliente. Escolha outro nome.`,
      });
    }

    const token = process.env.CLOUDFLARE_SERVICOS_TOKEN || process.env.CLOUDFLARE_API_TOKEN || '';
    const zoneId = process.env.CLOUDFLARE_SERVICOS_ZONE_ID || '';

    if (token && zoneId) {
      try {
        const cfRes = await fetch(
          `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records?name=${encodeURIComponent(fqdn)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        const cfData = await cfRes.json();
        if (cfData.success && cfData.result && cfData.result.length > 0) {
          return NextResponse.json({
            available: false,
            subdomain: clean,
            fqdn,
            message: `O endereço '${fqdn}' já possui apontamentos DNS ativos na rede. Escolha outro nome.`,
          });
        }
      } catch (cfErr: any) {
        console.warn('[SubdomainChecker] Erro ao consultar Cloudflare:', cfErr.message);
      }
    }

    return NextResponse.json({
      available: true,
      subdomain: clean,
      fqdn,
      message: `Excelente! '${fqdn}' está disponível para uso imediato!`,
    });
  } catch (err: any) {
    return NextResponse.json({ error: 'Erro ao verificar disponibilidade.', details: err.message }, { status: 500 });
  }
}
