import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ChatGateway } from './chat.gateway.js';
import { ChatService } from './chat.service.js';

import { TenantModule } from '../tenant/tenant.module.js';
import { TenantService } from '../tenant/tenant.service.js';

console.error('[ChatModule] FILE EVALUATED');

@Module({
    imports: [
        TenantModule,
        JwtModule.register({
            secret: process.env.BETTER_AUTH_SECRET,
        }),
    ],
    providers: [ChatGateway, ChatService],
    exports: [ChatGateway, ChatService],
})
export class ChatModule { }
