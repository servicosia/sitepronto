import { NextRequest } from 'next/server';
import { sha256, timingSafeCompare } from './crypto';
import crypto from 'crypto';
import { prisma } from '../db/client';

/**
 * Retorna a senha do painel master/admin configurada no ambiente.
 * Em produção, lança erro se não estiver explicitamente definida.
 */
export function getAdminPassword(): string {
  const password = process.env.PLATFORM_ADMIN_PASSWORD;
  if (!password) {
    throw new Error('[Security ALERT] PLATFORM_ADMIN_PASSWORD não configurada nas variáveis de ambiente!');
  }
  return password;
}

/**
 * Retorna o secret de sessão configurado.
 */
export function getSessionSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('[Security ALERT] SESSION_SECRET não configurada nas variáveis de ambiente de produção!');
    }
    return 'dev-ephemeral-session-secret-change-in-env';
  }
  return secret;
}

/**
 * Gera o token esperado para a sessão do admin
 */
export async function createAdminSession(req: NextRequest): Promise<{ token: string; expiresAt: Date }> {
  const token = crypto.randomBytes(32).toString('base64url');
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || req.headers.get('x-real-ip') || 'unknown';

  await prisma.adminSession.create({
    data: {
      tokenHash: sha256(token),
      expiresAt,
      ipHash: sha256(ip),
      userAgent: req.headers.get('user-agent') || undefined,
    },
  });
  return { token, expiresAt };
}

/**
 * Verifica se a requisição possui autorização válida de Master/Platform Admin
 */
export async function isAuthorizedAdmin(req: NextRequest): Promise<boolean> {
  try {
    const cookieToken = req.cookies.get('platform_admin_session')?.value;
    if (!cookieToken) return false;
    const session = await prisma.adminSession.findUnique({ where: { tokenHash: sha256(cookieToken) } });
    return Boolean(session && !session.revokedAt && session.expiresAt > new Date());
  } catch (error) {
    console.error('[Security] Erro na verificação de autorização admin:', error);
    return false;
  }
}

export async function revokeAdminSession(req: NextRequest): Promise<void> {
  const token = req.cookies.get('platform_admin_session')?.value;
  if (token) {
    await prisma.adminSession.updateMany({
      where: { tokenHash: sha256(token), revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }
}

/**
 * Validação rigorosa de origem (CSRF Protection) para rotas mutáveis (POST, PUT, DELETE, PATCH)
 */
export function validateSameOrigin(req: NextRequest): boolean {
  const method = req.method.toUpperCase();
  if (['GET', 'HEAD', 'OPTIONS'].includes(method)) {
    return true;
  }

  const origin = req.headers.get('origin');
  const referer = req.headers.get('referer');
  const host = req.headers.get('host');
  const configuredAppUrl = process.env.APP_URL;

  const allowedOrigins = new Set<string>();
  if (configuredAppUrl) {
    try { allowedOrigins.add(new URL(configuredAppUrl).origin); } catch {}
  }
  if (host) {
    allowedOrigins.add(`https://${host}`);
    allowedOrigins.add(`http://${host}`);
  }
  allowedOrigins.add('https://sitepronto.servicos.ia.br');
  allowedOrigins.add('https://sitepronto.shardweb.app');

  const targetHeader = origin || referer;
  if (!targetHeader) return false;

  try {
    const targetOrigin = new URL(targetHeader).origin;
    if (allowedOrigins.has(targetOrigin)) return true;
    const hostname = new URL(targetHeader).hostname.toLowerCase();
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.endsWith('.servicos.ia.br') || hostname.endsWith('.shardweb.app')) {
      return true;
    }
  } catch {
    return false;
  }

  return false;
}

/**
 * Gera token seguro para aprovação de voucher em 1 clique por e-mail
 */
export function generateVoucherApprovalToken(requestId: string, email: string, expiresAt: Date): string {
  const secret = getSessionSecret();
  return sha256(`quick_voucher_approval_${requestId}_${email.trim().toLowerCase()}_${expiresAt.toISOString()}_${secret}`);
}

/**
 * Valida o token de aprovação de voucher em 1 clique
 */
export function verifyVoucherApprovalToken(requestId: string, email: string, createdAt: Date, token: string): boolean {
  if (!token || typeof token !== 'string') return false;
  const expiresAt = new Date(createdAt.getTime() + 7 * 24 * 60 * 60 * 1000);
  if (expiresAt <= new Date()) return false;
  const expected = generateVoucherApprovalToken(requestId, email, expiresAt);
  return timingSafeCompare(token, expected);
}
