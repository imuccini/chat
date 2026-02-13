import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service.js';
import * as Database from '@local/database';

@Controller('diag')
export class DiagController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getStatus() {
    try {
      const dbKeys = Object.keys(Database);
      const internalPrisma = Database.prisma || (Database as any).db;

      // @ts-ignore
      const tenantCount = await internalPrisma.tenant.count();
      return {
        status: 'ok',
        database: 'connected',
        tenantCount,
        dbKeys,
        hasPrisma: !!Database.prisma,
        hasDb: !!(Database as any).db,
        env: process.env.NODE_ENV,
      };
    } catch (error) {
      return {
        status: 'error',
        message: error.message,
        dbKeys: Object.keys(Database),
        hasPrisma: !!Database.prisma,
        hasDb: !!(Database as any).db,
        stack: error.stack,
      };
    }
  }
}
