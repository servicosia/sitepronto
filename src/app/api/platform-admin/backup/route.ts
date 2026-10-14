import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/client';
import { 
  readSystemRegistry, 
  writeSystemRegistry, 
  reconcileDatabaseAndRegistry 
} from '@/lib/db/consistency';
import { isAuthorizedAdmin, validateSameOrigin } from '@/lib/security/auth';

/**
 * GET: Exporta Backup Completo (JSON) do Sistema
 */
export async function GET(req: NextRequest) {
  try {
    if (!(await isAuthorizedAdmin(req))) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    // Garante que o registry está atualizado com o banco antes de exportar
    await reconcileDatabaseAndRegistry();

    const registry = readSystemRegistry();
    const dbSites = await prisma.site.findMany({
      include: { user: { select: { name: true, email: true } } },
    });
    const dbVouchers = await prisma.voucher.findMany();
    const dbRequests = await prisma.voucherRequest.findMany();

    const backupPayload = {
      app: 'SitePronto',
      version: 2,
      exportedAt: new Date().toISOString(),
      stats: {
        totalSites: dbSites.length,
        totalVouchers: dbVouchers.length,
        totalRequests: dbRequests.length,
      },
      data: {
        registry,
        sites: dbSites,
        vouchers: dbVouchers,
        voucherRequests: dbRequests,
      },
    };

    const dateStr = new Date().toISOString().split('T')[0];
    const filename = `sitepronto-backup-${dateStr}.json`;

    return new NextResponse(JSON.stringify(backupPayload, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: 'Erro ao gerar backup: ' + err.message }, { status: 500 });
  }
}

/**
 * POST: Restaura / Importa Backup ou Dispara Reconciliação Manual
 */
export async function POST(req: NextRequest) {
  try {
    if (!(await isAuthorizedAdmin(req)) || !validateSameOrigin(req)) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const body = await req.json();

    // Se for apenas uma solicitação de sincronização / reconciliação imediata
    if (body.action === 'sync') {
      const result = await reconcileDatabaseAndRegistry();
      return NextResponse.json({
        success: true,
        message: 'Reconciliação de consistência concluída com sucesso.',
        stats: result,
      });
    }

    // Se for importação de arquivo de backup JSON
    if (body.action === 'import' && body.backupData) {
      const backup = body.backupData;
      const importedRegistry = backup.data?.registry || backup.registry || backup;

      if (!importedRegistry || typeof importedRegistry !== 'object') {
        return NextResponse.json({ error: 'Formato de arquivo de backup inválido.' }, { status: 400 });
      }

      // Merge seguro no registry local
      const currentRegistry = readSystemRegistry();
      
      const mergedSites = [...currentRegistry.sites];
      for (const s of importedRegistry.sites || []) {
        const idx = mergedSites.findIndex((m) => m.id === s.id || m.slug === s.slug);
        if (idx >= 0) {
          mergedSites[idx] = { ...mergedSites[idx], ...s };
        } else {
          mergedSites.push(s);
        }
      }

      const mergedVouchers = [...currentRegistry.vouchers];
      for (const v of importedRegistry.vouchers || []) {
        const idx = mergedVouchers.findIndex((m) => m.id === v.id || m.code === v.code);
        if (idx >= 0) {
          mergedVouchers[idx] = { ...mergedVouchers[idx], ...v };
        } else {
          mergedVouchers.push(v);
        }
      }

      const mergedRequests = [...currentRegistry.voucherRequests];
      for (const r of importedRegistry.voucherRequests || []) {
        const idx = mergedRequests.findIndex((m) => m.id === r.id);
        if (idx >= 0) {
          mergedRequests[idx] = { ...mergedRequests[idx], ...r };
        } else {
          mergedRequests.push(r);
        }
      }

      const newRegistry = {
        version: 2,
        lastUpdated: new Date().toISOString(),
        users: currentRegistry.users || [],
        sites: mergedSites,
        vouchers: mergedVouchers,
        voucherRequests: mergedRequests,
      };

      writeSystemRegistry(newRegistry);

      // Reconcilia de volta para o PostgreSQL
      const reconcileStats = await reconcileDatabaseAndRegistry();

      return NextResponse.json({
        success: true,
        message: 'Backup importado e restaurado no sistema com sucesso!',
        stats: reconcileStats,
      });
    }

    return NextResponse.json({ error: 'Ação de backup não reconhecida.' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: 'Erro ao processar backup: ' + err.message }, { status: 500 });
  }
}
