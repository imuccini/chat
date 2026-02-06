import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MessageController } from './message.controller.js';
import { ChatModule } from '../chat/chat.module.js';
import { TenantModule } from '../tenant/tenant.module.js';

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.BETTER_AUTH_SECRET,
        }),
        ChatModule,
        TenantModule,
    ],
    controllers: [MessageController],
})
export class MessageModule { }
