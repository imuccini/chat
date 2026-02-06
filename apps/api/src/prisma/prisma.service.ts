import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { prisma } from '@local/database';
import fs from 'fs';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
    // Expose the singleton prisma client
    get client() {
        return prisma;
    }

    // Delegate all Prisma model accessors to the singleton
    get tenant() { return prisma.tenant; }
    get user() { return prisma.user; }
    get message() { return prisma.message; }
    get room() { return prisma.room; }
    get tenantMember() { return prisma.tenantMember; }
    get session() { return prisma.session; }
    get account() { return prisma.account; }
    get verification() { return prisma.verification; }
    get passkey() { return prisma.passkey; }
    get nasDevice() { return prisma.nasDevice; }
    get systemLog() { return prisma.systemLog; }

    async onModuleInit() {
        fs.appendFileSync('trace.log', `[PrismaService] onModuleInit. prisma instance: ${typeof prisma}\n`);
        try {
            await prisma.$connect();
            console.log('[DEBUG] Prisma connected successfully');
            fs.appendFileSync('trace.log', `[PrismaService] Connected to DB\n`);
        } catch (err: any) {
            console.error('[ERROR] Prisma connection failed:', err);
            fs.appendFileSync('trace.log', `[PrismaService ERROR] Connection failed: ${err.message}\n`);
        }
    }

    async onModuleDestroy() {
        await prisma.$disconnect();
    }
}
