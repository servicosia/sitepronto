import { prisma } from '../db/client';
import { sha256 } from '../security/crypto';

/**
 * Rate limiter persistente no PostgreSQL com janela de tempo deslizante
 */
export async function checkRateLimit(
  keyPrefix: string,
  identifier: string,
  maxRequests: number,
  windowSeconds: number
): Promise<{ success: boolean; remaining: number; retryAfter?: number }> {
  try {
    const hashedIdentifier = sha256(identifier);
    const key = `${keyPrefix}:${hashedIdentifier}`;
    const now = new Date();
    const expireAt = new Date(now.getTime() + windowSeconds * 1000);

    const record = await prisma.rateLimit.findUnique({
      where: { key },
    });

    if (!record || record.expireAt < now) {
      await prisma.rateLimit.upsert({
        where: { key },
        create: {
          key,
          points: 1,
          expireAt,
        },
        update: {
          points: 1,
          expireAt,
        },
      });

      return { success: true, remaining: maxRequests - 1 };
    }

    if (record.points >= maxRequests) {
      const retryAfter = Math.ceil((record.expireAt.getTime() - now.getTime()) / 1000);
      return { success: false, remaining: 0, retryAfter };
    }

    const updated = await prisma.rateLimit.update({
      where: { key },
      data: {
        points: { increment: 1 },
      },
    });

    return {
      success: true,
      remaining: Math.max(0, maxRequests - updated.points),
    };
  } catch (error) {
    console.error('Rate limit error, failing open for availability:', error);
    return { success: true, remaining: 1 };
  }
}
