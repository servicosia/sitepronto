import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/client';

// Excluir Projeto/Site da Plataforma, Vercel e Neon
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

    // 1. Exclusão na Vercel (caso exista VERCEL_TOKEN configurado)
    if (process.env.VERCEL_TOKEN && site.vercelProjectId) {
      try {
        await fetch(`https://api.vercel.com/v9/projects/${site.vercelProjectId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
          },
        });
      } catch (vercelErr) {
        console.warn('Falha ao remover projeto na Vercel:', vercelErr);
      }
    }

    // 2. Exclusão no Neon (caso exista NEON_API_KEY configurada)
    if (process.env.NEON_API_KEY && site.neonProjectId) {
      try {
        await fetch(`https://console.neon.tech/api/v2/projects/${site.neonProjectId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${process.env.NEON_API_KEY}`,
            Accept: 'application/json',
          },
        });
      } catch (neonErr) {
        console.warn('Falha ao remover banco no Neon:', neonErr);
      }
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
