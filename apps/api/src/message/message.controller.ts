import { Controller, Get, Query, Delete, Param, ForbiddenException, Headers, UnauthorizedException } from '@nestjs/common';
import { ChatService } from '../chat/chat.service.js';
import { JwtService } from '@nestjs/jwt';

@Controller('messages')
export class MessageController {
    constructor(
        private readonly chatService: ChatService,
        private readonly jwtService: JwtService,
    ) { }

    @Get()
    async getMessages(
        @Query('roomId') roomId: string,
        @Query('tenantId') tenantId: string,
        @Headers('authorization') auth: string,
    ) {
        if (!roomId || !tenantId) return [];

        // Optional: Validate user session from Bearer token
        // const token = auth?.replace('Bearer ', '');
        // try {
        //   this.jwtService.verify(token, { secret: process.env.BETTER_AUTH_SECRET });
        // } catch {
        //   throw new UnauthorizedException('Invalid token');
        // }

        return this.chatService.getMessagesForRoom(roomId, tenantId);
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
