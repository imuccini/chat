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

    @Get()
    async listTenants(): Promise<any[]> {
        return this.tenantService.findAllPublic();
    }

    @Get(':slug')
    async getTenant(@Param('slug') slug: string): Promise<any> {
        const tenant = await this.tenantService.findBySlug(slug);
        if (!tenant) {
            throw new NotFoundException(`Tenant with slug ${slug} not found`);
        }
        return tenant;
    }
    @Get(':slug/staff')
    async getStaff(@Param('slug') slug: string): Promise<any[]> {
        return this.tenantService.findStaff(slug);
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
        const userId = await this.resolveUserId(auth);

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

    @Post(':slug/feedback')
    async submitFeedback(
        @Param('slug') slug: string,
        @Body() body: { score: number; comment?: string },
        @Headers('authorization') auth: string,
    ): Promise<any> {
        const userId = await this.resolveUserId(auth);
        const tenant = await this.tenantService.findBySlug(slug);
        if (!tenant) throw new NotFoundException('Tenant not found');

        return this.tenantService.createFeedback(userId, tenant.id, body.score, body.comment);
    }

    @Get(':slug/feedback')
    async getFeedbacks(
        @Param('slug') slug: string,
        @Headers('authorization') auth: string,
    ): Promise<any[]> {
        const userId = await this.resolveUserId(auth);
        const tenant = await this.tenantService.findBySlug(slug);
        if (!tenant) throw new NotFoundException('Tenant not found');

        const isAdmin = await this.tenantService.isTenantAdmin(userId, tenant.id);
        if (!isAdmin) {
            throw new ForbiddenException('Admin access required');
        }

        return this.tenantService.getFeedback(tenant.id);
    }

    private async resolveUserId(auth: string): Promise<string> {
        if (!auth) throw new UnauthorizedException();
        const token = auth.replace('Bearer ', '');

        // Try JWT first, then fall back to session token lookup
        let userId: string | undefined;
        try {
            const payload = this.jwtService.verify(token, {
                secret: process.env.BETTER_AUTH_SECRET,
            });
            userId = payload.sub || payload.id;
        } catch {
            // Not a JWT — try as a session token
            const resolvedUserId = await this.tenantService.resolveUserFromToken(token);
            if (resolvedUserId) {
                userId = resolvedUserId;
            }
        }

        if (!userId) {
            throw new UnauthorizedException('Invalid token');
        }
        return userId;
    }

    private async handleValidateNas(request: any, data: { nasId?: string; bssid?: string; publicIp?: string }) {
        // ... (existing code)
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
