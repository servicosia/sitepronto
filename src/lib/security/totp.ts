import crypto from 'crypto';

const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

/**
 * Converte bytes aleatórios em string Base32 sem padding
 */
export function generateTotpSecret(length = 20): string {
  const bytes = crypto.randomBytes(length);
  let bits = '';
  for (let i = 0; i < bytes.length; i++) {
    bits += bytes[i].toString(2).padStart(8, '0');
  }
  let base32 = '';
  for (let i = 0; i + 5 <= bits.length; i += 5) {
    const chunk = bits.substr(i, 5);
    base32 += BASE32_ALPHABET[parseInt(chunk, 2)];
  }
  return base32;
}

/**
 * Decodifica Base32 para Buffer
 */
export function base32Decode(base32: string): Buffer {
  let bits = '';
  const clean = base32.toUpperCase().replace(/[\s=-]/g, '');
  for (const char of clean) {
    const val = BASE32_ALPHABET.indexOf(char);
    if (val === -1) continue;
    bits += val.toString(2).padStart(5, '0');
  }
  const bytes: number[] = [];
  for (let i = 0; i + 8 <= bits.length; i += 8) {
    bytes.push(parseInt(bits.substr(i, 8), 2));
  }
  return Buffer.from(bytes);
}

/**
 * Gera o código TOTP de 6 dígitos para o timestamp informado (RFC 6238)
 */
export function generateTotpCode(secret: string, counter = Math.floor(Date.now() / 30000)): string {
  const key = base32Decode(secret);
  const buffer = Buffer.alloc(8);
  buffer.writeBigInt64BE(BigInt(counter));

  const hmac = crypto.createHmac('sha1', key).update(buffer).digest();
  const offset = hmac[hmac.length - 1] & 0xf;
  const code = (
    ((hmac[offset] & 0x7f) << 24) |
    ((hmac[offset + 1] & 0xff) << 16) |
    ((hmac[offset + 2] & 0xff) << 8) |
    (hmac[offset + 3] & 0xff)
  ) % 1000000;

  return code.toString().padStart(6, '0');
}

/**
 * Valida o código TOTP de 6 dígitos considerando tolerância de tempo (drift de relógio ±30s)
 */
export function verifyTotpCode(token: string, secret: string, window = 1): boolean {
  if (!token || !secret) return false;
  const sanitizedToken = token.trim().replace(/\D/g, '');
  if (sanitizedToken.length !== 6) return false;

  const currentCounter = Math.floor(Date.now() / 30000);
  for (let offset = -window; offset <= window; offset++) {
    const expected = generateTotpCode(secret, currentCounter + offset);
    if (sanitizedToken === expected) {
      return true;
    }
  }
  return false;
}

/**
 * Gera URI padrão otpauth para aplicativos autenticadores (Google Authenticator, Authy, etc.)
 */
export function getTotpUri(label: string, issuer: string, secret: string): string {
  const cleanIssuer = encodeURIComponent(issuer.trim());
  const cleanLabel = encodeURIComponent(label.trim());
  return `otpauth://totp/${cleanIssuer}:${cleanLabel}?secret=${secret}&issuer=${cleanIssuer}&algorithm=SHA1&digits=6&period=30`;
}

/**
 * Retorna URL de renderização de QR Code rápida e segura para o aplicativo autenticador
 */
export function getTotpQrCodeUrl(uri: string): string {
  return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(uri)}&margin=10`;
}
