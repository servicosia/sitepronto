import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const dbUrl =
  process.env.DATABASE_URL ||
  "postgres://60d4a7692fa440479c2e50398b01f6e7:20d117ecb606fb826d068a2b855dcf864941335e324963fdea337c9d483ccb7c@postgres.shardatabases.app:5432/database?ssl=true";

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasourceUrl: dbUrl,
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
