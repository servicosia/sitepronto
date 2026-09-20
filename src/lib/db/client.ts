import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const neonDbUrl = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_jz4DyXNBUF3V@ep-snowy-salad-ac3a3a73-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require";

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasourceUrl: neonDbUrl,
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
