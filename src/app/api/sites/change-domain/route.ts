import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/client';
import { VercelProvider } from '@/lib/providers/deployment/vercel';
import { NeonProvider } from '@/lib/providers/database/neon';
import { CloudflareProvider } from '@/lib/providers/domains/cloudflare';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { siteId, newDomain } = body;

    if (!siteId || !newDomain) {
      return NextResponse.json(
        { error: 'Parâmetros siteId e newDomain são obrigatórios.' },
        { status: 400 }
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

    // ====================================================
    // 1. VERCEL: Remove domínio antigo e associa o novo
    // ====================================================
    const vercel = new VercelProvider();
    if (oldDomain && oldDomain !== rootDomain) {
      await vercel.removeDomainFromProject(targetProject, oldDomain);
      await vercel.removeDomainFromProject(targetProject, `www.${oldDomain}`);
    }
    await vercel.addDomainToProject(targetProject, rootDomain);
    await vercel.addDomainToProject(targetProject, `www.${rootDomain}`);

    // ====================================================
    // 2. CLOUDFLARE: Remove zona antiga e provisiona nova
    // ====================================================
    const cloudflare = new CloudflareProvider();
    if (oldDomain && oldDomain !== rootDomain) {
      await cloudflare.deleteZoneByDomain(oldDomain);
    }
    const cfZone = await cloudflare.getOrCreateZone(rootDomain);
    await cloudflare.configureVercelDnsRecords(cfZone.zoneId, rootDomain);

    // ====================================================
    // 3. NEON: Atualiza identificador do projeto
    // ====================================================
    const neon = new NeonProvider();
    if (site.neonProjectId) {
      await neon.updateProjectName(site.neonProjectId, rootDomain);
    }

    // ====================================================
    // 4. BANCO DE DADOS CENTRAL (Prisma Postgres)
    // ====================================================
    const updatedSite = await prisma.site.update({
      where: { id: site.id },
      data: {
        customDomain: rootDomain,
        domainStatus: 'PENDING_DNS',
      },
    });

    return NextResponse.json({
      success: true,
      message: `Domínio atualizado com sucesso para ${rootDomain}. As alterações foram aplicadas na Vercel, Neon e Cloudflare.`,
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
