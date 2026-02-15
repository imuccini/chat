import {
  Controller,
  Get,
  Query,
  Delete,
  Param,
  ForbiddenException,
  Headers,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { ChatService } from '../chat/chat.service.js';
import { JwtService } from '@nestjs/jwt';
import fs from 'fs';

@Controller('messages')
export class MessageController {
  constructor(
    @Inject(ChatService) private readonly chatService: ChatService,
    private readonly jwtService: JwtService,
  ) {}

  @Get()
  async getMessages(
    @Query('roomId') roomId: string | undefined,
    @Query('tenant') tenantSlug: string, // Changed to match frontend 'tenant' param which is slug
    @Query('tenantId') tenantId: string | undefined,
    @Query('since') since: string | undefined,
    @Headers('authorization') auth: string,
  ) {
    let targetTenantId = tenantId;

    // If we only have slug, resolve the ID
    if (!targetTenantId && tenantSlug) {
      const tenant = await this.chatService.getTenantBySlug(tenantSlug);
      if (tenant) targetTenantId = tenant.id;
    }

    if (!targetTenantId) {
      // If we still don't have a specific tenant, we can't return messages safely
      return [];
    }

    try {
      return await this.chatService.getMessagesForRoom(
        targetTenantId,
        roomId,
        100,
        since,
      );
    } catch (err: any) {
      throw err;
    }
  }

  @Get('private')
  async getPrivateMessages(
    @Query('userId') userId: string,
    @Query('tenant') tenantSlug: string,
    @Query('tenantId') tenantId: string | undefined,
    @Query('since') since: string | undefined,
    @Headers('authorization') auth: string,
  ) {
    if (!userId) return [];

    let targetTenantId = tenantId;
    if (!targetTenantId && tenantSlug) {
      const tenant = await this.chatService.getTenantBySlug(tenantSlug);
      if (tenant) targetTenantId = tenant.id;
    }

    if (!targetTenantId) return [];

    try {
      return await this.chatService.getPrivateMessages(
        userId,
        targetTenantId,
        since,
      );
    } catch (err: any) {
      throw err;
    }
  }

  @Delete(':id')
  async deleteMessage(
    @Param('id') messageId: string,
    @Query('tenantId') tenantId: string | undefined,
    @Headers('x-tenant-slug') tenantSlug: string, // Web passes slug
    @Headers('authorization') auth: string,
  ) {
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

    // Check moderation permissions
    const canModerate = await this.chatService.canModerate(userId, tenantSlug);
    if (!canModerate) {
      throw new ForbiddenException('Not authorized to delete messages');
    }

    let targetTenantId = tenantId;
    if (!targetTenantId && tenantSlug) {
      const tenant = await this.chatService.getTenantBySlug(tenantSlug);
      if (tenant) targetTenantId = tenant.id;
    }

    if (!targetTenantId) {
      throw new ForbiddenException('Tenant ID required');
    }

    const deleted = await this.chatService.deleteMessage(
      messageId,
      targetTenantId,
    );
    return { success: deleted };
  }
}
