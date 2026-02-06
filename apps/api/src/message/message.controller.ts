import { Controller, Get, Query, Delete, Param, ForbiddenException, Headers, UnauthorizedException, Inject } from '@nestjs/common';
import { ChatService } from '../chat/chat.service.js';
import { JwtService } from '@nestjs/jwt';
import fs from 'fs';

@Controller('messages')
export class MessageController {
    constructor(
        @Inject(ChatService) private readonly chatService: ChatService,
        private readonly jwtService: JwtService,
    ) { }

    @Get()
    async getMessages(
        @Query('roomId') roomId: string,
        @Query('tenantId') tenantId: string,
        @Headers('authorization') auth: string,
    ) {
        fs.appendFileSync('trace.log', `[MessageController] GET /messages roomId=${roomId} tenantId=${tenantId}\n`);
        if (!roomId || !tenantId) return [];

        try {
            return await this.chatService.getMessagesForRoom(roomId, tenantId);
        } catch (err: any) {
            fs.appendFileSync('trace.log', `[MessageController ERROR] ${err.message}\n`);
            throw err;
        }
    }

    @Delete(':id')
    async deleteMessage(
        @Param('id') messageId: string,
        @Query('tenantId') tenantId: string,
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

        const deleted = await this.chatService.deleteMessage(messageId, tenantId);
        return { success: deleted };
    }
}
