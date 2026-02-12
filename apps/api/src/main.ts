// Force restart - 1
import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import { Server } from 'socket.io';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  // Set Global Prefix
  app.setGlobalPrefix('api');

  // CORS Configuration
  app.enableCors({
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
      const allowed = [
        'capacitor://localhost',
        'http://localhost',
        'http://localhost:3000',
      ];
      const isAllowed = !origin || allowed.includes(origin) ||
        origin?.startsWith('http://192.168.') ||
        origin?.startsWith('http://10.') ||
        origin?.startsWith('http://172.');
      callback(null, isAllowed);
    },
    credentials: true,
  });

  // Redis Adapter for Socket.IO (optional - enable when Redis is available)
  if (process.env.REDIS_URL) {
    try {
      const pubClient = createClient({ url: process.env.REDIS_URL });
      const subClient = pubClient.duplicate();

      await Promise.all([pubClient.connect(), subClient.connect()]);

      const ioAdapter = new IoAdapter(app);
      // @ts-ignore - custom adapter setup
      ioAdapter.createIOServer = (port: number, options?: any) => {
        const io = new Server(port, options);
        io.adapter(createAdapter(pubClient, subClient));
        return io;
      };

      app.useWebSocketAdapter(ioAdapter);
      logger.log('Redis adapter enabled for Socket.IO');
    } catch (error) {
      logger.warn('Redis connection failed, using default adapter');
    }
  }

  const port = process.env.API_PORT || 3001;
  const host = '0.0.0.0';
  console.log(`[Bootstrap] Attempting to listen on ${host}:${port} (API_PORT=${process.env.API_PORT})`);
  await app.listen(port, host);
  logger.log(`🚀 API server running on http://${host}:${port}`);
}

bootstrap();
