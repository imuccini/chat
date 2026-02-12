
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

let pkg: any;
try {
    pkg = require('../generated/client/index.js');
} catch (e) {
    console.error(`[ERROR] Failed to require: ${e.message}`);
}

const globalForPrisma = globalThis as unknown as {
    __PRISMA_DB_INSTANCE__: any;
};

// Robust interop for PrismaClient
const PrismaClientConstructor = pkg?.PrismaClient;

if (!PrismaClientConstructor) {
    console.error(`[ERROR] @local/database: PrismaClient constructor not found in generated client!`);
}

export const db =
    globalForPrisma.__PRISMA_DB_INSTANCE__ ??
    (PrismaClientConstructor && typeof PrismaClientConstructor === 'function' ? new (PrismaClientConstructor as any)({
        log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    }) : undefined);

if (process.env.NODE_ENV !== 'production' && db) {
    globalForPrisma.__PRISMA_DB_INSTANCE__ = db;
}
