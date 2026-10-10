import { NextRequest } from 'next/server';
import { sha256, timingSafeCompare } from './crypto';

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
export function generateAdminSessionToken(): string {
  const secret = getSessionSecret();
  const password = getAdminPassword();
  return sha256(`platform_admin_auth_${secret}_${password}`);
}

/**
 * Verifica se a requisição possui autorização válida de Master/Platform Admin
 */
export function isAuthorizedAdmin(req: NextRequest): boolean {
  try {
    const expectedToken = generateAdminSessionToken();
    const cookieToken = req.cookies.get('platform_admin_session')?.value;

    if (!cookieToken) {
      // Também suporta Authorization header (Bearer token) para integrações ou CLI
      const authHeader = req.headers.get('authorization');
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const bearer = authHeader.slice(7).trim();
        return timingSafeCompare(bearer, expectedToken);
      }
      return false;
    }

    return timingSafeCompare(cookieToken, expectedToken);
  } catch (error) {
    console.error('[Security] Erro na verificação de autorização admin:', error);
    return false;
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

  if (!host) return true; // Se não puder inspecionar host (ex: testes internos), permite

  const hostWithoutPort = host.split(':')[0].toLowerCase();

  if (origin) {
    try {
      const originHost = new URL(origin).hostname.toLowerCase();
      // Permite mesmo host ou subdomínio direto
      if (originHost === hostWithoutPort || originHost === 'localhost' || originHost === '127.0.0.1') {
        return true;
      }
      if (originHost.endsWith('.shardweb.app') || originHost.endsWith('.sitepronto.com.br')) {
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  if (referer) {
    try {
      const refererHost = new URL(referer).hostname.toLowerCase();
      if (refererHost === hostWithoutPort || refererHost === 'localhost' || refererHost === '127.0.0.1') {
        return true;
      }
      if (refererHost.endsWith('.shardweb.app') || refererHost.endsWith('.sitepronto.com.br')) {
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  return true;
}

/**
 * Gera token seguro para aprovação de voucher em 1 clique por e-mail
 */
export function generateVoucherApprovalToken(requestId: string, email: string): string {
  const secret = getSessionSecret();
  return sha256(`quick_voucher_approval_${requestId}_${email.trim().toLowerCase()}_${secret}`);
}

/**
 * Valida o token de aprovação de voucher em 1 clique
 */
export function verifyVoucherApprovalToken(requestId: string, email: string, token: string): boolean {
  if (!token || typeof token !== 'string') return false;
  const expected = generateVoucherApprovalToken(requestId, email);
  return timingSafeCompare(token, expected);
}
