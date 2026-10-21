import { PrismaClient } from '@prisma/client';

/**
 * A database outage must never turn into fabricated members, announcements,
 * registrations, payments, or successful writes.
 */
const globalForPrisma = globalThis as unknown as { utaPrisma?: PrismaClient };

export const prisma: PrismaClient =
  globalForPrisma.utaPrisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn','error'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.utaPrisma = prisma;
}

export default prisma;
