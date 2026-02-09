import { Controller, Get, Param, Post, Body, NotFoundException, UseInterceptors, Inject, Req, Query, Headers, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { TenantService } from './tenant.service.js';
import { TenantInterceptor } from './tenant.interceptor.js';
import { JwtService } from '@nestjs/jwt';

@Controller('tenants')
@UseInterceptors(TenantInterceptor)
export class TenantController {
    constructor(
        @Inject(TenantService) private readonly tenantService: TenantService,
        private readonly jwtService: JwtService,
    ) { }

    @Get(':slug')
    async getTenant(@Param('slug') slug: string): Promise<any> {
        const tenant = await this.tenantService.findBySlug(slug);
        if (!tenant) {
            throw new NotFoundException(`Tenant with slug ${slug} not found`);
        }
        return tenant;
    }


    @Post('validate-nas')
    async validateNasPost(
        @Req() request: any,
        @Body() body: { nasId?: string; bssid?: string; publicIp?: string },
    ): Promise<any> {
        return this.handleValidateNas(request, body);
    }

    @Get('validate-nas')
    async validateNasGet(
        @Req() request: any,
        @Query() query: { nasId?: string; bssid?: string; publicIp?: string },
    ): Promise<any> {
        return this.handleValidateNas(request, query);
    }

    @Post(':slug') // Changed to Post as some environments block Patch, or keep consistent
    async updateTenant(
        @Param('slug') slug: string,
        @Body() body: { name?: string; logoUrl?: string; id?: string },
        @Headers('authorization') auth: string,
    ): Promise<any> {
        if (!auth) throw new UnauthorizedException();
        const token = auth.replace('Bearer ', '');
        let payload: any;
        try {
            payload = this.jwtService.verify(token, {
                secret: process.env.BETTER_AUTH_SECRET,
            });
        } catch {
            throw new UnauthorizedException('Invalid token');
        }

        const userId = payload.sub || payload.id;

        let tenantId = body.id;
        if (!tenantId) {
            const tenant = await this.tenantService.findBySlug(slug);
            if (!tenant) throw new NotFoundException('Tenant not found');
            tenantId = tenant.id;
        }

        const isAdmin = await this.tenantService.isTenantAdmin(userId, tenantId);
        if (!isAdmin) {
            throw new ForbiddenException('Admin access required');
        }

        return this.tenantService.update(tenantId, {
            name: body.name,
            logoUrl: body.logoUrl
        });
    }

    private async handleValidateNas(request: any, data: { nasId?: string; bssid?: string; publicIp?: string }) {
        // Get IP from body or headers
        const forwarded = request.headers['x-forwarded-for'];
        const remoteIp = forwarded ? forwarded.split(',')[0].trim() : request.socket?.remoteAddress;
        const publicIp = data.publicIp || remoteIp;

        console.log(`[TenantController] Validating NAS: nasId=${data.nasId}, bssid=${data.bssid}, IP=${publicIp}`);

        const device = await this.tenantService.validateNas(
            data.nasId || undefined,
            data.bssid || undefined,
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
