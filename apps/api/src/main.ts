// Force restart - 1
import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module.js';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import { Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const logger = new Logger('Bootstrap');

  // Set Global Prefix
  // Set Global Prefix
  app.setGlobalPrefix('api');

  // Simple Request Logger
  app.use((req: any, res: any, next: any) => {
    console.log(`[Request] ${req.method} ${req.url}`);
    next();
  });

  // CORS Configuration
  app.enableCors({
    origin: (
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void,
    ) => {
      const allowed = [
        'capacitor://localhost',
        'http://localhost',
        'http://localhost:3000',
        'https://app.meetlocal.app',
      ];
      const isAllowed =
        !origin ||
        allowed.includes(origin) ||
        origin?.startsWith('http://192.168.') ||
        origin?.startsWith('http://10.') ||
        origin?.startsWith('http://172.');
      callback(null, isAllowed);
    },
    credentials: true,
  });

  // Serve uploaded files (avatars, etc.) as static assets
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  app.useStaticAssets(join(__dirname, '../uploads'), { prefix: '/api/uploads' });

  // Redis Adapter for Socket.IO (optional - enable when Redis is available)
  if (process.env.REDIS_URL) {
    try {
      const pubClient = createClient({ url: process.env.REDIS_URL });
      const subClient = pubClient.duplicate();

      await Promise.all([pubClient.connect(), subClient.connect()]);

      // Proper Adapter Class to ensure we attach to the HTTP server
      class RedisIoAdapter extends IoAdapter {
        createIOServer(port: number, options?: any): any {
          const server = super.createIOServer(port, options);
          server.adapter(createAdapter(pubClient, subClient));
          return server;
        }
      }

      app.useWebSocketAdapter(new RedisIoAdapter(app));
      logger.log('Redis adapter enabled for Socket.IO');
    } catch (error) {
      logger.warn(
        `Redis connection failed: ${error.message}, using default adapter`,
      );
    }
  }

  const port = process.env.API_PORT || 3001;
  const host = '0.0.0.0';
  console.log(
    `[Bootstrap] Attempting to listen on ${host}:${port} (API_PORT=${process.env.API_PORT})`,
  );
  await app.listen(port, host);
  logger.log(`🚀 API server running on http://${host}:${port}`);
}

bootstrap();
