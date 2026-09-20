import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/client';
import { createVoucher } from '@/lib/vouchers/service';

export async function GET(req: NextRequest) {
  try {
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

    return NextResponse.json({
      metrics: {
        totalVouchers: vouchers.length,
        vouchersIssued: vouchers.filter((v) => v.status === 'ISSUED').length,
        vouchersCompleted: vouchers.filter((v) => v.status === 'COMPLETED').length,
        totalSites: sites.length,
        activeSites: sites.filter((s) => s.status === 'COMPLETED').length,
      },
      vouchers,
      sites,
      auditEvents,
      integrations: {
        github: { configured: true, scope: 'servicosia' },
        vercel: { configured: true, scope: 'contato-1577' },
        neon: { configured: true, status: 'connected' },
        resend: { configured: true },
        gemini: { configured: true },
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Erro ao carregar dados administrativos' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const voucher = await createVoucher(body);
    return NextResponse.json({ success: true, voucher });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
