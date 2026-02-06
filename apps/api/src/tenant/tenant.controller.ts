import { Controller, Get, Param, Post, Body, NotFoundException, UseInterceptors, Inject, Req } from '@nestjs/common';
import { TenantService } from './tenant.service.js';
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
        @Req() request: any,
        @Body() body: { nasId?: string; bssid?: string; publicIp?: string },
    ): Promise<any> {
        // Get IP from body or headers
        const forwarded = request.headers['x-forwarded-for'];
        const remoteIp = forwarded ? forwarded.split(',')[0].trim() : request.socket.remoteAddress;
        const publicIp = body.publicIp || remoteIp;

        console.log(`[TenantController] Validating NAS: nasId=${body.nasId}, bssid=${body.bssid}, IP=${publicIp}`);

        const device = await this.tenantService.validateNas(
            body.nasId || undefined,
            body.bssid || undefined,
            publicIp,
        );

        if (!device) {
            console.warn(`[TenantController] No device found for NAS validation`);
            return { valid: false };
        }

        console.log(`[TenantController] Validation success! Tenant: ${device.tenant.name} (${device.tenant.slug})`);
        return { valid: true, tenant: device.tenant };
    }
}
