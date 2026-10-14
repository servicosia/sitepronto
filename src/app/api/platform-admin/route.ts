import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/client';
import { createVoucher } from '@/lib/vouchers/service';
import { isAuthorizedAdmin, validateSameOrigin } from '@/lib/security/auth';
import { reconcileDatabaseAndRegistry, readSystemRegistry } from '@/lib/db/consistency';

export async function GET(req: NextRequest) {
  try {
    if (!(await isAuthorizedAdmin(req))) {
      return NextResponse.json({ authenticated: false, error: 'Não autorizado.' }, { status: 401 });
    }

    // Auto-reconciliação de consistência: se o banco reiniciou ou perdeu registros, restaura automaticamente
    await reconcileDatabaseAndRegistry();

    const vouchers = await prisma.voucher.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        sites: true,
      },
    });

    const sites = await prisma.site.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { name: true, email: true } },
      },
    });

    const auditEvents = await prisma.auditEvent.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    const voucherRequests = await prisma.voucherRequest.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      authenticated: true,
      metrics: {
        totalVouchers: vouchers.length,
        vouchersIssued: vouchers.filter((v) => v.status === 'ISSUED').length,
        vouchersCompleted: vouchers.filter((v) => v.status === 'COMPLETED').length,
        totalSites: sites.length,
        activeSites: sites.filter((s) => s.status === 'COMPLETED').length,
        pendingRequests: voucherRequests.filter((r) => r.status === 'PENDING').length,
        totalRequests: voucherRequests.length,
      },
      vouchers,
      voucherRequests,
      sites,
      auditEvents,
      integrations: {
        shardcloud: { configured: true, status: 'connected', region: 'sa-east-1', subdomaint: 'sitepronto' },
        postgres: { configured: true, status: 'connected', host: 'postgres.shardatabases.app' },
        github: { configured: true, scope: 'servicosia' },
        resend: { configured: Boolean(process.env.RESEND_API_KEY) },
        gemini: { configured: true },
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Erro ao carregar dados administrativos' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!(await isAuthorizedAdmin(req)) || !validateSameOrigin(req)) {
      return NextResponse.json({ error: 'Não autorizado ou origem inválida.' }, { status: 401 });
    }

    const body = await req.json();
    const voucher = await createVoucher(body);
    return NextResponse.json({ success: true, voucher });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
