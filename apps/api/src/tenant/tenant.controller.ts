import { Controller, Get, Param, Post, Body, NotFoundException, UseInterceptors, Inject } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TenantInterceptor } from './tenant.interceptor.js';

@Controller('tenants')
@UseInterceptors(TenantInterceptor)
export class TenantController {
    constructor(@Inject(TenantService) private readonly tenantService: TenantService) { }

    @Get(':slug')
    async getTenant(@Param('slug') slug: string): Promise<any> {
        const tenant = await this.tenantService.findBySlug(slug);
        if (!tenant) {
            throw new NotFoundException(`Tenant with slug ${slug} not found`);
        }
        return tenant;
    }

    @Post('validate-nas')
    async validateNas(
        @Body() body: { nasId: string; bssid: string; publicIp: string },
    ): Promise<any> {
        const device = await this.tenantService.validateNas(
            body.nasId,
            body.bssid,
            body.publicIp,
        );
        if (!device) {
            return { valid: false };
        }
        return { valid: true, tenant: device.tenant };
    }
}
