import * as pkg from '../generated/client/index.js';

// gestisco l'interop ESM/CJS esplicitamente
const PrismaLib = (pkg as any).default || pkg;
const PrismaClientConstructor = PrismaLib.PrismaClient;

// Singleton pattern for Prisma client
const globalForPrisma = globalThis as unknown as {
    __PRISMA_DB_INSTANCE__: any;
};

export const db =
    globalForPrisma.__PRISMA_DB_INSTANCE__ ??
    (PrismaClientConstructor ? new PrismaClientConstructor({
        log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    }) : undefined);

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.__PRISMA_DB_INSTANCE__ = db;
}
