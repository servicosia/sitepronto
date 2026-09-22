import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/client';
import { VercelProvider } from '@/lib/providers/deployment/vercel';
import { NeonProvider } from '@/lib/providers/database/neon';
import { CloudflareProvider } from '@/lib/providers/domains/cloudflare';

// Excluir Projeto/Site da Plataforma, Vercel, Neon e Cloudflare
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const siteId = searchParams.get('id');

    if (!siteId) {
      return NextResponse.json({ error: 'ID do site é obrigatório' }, { status: 400 });
    }

    const site = await prisma.site.findUnique({
      where: { id: siteId },
    });

    if (!site) {
      return NextResponse.json({ error: 'Site não encontrado' }, { status: 404 });
    }

    // 1. Exclusão na Vercel
    const vercel = new VercelProvider();
    if (site.vercelProjectId) {
      await vercel.deleteProject(site.vercelProjectId);
    }
    if (site.slug && site.slug !== site.vercelProjectId) {
      await vercel.deleteProject(site.slug);
    }

    // 2. Exclusão no Neon
    const neon = new NeonProvider();
    if (site.neonProjectId) {
      await neon.deleteDatabase(site.neonProjectId);
    }

    // 3. Exclusão no Cloudflare
    const cloudflare = new CloudflareProvider();
    if (site.customDomain) {
      await cloudflare.deleteZoneByDomain(site.customDomain);
    }

    // 3. Exclui steps, jobs e o registro do Site no Banco Central
    await prisma.provisioningStep.deleteMany({ where: { siteId: site.id } });
    await prisma.provisioningJob.deleteMany({ where: { siteId: site.id } });
    await prisma.site.delete({ where: { id: site.id } });

    // 4. Se o voucher associado estiver vinculado, reseta para ISSUED
    if (site.voucherId) {
      await prisma.voucher.update({
        where: { id: site.voucherId },
        data: {
          status: 'ISSUED',
          redeemedAt: null,
          redeemedById: null,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Site e recursos associados excluídos com sucesso.',
    });
  } catch (error: any) {
    console.error('Delete site error:', error);
    return NextResponse.json({ error: 'Erro ao excluir site: ' + error.message }, { status: 500 });
  }
}
