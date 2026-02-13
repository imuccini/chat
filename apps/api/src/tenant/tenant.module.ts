import { Module } from '@nestjs/common';
import { TenantService } from './tenant.service.js';
import { JwtModule } from '@nestjs/jwt';
import { TenantController } from './tenant.controller.js';
import { TenantInterceptor } from './tenant.interceptor.js';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.BETTER_AUTH_SECRET,
    }),
  ],
  controllers: [TenantController],
  providers: [TenantService, TenantInterceptor],
  exports: [TenantService, TenantInterceptor],
})
export class TenantModule {}
