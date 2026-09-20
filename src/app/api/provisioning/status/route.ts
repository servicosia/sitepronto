import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/client';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const siteId = searchParams.get('siteId');

    if (!siteId) {
      return NextResponse.json({ error: 'siteId é obrigatório' }, { status: 400 });
    }

    const site = await prisma.site.findUnique({
      where: { id: siteId },
      include: {
        steps: {
          orderBy: { startedAt: 'asc' },
        },
        jobs: {
          orderBy: { startedAt: 'desc' },
          take: 1,
        },
      },
    });

    if (!site) {
      return NextResponse.json({ error: 'Site não encontrado' }, { status: 404 });
    }

    return NextResponse.json({
      id: site.id,
      name: site.name,
      slug: site.slug,
      status: site.status,
      githubRepoUrl: site.githubRepoUrl,
      vercelUrl: site.vercelUrl,
      lastError: site.lastError,
      steps: site.steps.map((s) => ({
        step: s.step,
        status: s.status,
        details: s.details,
        completedAt: s.completedAt,
      })),
      completed: site.status === 'COMPLETED',
      hasError: site.status === 'ERROR',
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Erro ao consultar status' }, { status: 500 });
  }
}
