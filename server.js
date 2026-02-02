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
      // Map Prisma date to timestamp number if expected by client legacy format, 
      // OR just return standard JSON. The client 'ChatInterface' uses `tenant.slug` and `tenant.name`.
      // The type definition expects `createdAt` to be Date or string.
      res.json(tenant);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'DB Error' });
    }
  });

  // API: Recupera solo messaggi PUBBLICI del tenant (ultimi 100)
  app.get('/api/messages', async (req, res) => {
    const { tenant } = req.query;
    if (!tenant) return res.status(400).json({ error: 'Missing tenant parameter' });

    try {
      // We find tenant first to get ID? Or just join?
      // Actually we need to filter by tenant.
      const tenantRecord = await prisma.tenant.findUnique({ where: { slug: String(tenant) } });
      if (!tenantRecord) return res.json([]);

      const messages = await prisma.message.findMany({
        where: {
          tenantId: tenantRecord.id,
          recipientId: null // Public only
        },
        take: 100,
        orderBy: { createdAt: 'desc' }
      });

      // The client expects `timestamp` (number). Prisma has `createdAt` (Date).
      // We should map it back to match legacy type `Message`.
      const mappedMessages = messages.map(m => ({
        ...m,
        timestamp: m.createdAt.getTime() // Convert Date to ms
      }));

      res.json(mappedMessages.reverse());
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Database error' });
    }
  });

  // Mapping NAS ID -> Tenant Slug (Legacy/Express logic)
  const NAS_TENANT_MAP = {
    'ae:b6:ac:f9:6e:1e': 'treno-lucca-aulla'
  };

  app.get('/api/validate-nas', (req, res) => {
    const { nas_id } = req.query;
    const tenantSlug = NAS_TENANT_MAP[nas_id];
    if (tenantSlug) {
      res.json({ valid: true, tenantSlug });
    } else {
      res.json({ valid: false });
    }
  });

  // --- Socket.IO Logic (Preserved) ---
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

    socket.on('sendMessage', (message) => {
      // NOTE: This logic handles the socket message. 
      // Ideally, in the new architecture, you might rely solely on Server Actions + Optimistic UI,
      // but keeping this allows instant feedback and broadcasting to OTHERS.

      if (!message || !message.text) return;
      const user = onlineUsers.get(socket.id);
      if (!user) return;

      message.tenantSlug = user.tenantSlug;
      message.timestamp = Date.now();

      // Save to Postgres (Prisma)
      (async () => {
        try {
          const tenantRecord = await prisma.tenant.findUnique({ where: { slug: user.tenantSlug } });
          if (tenantRecord) {
            await prisma.message.create({
              data: {
                id: message.id, // Use client generated UUID? Or let Prisma generate? 
                // Legacy client sends 'id'. We should respect it if possible or ignore.
                // Prisma schema has `id String @default(uuid())`.
                // If we pass ID, it uses it.
                // Legacy client sends 'text', schema has 'text'.
                text: message.text,
                senderId: message.senderId,
                senderAlias: message.senderAlias,
                senderGender: message.senderGender,
                recipientId: message.recipientId || null,
                tenantId: tenantRecord.id,
                createdAt: new Date() // Current time
              }
            });
          }
        } catch (e) {
          console.error("Error saving message to Prisma:", e);
        }
      })();

      // Check if Private Message
      if (message.recipientId) {
        // 1. Find Recipient Socket
        const recipientSocket = Array.from(onlineUsers.values()).find(u => u.id === message.recipientId);

        if (recipientSocket) {
          // Send to Recipient
          io.to(recipientSocket.socketId).emit('privateMessage', message);
          // Send back to Sender (optional, enables multi-device sync if implemented later)
          // But for now, we just rely on Optimistic UI or we can ack.
          // Let's emit back so other tabs of sender get it too
          io.to(user.socketId).emit('privateMessage', message);
        }
      } else {
        // Broadcast Public Message
        io.to(`room:${user.tenantSlug}`).emit('newMessage', message);
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

  // --- Next.js Request Handler ---
  // This handles all other routes (pages, public assets, next api routes)
  app.all('*', (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  httpServer.listen(PORT, () => {
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
