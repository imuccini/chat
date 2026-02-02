import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import path from 'path';
import rateLimit from 'express-rate-limit';
import next from 'next';
import { parse } from 'url';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Next.js
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const PORT = process.env.PORT || 3000;

nextApp.prepare().then(async () => {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer);

  app.use(express.json());

  // Rate Limiting per API HTTP
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use('/api', limiter);

  // API: Recupera metadata Tenant
  app.get('/api/tenants/:slug', async (req, res) => {
    try {
      const tenant = await prisma.tenant.findUnique({
        where: { slug: req.params.slug }
      });
      if (!tenant) return res.status(404).json({ error: 'Tenant not found' });
      res.json(tenant);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'DB Error' });
    }
  });

  // API: Recupera solo messaggi PUBBLICI del tenant (ultimi 100)
  app.get('/api/messages', async (req, res) => {
    const { tenant: tenantSlug } = req.query;
    if (!tenantSlug) return res.status(400).json({ error: 'Missing tenant parameter' });

    try {
      const tenantRecord = await prisma.tenant.findUnique({ where: { slug: String(tenantSlug) } });
      if (!tenantRecord) return res.json([]);

      const messages = await prisma.message.findMany({
        where: {
          tenantId: tenantRecord.id,
          recipientId: null // Public only
        },
        take: 100,
        orderBy: { createdAt: 'desc' }
      });

      const mappedMessages = messages.map(m => ({
        ...m,
        timestamp: m.createdAt.toISOString() // Consistent with client Message type
      }));

      res.json(mappedMessages.reverse());
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Database error' });
    }
  });

  // --- Socket.IO Logic ---
  const onlineUsers = new Map();
  const broadcastPresence = (tenantSlug) => {
    const users = Array.from(onlineUsers.values()).filter(u => u.tenantSlug === tenantSlug);
    io.to(`room:${tenantSlug}`).emit('presenceUpdate', users);
  };

  io.on('connection', (socket) => {
    socket.on('join', (data) => {
      const { user, tenantSlug } = data;
      if (!user || !tenantSlug) return;
      onlineUsers.set(socket.id, { ...user, socketId: socket.id, tenantSlug });
      socket.join(`room:${tenantSlug}`);
      socket.join(user.id);
      broadcastPresence(tenantSlug);
    });

    socket.on('sendMessage', async (message) => {
      if (!message || !message.text) return;
      const user = onlineUsers.get(socket.id);
      if (!user) return;

      const tenantSlug = user.tenantSlug;
      message.timestamp = new Date().toISOString();

      try {
        const tenantRecord = await prisma.tenant.findUnique({ where: { slug: tenantSlug } });
        if (tenantRecord) {
          await prisma.message.create({
            data: {
              id: message.id || Date.now().toString(),
              text: message.text,
              senderId: message.senderId,
              senderAlias: message.senderAlias,
              senderGender: message.senderGender,
              recipientId: message.recipientId || null,
              tenantId: tenantRecord.id,
              createdAt: new Date()
            }
          });
        }
      } catch (e) {
        console.error("Error saving message to Prisma:", e);
      }

      if (message.recipientId) {
        const recipientSocket = Array.from(onlineUsers.values()).find(u => u.id === message.recipientId);
        if (recipientSocket) {
          io.to(recipientSocket.socketId).emit('privateMessage', message);
        }
        // Send back to sender
        socket.emit('privateMessage', message);
      } else {
        io.to(`room:${tenantSlug}`).emit('newMessage', message);
      }
    });

    socket.on('disconnect', () => {
      const user = onlineUsers.get(socket.id);
      if (user) {
        onlineUsers.delete(socket.id);
        broadcastPresence(user.tenantSlug);
      }
    });
  });

  app.all('*', (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  httpServer.listen(PORT, () => {
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
