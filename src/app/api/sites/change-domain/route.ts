import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/client';
import { VercelProvider } from '@/lib/providers/deployment/vercel';
import { NeonProvider } from '@/lib/providers/database/neon';
import { CloudflareProvider } from '@/lib/providers/domains/cloudflare';
import { checkRateLimit } from '@/lib/rate-limit/limiter';
import { isAuthorizedAdmin, validateSameOrigin } from '@/lib/security/auth';

export async function POST(req: NextRequest) {
  try {
    if (!(await isAuthorizedAdmin(req)) || !validateSameOrigin(req)) {
      return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
    }
    const body = await req.json();
    const { siteId, newDomain } = body;

    if (!siteId || !newDomain) {
      return NextResponse.json(
        { error: 'Parâmetros siteId e newDomain são obrigatórios.' },
        { status: 400 }
      );
    }

    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const limit = await checkRateLimit('change_domain', `${ip}:${siteId}`, 5, 3600);
    if (!limit.success) {
      return NextResponse.json(
        { error: 'Muitas tentativas de alteração de domínio. Aguarde antes de tentar novamente.' },
        { status: 429, headers: { 'Retry-After': String(limit.retryAfter || 3600) } }
      );
    }

    // Normaliza o novo domínio
    const rawClean = newDomain.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '');
    const { rootDomain } = CloudflareProvider.normalizeDomain(rawClean);

    if (!rootDomain || !rootDomain.includes('.')) {
      return NextResponse.json(
        { error: 'Formato de domínio inválido. Ex: meudominio.com.br' },
        { status: 400 }
      );
    }

    const site = await prisma.site.findUnique({
      where: { id: siteId },
    });

    if (!site) {
      return NextResponse.json({ error: 'Site não encontrado.' }, { status: 404 });
    }

    const oldDomain = site.customDomain;
    const targetProject = site.vercelProjectId || site.slug;

    // 1. Desassocia o domínio antigo se necessário
    const vercel = new VercelProvider();
    if (oldDomain && oldDomain !== rootDomain) {
      try {
        await vercel.removeDomainFromProject(targetProject, oldDomain);
        await vercel.removeDomainFromProject(targetProject, `www.${oldDomain}`);
      } catch (err: any) {
        console.warn('[ChangeDomain] Aviso ao desassociar:', err.message);
      }
    }

    try {
      await vercel.addDomainToProject(targetProject, rootDomain);
      await vercel.addDomainToProject(targetProject, `www.${rootDomain}`);
    } catch (err: any) {
      console.warn('[ChangeDomain] Aviso ao adicionar domínio na Vercel:', err.message);
    }

    // 2. Cloudflare DNS
    const cloudflare = new CloudflareProvider();
    if (oldDomain && oldDomain !== rootDomain) {
      try {
        await cloudflare.deleteZoneByDomain(oldDomain);
      } catch (err: any) {
        console.warn('[ChangeDomain] Aviso ao remover zona antiga Cloudflare:', err.message);
      }
    }
    const cfZone = await cloudflare.getOrCreateZone(rootDomain);
    await cloudflare.configureVercelDnsRecords(cfZone.zoneId, rootDomain);

    // 3. Shardcloud / Neon
    const neon = new NeonProvider();
    if (site.neonProjectId) {
      try {
        await neon.updateProjectName(site.neonProjectId, rootDomain);
      } catch (err: any) {
        console.warn('[ChangeDomain] Aviso no Neon/Shardcloud:', err.message);
      }
    }

    // 4. Atualiza banco central
    const updatedSite = await prisma.site.update({
      where: { id: site.id },
      data: {
        customDomain: rootDomain,
        domainStatus: 'PENDING_DNS',
      },
    });

    await prisma.auditEvent.create({
      data: {
        eventType: 'DOMAIN_MIGRATED',
        ipHash: ip,
        metadata: { siteId: site.id, oldDomain, newDomain: rootDomain },
      },
    });

    return NextResponse.json({
      success: true,
      message: `Domínio atualizado com sucesso para ${rootDomain}. As alterações foram aplicadas na infraestrutura e nos servidores de DNS.`,
      domain: rootDomain,
      oldDomain: oldDomain || null,
      nameServers: cfZone.nameServers,
      status: updatedSite.domainStatus,
      dnsRecords: [
        { type: 'A', name: '@', value: '76.76.21.21' },
        { type: 'CNAME', name: 'www', value: 'cname.vercel-dns.com' },
      ],
    });
  } catch (error: any) {
    console.error('[ChangeDomain] Erro ao alterar domínio:', error);
    return NextResponse.json(
      { error: 'Falha ao migrar domínio: ' + error.message },
      { status: 500 }
    );
  }
}
