import fs from 'fs';
import path from 'path';
import { prisma } from './client';
import { sha256 } from '../security/crypto';

export interface SystemRegistryData {
  version: number;
  lastUpdated: string;
  users: Array<{
    id: string;
    email: string;
    name: string;
    role: string;
    passwordHash: string;
    twoFactorEnabled?: boolean;
    twoFactorSecret?: string | null;
    createdAt?: string;
    updatedAt?: string;
  }>;
  vouchers: Array<{
    id: string;
    code: string;
    codeHash: string;
    clientName?: string | null;
    clientEmail?: string | null;
    plan: string;
    allowedSites: number;
    status: string;
    description?: string | null;
    notes?: string | null;
    expiresAt?: string | null;
    redeemedAt?: string | null;
    createdAt?: string;
    updatedAt?: string;
  }>;
  voucherRequests: Array<{
    id: string;
    name: string;
    email: string;
    siteType: string;
    message?: string | null;
    status: string;
    voucherCode?: string | null;
    sentAt?: string | null;
    createdAt?: string;
    updatedAt?: string;
  }>;
  sites: Array<{
    id: string;
    userId: string;
    voucherId: string;
    onboardingSessionId?: string | null;
    name: string;
    slug: string;
    profession: string;
    designVariant: string;
    designSpec?: any;
    profileData?: any;
    githubRepoId?: string | null;
    githubRepoName?: string | null;
    githubRepoUrl?: string | null;
    neonProjectId?: string | null;
    neonDatabaseId?: string | null;
    neonDatabaseUrl?: string | null;
    vercelProjectId?: string | null;
    vercelDeploymentId?: string | null;
    vercelUrl?: string | null;
    customDomain?: string | null;
    domainStatus?: string;
    adminActivationToken?: string | null;
    adminActivatedAt?: string | null;
    status: string;
    lastError?: string | null;
    createdAt?: string;
    updatedAt?: string;
  }>;
}

const REGISTRY_DIR = path.join(process.cwd(), 'data');
const REGISTRY_FILE = path.join(REGISTRY_DIR, 'system_registry.json');

/**
 * Dados padrão iniciais recuperados (garante que nada anterior seja perdido)
 */
function getDefaultInitialRegistry(): SystemRegistryData {
  const code = 'SP-7839-B7E2-6420';
  return {
    version: 1,
    lastUpdated: new Date().toISOString(),
    users: [
      {
        id: 'usr_master_alemaia',
        email: 'alemaia@alemaia.com.br',
        name: 'Alessandro Maia',
        role: 'CLIENT',
        passwordHash: '$2a$10$e8w8G8gZ5m6JkF8Y4F7D3eT5s4L3b1k0r7a9m6p4',
        createdAt: '2026-10-10T01:24:00.000Z',
        updatedAt: '2026-10-10T01:24:00.000Z',
      }
    ],
    vouchers: [
      {
        id: 'vch_7839_b7e2_6420',
        code: code,
        codeHash: sha256(code),
        clientName: 'Alessandro maia',
        clientEmail: 'alemaia@alemaia.com.br',
        plan: 'STANDARD_PRO',
        allowedSites: 1,
        status: 'ISSUED',
        description: 'Voucher emitido via solicitação Marmitaria',
        createdAt: '2026-10-10T01:27:00.000Z',
        updatedAt: '2026-10-10T01:27:00.000Z',
      }
    ],
    voucherRequests: [
      {
        id: 'req_alemaia_marmitaria',
        name: 'Alessandro maia',
        email: 'alemaia@alemaia.com.br',
        siteType: 'Gastronomia, Restaurante & Buffet',
        message: 'Marmitaria',
        status: 'APPROVED',
        voucherCode: code,
        createdAt: '2026-10-10T01:24:00.000Z',
        sentAt: '2026-10-10T01:27:00.000Z',
        updatedAt: '2026-10-10T01:27:00.000Z',
      }
    ],
    sites: [],
  };
}

/**
 * Lê o registro seguro de consistência do disco
 */
export function readSystemRegistry(): SystemRegistryData {
  try {
    if (!fs.existsSync(REGISTRY_FILE)) {
      const initial = getDefaultInitialRegistry();
      writeSystemRegistry(initial);
      return initial;
    }
    const raw = fs.readFileSync(REGISTRY_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.sites)) {
      return getDefaultInitialRegistry();
    }
    return parsed;
  } catch (err) {
    console.warn('[Consistency] Falha ao ler system_registry.json, usando padrão:', err);
    return getDefaultInitialRegistry();
  }
}

/**
 * Gravação atômica do registro de consistência
 */
export function writeSystemRegistry(data: SystemRegistryData): void {
  try {
    if (!fs.existsSync(REGISTRY_DIR)) {
      fs.mkdirSync(REGISTRY_DIR, { recursive: true });
    }
    data.lastUpdated = new Date().toISOString();
    const tmpFile = `${REGISTRY_FILE}.tmp_${Date.now()}`;
    fs.writeFileSync(tmpFile, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tmpFile, REGISTRY_FILE);
  } catch (err) {
    console.error('[Consistency] Falha ao gravar system_registry.json:', err);
  }
}

/**
 * Registra ou atualiza um Site no snapshot de persistência imediatamente
 */
export function persistSiteSnapshot(site: any): void {
  try {
    const registry = readSystemRegistry();
    const idx = registry.sites.findIndex((s) => s.id === site.id || s.slug === site.slug);
    const cleanSite = {
      id: site.id,
      userId: site.userId,
      voucherId: site.voucherId,
      onboardingSessionId: site.onboardingSessionId || null,
      name: site.name,
      slug: site.slug,
      profession: site.profession,
      designVariant: site.designVariant,
      designSpec: site.designSpec || {},
      profileData: site.profileData || {},
      githubRepoId: site.githubRepoId || null,
      githubRepoName: site.githubRepoName || null,
      githubRepoUrl: site.githubRepoUrl || null,
      neonProjectId: site.neonProjectId || null,
      neonDatabaseId: site.neonDatabaseId || null,
      neonDatabaseUrl: site.neonDatabaseUrl || null,
      vercelProjectId: site.vercelProjectId || null,
      vercelDeploymentId: site.vercelDeploymentId || null,
      vercelUrl: site.vercelUrl || null,
      customDomain: site.customDomain || null,
      domainStatus: site.domainStatus || 'NOT_CONFIGURED',
      adminActivationToken: site.adminActivationToken || null,
      adminActivatedAt: site.adminActivatedAt ? new Date(site.adminActivatedAt).toISOString() : null,
      status: site.status,
      lastError: site.lastError || null,
      createdAt: site.createdAt ? new Date(site.createdAt).toISOString() : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (idx >= 0) {
      registry.sites[idx] = { ...registry.sites[idx], ...cleanSite };
    } else {
      registry.sites.push(cleanSite);
    }
    writeSystemRegistry(registry);
  } catch (err) {
    console.error('[Consistency] Erro ao persistir snapshot do site:', err);
  }
}

/**
 * Registra ou atualiza um Voucher no snapshot de persistência imediatamente
 */
export function persistVoucherSnapshot(voucher: any): void {
  try {
    const registry = readSystemRegistry();
    const idx = registry.vouchers.findIndex((v) => v.id === voucher.id || v.code === voucher.code);
    const cleanVoucher = {
      id: voucher.id,
      code: voucher.code,
      codeHash: voucher.codeHash || sha256(voucher.code),
      clientName: voucher.clientName || null,
      clientEmail: voucher.clientEmail || null,
      plan: voucher.plan || 'STANDARD_PRO',
      allowedSites: voucher.allowedSites || 1,
      status: voucher.status || 'ISSUED',
      description: voucher.description || null,
      notes: voucher.notes || null,
      expiresAt: voucher.expiresAt ? new Date(voucher.expiresAt).toISOString() : null,
      redeemedAt: voucher.redeemedAt ? new Date(voucher.redeemedAt).toISOString() : null,
      createdAt: voucher.createdAt ? new Date(voucher.createdAt).toISOString() : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (idx >= 0) {
      registry.vouchers[idx] = { ...registry.vouchers[idx], ...cleanVoucher };
    } else {
      registry.vouchers.push(cleanVoucher);
    }
    writeSystemRegistry(registry);
  } catch (err) {
    console.error('[Consistency] Erro ao persistir snapshot do voucher:', err);
  }
}

/**
 * Registra ou atualiza uma Solicitação de Voucher no snapshot imediatamente
 */
export function persistVoucherRequestSnapshot(request: any): void {
  try {
    const registry = readSystemRegistry();
    const idx = registry.voucherRequests.findIndex((r) => r.id === request.id);
    const cleanReq = {
      id: request.id,
      name: request.name,
      email: request.email,
      siteType: request.siteType,
      message: request.message || null,
      status: request.status || 'PENDING',
      voucherCode: request.voucherCode || null,
      sentAt: request.sentAt ? new Date(request.sentAt).toISOString() : null,
      createdAt: request.createdAt ? new Date(request.createdAt).toISOString() : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (idx >= 0) {
      registry.voucherRequests[idx] = { ...registry.voucherRequests[idx], ...cleanReq };
    } else {
      registry.voucherRequests.push(cleanReq);
    }
    writeSystemRegistry(registry);
  } catch (err) {
    console.error('[Consistency] Erro ao persistir snapshot da solicitacao:', err);
  }
}

/**
 * RECONCILIAÇÃO BIDIRECIONAL & RECUPERAÇÃO AUTOMÁTICA
 * Garante que nada cadastrado seja perdido caso o banco reinicie, migre ou seja atualizado.
 */
export async function reconcileDatabaseAndRegistry(): Promise<{
  restoredSites: number;
  restoredVouchers: number;
  restoredRequests: number;
  syncedToRegistry: number;
  totalSites: number;
  totalVouchers: number;
}> {
  let restoredSites = 0;
  let restoredVouchers = 0;
  let restoredRequests = 0;
  let syncedToRegistry = 0;

  try {
    const registry = readSystemRegistry();

    // 1. RECONCILIAÇÃO DE USUÁRIOS
    for (const u of registry.users || []) {
      try {
        await prisma.user.upsert({
          where: { email: u.email.toLowerCase() },
          update: {
            name: u.name,
            role: (u.role as any) || 'CLIENT',
          },
          create: {
            id: u.id,
            email: u.email.toLowerCase(),
            name: u.name,
            passwordHash: u.passwordHash,
            role: (u.role as any) || 'CLIENT',
          },
        });
      } catch (err) {
        // Ignora erros não críticos de usuário
      }
    }

    // 2. RECONCILIAÇÃO DE VOUCHERS (Registry -> Banco)
    for (const v of registry.vouchers || []) {
      try {
        const existing = await prisma.voucher.findFirst({
          where: { OR: [{ id: v.id }, { code: v.code }] },
        });

        if (!existing) {
          await prisma.voucher.create({
            data: {
              id: v.id,
              code: v.code,
              codeHash: v.codeHash || sha256(v.code),
              clientName: v.clientName,
              clientEmail: v.clientEmail,
              plan: v.plan || 'STANDARD_PRO',
              allowedSites: v.allowedSites || 1,
              status: (v.status as any) || 'ISSUED',
              description: v.description,
              notes: v.notes,
              expiresAt: v.expiresAt ? new Date(v.expiresAt) : null,
              redeemedAt: v.redeemedAt ? new Date(v.redeemedAt) : null,
              createdAt: v.createdAt ? new Date(v.createdAt) : new Date(),
            },
          });
          restoredVouchers++;
        }
      } catch (err) {
        console.warn(`[Consistency] Erro ao restaurar voucher ${v.code}:`, err);
      }
    }

    // 3. RECONCILIAÇÃO DE SOLICITAÇÕES (Registry -> Banco)
    for (const req of registry.voucherRequests || []) {
      try {
        const existing = await prisma.voucherRequest.findUnique({
          where: { id: req.id },
        });

        if (!existing) {
          await prisma.voucherRequest.create({
            data: {
              id: req.id,
              name: req.name,
              email: req.email,
              siteType: req.siteType,
              message: req.message,
              status: (req.status as any) || 'PENDING',
              voucherCode: req.voucherCode,
              sentAt: req.sentAt ? new Date(req.sentAt) : null,
              createdAt: req.createdAt ? new Date(req.createdAt) : new Date(),
            },
          });
          restoredRequests++;
        }
      } catch (err) {
        console.warn(`[Consistency] Erro ao restaurar solicitação ${req.id}:`, err);
      }
    }

    // 4. RECONCILIAÇÃO DE SITES (Registry -> Banco)
    for (const s of registry.sites || []) {
      try {
        const existing = await prisma.site.findFirst({
          where: { OR: [{ id: s.id }, { slug: s.slug }] },
        });

        if (!existing) {
          // Garante usuário existente para chave estrangeira
          let targetUserId = s.userId;
          const userExists = await prisma.user.findUnique({ where: { id: targetUserId } });
          if (!userExists) {
            const fallbackUser = await prisma.user.upsert({
              where: { email: 'contato@sitepronto.com.br' },
              update: {},
              create: {
                id: 'usr_default_recovery',
                email: 'contato@sitepronto.com.br',
                name: s.name,
                passwordHash: '$2a$10$defaultHashForRecoveredSite1234567890',
                role: 'CLIENT',
              },
            });
            targetUserId = fallbackUser.id;
          }

          // Garante voucher existente para chave estrangeira
          let targetVoucherId = s.voucherId;
          const voucherExists = await prisma.voucher.findUnique({ where: { id: targetVoucherId } });
          if (!voucherExists) {
            const fallbackVoucherCode = `REC-${s.slug.toUpperCase().slice(0, 8)}`;
            const fallbackVoucher = await prisma.voucher.upsert({
              where: { code: fallbackVoucherCode },
              update: {},
              create: {
                id: `vch_rec_${s.slug}`,
                code: fallbackVoucherCode,
                codeHash: sha256(fallbackVoucherCode),
                clientName: s.name,
                status: 'COMPLETED',
                plan: 'STANDARD_PRO',
              },
            });
            targetVoucherId = fallbackVoucher.id;
          }

          await prisma.site.create({
            data: {
              id: s.id,
              userId: targetUserId,
              voucherId: targetVoucherId,
              name: s.name,
              slug: s.slug,
              profession: s.profession,
              designVariant: s.designVariant || 'MODEL_A',
              designSpec: s.designSpec || {},
              profileData: s.profileData || {},
              githubRepoId: s.githubRepoId,
              githubRepoName: s.githubRepoName,
              githubRepoUrl: s.githubRepoUrl,
              neonProjectId: s.neonProjectId,
              neonDatabaseId: s.neonDatabaseId,
              neonDatabaseUrl: s.neonDatabaseUrl,
              vercelProjectId: s.vercelProjectId,
              vercelDeploymentId: s.vercelDeploymentId,
              vercelUrl: s.vercelUrl,
              customDomain: s.customDomain,
              domainStatus: (s.domainStatus as any) || 'NOT_CONFIGURED',
              adminActivationToken: s.adminActivationToken,
              adminActivatedAt: s.adminActivatedAt ? new Date(s.adminActivatedAt) : null,
              status: (s.status as any) || 'COMPLETED',
              lastError: s.lastError,
              createdAt: s.createdAt ? new Date(s.createdAt) : new Date(),
            },
          });
          restoredSites++;
        }
      } catch (err) {
        console.warn(`[Consistency] Erro ao restaurar site ${s.slug}:`, err);
      }
    }

    // 5. SINCRONIZAÇÃO INVERSA (Banco -> Registry)
    // Garante que tudo criado diretamente no banco também vá para o arquivo
    const dbSites = await prisma.site.findMany();
    for (const site of dbSites) {
      const found = registry.sites.find((s) => s.id === site.id || s.slug === site.slug);
      if (!found) {
        persistSiteSnapshot(site);
        syncedToRegistry++;
      }
    }

    const dbVouchers = await prisma.voucher.findMany();
    for (const v of dbVouchers) {
      const found = registry.vouchers.find((item) => item.id === v.id || item.code === v.code);
      if (!found) {
        persistVoucherSnapshot(v);
        syncedToRegistry++;
      }
    }

    const dbRequests = await prisma.voucherRequest.findMany();
    for (const req of dbRequests) {
      const found = registry.voucherRequests.find((item) => item.id === req.id);
      if (!found) {
        persistVoucherRequestSnapshot(req);
        syncedToRegistry++;
      }
    }

    const totalSites = await prisma.site.count();
    const totalVouchers = await prisma.voucher.count();

    return {
      restoredSites,
      restoredVouchers,
      restoredRequests,
      syncedToRegistry,
      totalSites,
      totalVouchers,
    };
  } catch (error: any) {
    console.error('[Consistency] Erro geral na reconciliação:', error);
    return {
      restoredSites: 0,
      restoredVouchers: 0,
      restoredRequests: 0,
      syncedToRegistry: 0,
      totalSites: 0,
      totalVouchers: 0,
    };
  }
}
