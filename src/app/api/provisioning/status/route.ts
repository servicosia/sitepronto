import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/client';
import { checkRateLimit } from '@/lib/rate-limit/limiter';
import { isAuthorizedAdmin } from '@/lib/security/auth';
import { timingSafeCompare } from '@/lib/security/crypto';

export async function GET(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const limit = await checkRateLimit('provision_status', ip, 60, 60);
    if (!limit.success) {
      return NextResponse.json(
        { error: 'Muitas consultas simultâneas. Aguarde alguns instantes.' },
        { status: 429, headers: { 'Retry-After': String(limit.retryAfter || 10) } }
      );
    }

    const { searchParams } = new URL(req.url);
    const siteId = searchParams.get('siteId');
    const accessToken = searchParams.get('token');

    if (!siteId || typeof siteId !== 'string' || siteId.trim().length < 5) {
      return NextResponse.json({ error: 'siteId inválido' }, { status: 400 });
    }

    const site = await prisma.site.findFirst({
      where: {
        OR: [{ id: siteId }, { slug: siteId }],
      },
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

    const isAdmin = await isAuthorizedAdmin(req);
    const latestJob = site.jobs[0];
    if (!isAdmin && (!accessToken || !latestJob || !timingSafeCompare(accessToken, latestJob.correlationId))) {
      return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
    }

    return NextResponse.json({
      id: site.id,
      name: site.name,
      slug: site.slug,
      status: site.status,
      githubRepoUrl: isAdmin ? site.githubRepoUrl : undefined,
      vercelUrl: site.vercelUrl,
      customDomain: site.customDomain,
      domainStatus: site.domainStatus,
      lastError: isAdmin ? site.lastError : undefined,
      steps: site.steps.map((s) => ({
        step: s.step,
        status: s.status,
        details: isAdmin ? s.details : undefined,
        completedAt: s.completedAt,
      })),
      completed: site.status === 'COMPLETED',
      hasError: site.status === 'ERROR',
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Erro ao consultar status' }, { status: 500 });
  }
}
