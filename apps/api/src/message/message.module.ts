import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MessageController } from './message.controller.js';
import { ChatModule } from '../chat/chat.module.js';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.BETTER_AUTH_SECRET,
    }),
    ChatModule,
  ],
  controllers: [MessageController],
})
export class MessageModule {}
