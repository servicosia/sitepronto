import crypto from 'crypto';

/**
 * Hash com Salt seguro para senhas usando scrypt nativo do Node.js
 */
export async function hashPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString('hex');
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(`${salt}:${derivedKey.toString('hex')}`);
    });
  });
}

/**
 * Validação de senha resistente a Timing Attacks
 */
export async function verifyPassword(password: string, combinedHash: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const [salt, key] = combinedHash.split(':');
    if (!salt || !key) return resolve(false);

    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      const keyBuffer = Buffer.from(key, 'hex');
      const match = crypto.timingSafeEqual(keyBuffer, derivedKey);
      resolve(match);
    });
  });
}

/**
 * Gera hash SHA-256 unidirecional (para vouchers, IPs e tokens de sessão)
 */
export function sha256(data: string): string {
  return crypto.createHash('sha256').update(data).digest('hex');
}

/**
 * Gera código de voucher de alta entropia (ex: SP-9F8A-7B6C-4D2E)
 */
export function generateVoucherCode(): string {
  const bytes = crypto.randomBytes(6).toString('hex').toUpperCase();
  return `SP-${bytes.slice(0, 4)}-${bytes.slice(4, 8)}-${bytes.slice(8, 12)}`;
}

/**
 * Gera slug seguro para nomes de sites e recursos externos
 */
export function generateSafeSlug(name: string): string {
  const base = name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  
  const suffix = crypto.randomBytes(3).toString('hex');
  return `site-${base.slice(0, 20)}-${suffix}`;
}
