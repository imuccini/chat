
import { createRequire } from 'module';
import fs from 'fs';
const require = createRequire(import.meta.url);

fs.appendFileSync('trace.log', `[DEBUG] db.ts executed at ${new Date().toISOString()}\n`);

let pkg: any;
try {
    pkg = require('../generated/client/index.js');
    fs.appendFileSync('trace.log', `[DEBUG] pkg loaded. keys: ${Object.keys(pkg || {}).join(', ')}\n`);
    fs.appendFileSync('trace.log', `[DEBUG] pkg type: ${typeof pkg}\n`);
} catch (e) {
    fs.appendFileSync('trace.log', `[ERROR] Failed to require: ${e.message}\n`);
}

// Singleton pattern for Prisma client
const globalForPrisma = globalThis as unknown as {
    __PRISMA_DB_INSTANCE__: any;
};

// Robust interop for PrismaClient
const PrismaClientConstructor = pkg?.PrismaClient;
fs.appendFileSync('trace.log', `[DEBUG] PrismaClientConstructor type: ${typeof PrismaClientConstructor}\n`);

if (!PrismaClientConstructor) {
    fs.appendFileSync('trace.log', `[ERROR] @local/database: PrismaClient constructor not found in generated client!\n`);
}

export const db =
    globalForPrisma.__PRISMA_DB_INSTANCE__ ??
    (PrismaClientConstructor && typeof PrismaClientConstructor === 'function' ? new (PrismaClientConstructor as any)({
        log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    }) : undefined);

fs.appendFileSync('trace.log', `[DEBUG] db instance created: ${!!db}\n`);

if (process.env.NODE_ENV !== 'production' && db) {
    globalForPrisma.__PRISMA_DB_INSTANCE__ = db;
}
