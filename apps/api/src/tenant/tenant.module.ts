import { Module } from '@nestjs/common';
import { TenantService } from './tenant.service.js';
import { TenantController } from './tenant.controller.js';
import { TenantInterceptor } from './tenant.interceptor.js';

@Module({
    controllers: [TenantController],
    providers: [TenantService, TenantInterceptor],
    exports: [TenantService, TenantInterceptor],
})
export class TenantModule { }
