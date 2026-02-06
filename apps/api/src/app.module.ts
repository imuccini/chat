import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ChatModule } from './chat/chat.module.js';
import { TenantModule } from './tenant/tenant.module.js';
import { MessageModule } from './message/message.module.js';
import { PrismaModule } from './prisma/prisma.module.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { DiagController } from './diag.controller.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(__dirname, '../../../.env'),
      isGlobal: true,
    }),
    PrismaModule,
    TenantModule,
    ChatModule,
    MessageModule,
  ],
  controllers: [AppController, DiagController],
  providers: [AppService],
})
export class AppModule { }
