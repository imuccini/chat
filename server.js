import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import path from 'path';
import rateLimit from 'express-rate-limit';
import next from 'next';
import { parse } from 'url';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

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
  app.set('trust proxy', true);
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  app.use(cors());

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

  // API: Resolve tenant via NAS ID, BSSID, or IP (unified endpoint)
  app.get('/api/validate-nas', async (req, res) => {
    const { nas_id, bssid } = req.query;

    try {
      // 1. Try BSSID first (native app)
      if (bssid) {
        const deviceByBssid = await prisma.nasDevice.findUnique({
          where: { bssid: String(bssid) },
          include: { tenant: true }
        });
        if (deviceByBssid?.tenant) {
          return res.json({ valid: true, tenantSlug: deviceByBssid.tenant.slug });
        }
      }

      // 2. Try NAS ID (captive portal)
      if (nas_id) {
        const deviceByNasId = await prisma.nasDevice.findUnique({
          where: { nasId: String(nas_id) },
          include: { tenant: true }
        });
        if (deviceByNasId?.tenant) {
          return res.json({ valid: true, tenantSlug: deviceByNasId.tenant.slug });
        }
      }

      // 3. Try request IP (VPN or public)
      const forwardedFor = req.headers['x-forwarded-for'];
      let remoteIp = forwardedFor ? String(forwardedFor).split(',')[0].trim() : req.ip;

      // Normalize IPv6-mapped IPv4
      if (remoteIp && remoteIp.startsWith('::ffff:')) {
        remoteIp = remoteIp.replace('::ffff:', '');
      }

      if (remoteIp) {
        const deviceByIp = await prisma.nasDevice.findFirst({
          where: {
            OR: [
              { vpnIp: remoteIp },
              { publicIp: remoteIp }
            ]
          },
          include: { tenant: true }
        });
        if (deviceByIp?.tenant) {
          return res.json({ valid: true, tenantSlug: deviceByIp.tenant.slug });
        }
      }

      // No tenant found
      res.json({ valid: false });
    } catch (e) {
      console.error('Error in validate-nas:', e);
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
  const lastMessageTime = new Map(); // Rate limiting
  const RATE_LIMIT_MS = 500; // Minimum time between messages
  const MAX_MESSAGE_LENGTH = 1000;
  const MAX_ALIAS_LENGTH = 30;

  const broadcastPresence = (tenantSlug) => {
    const users = Array.from(onlineUsers.values()).filter(u => u.tenantSlug === tenantSlug);
    io.to(`room:${tenantSlug}`).emit('presenceUpdate', users);
  };

  // Helper to sanitize text (strip HTML tags)
  const sanitizeText = (text) => {
    if (typeof text !== 'string') return '';
    return text.replace(/<[^>]*>/g, '').trim();
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

      // Rate limiting check
      const now = Date.now();
      const lastTime = lastMessageTime.get(socket.id) || 0;
      if (now - lastTime < RATE_LIMIT_MS) {
        socket.emit('rateLimited', {
          message: 'Stai inviando messaggi troppo velocemente. Aspetta un momento.',
          retryAfter: RATE_LIMIT_MS - (now - lastTime)
        });
        return;
      }
      lastMessageTime.set(socket.id, now);

      // Message validation
      const sanitizedText = sanitizeText(message.text);
      if (!sanitizedText || sanitizedText.length === 0) {
        socket.emit('messageError', { message: 'Il messaggio non può essere vuoto.' });
        return;
      }
      if (sanitizedText.length > MAX_MESSAGE_LENGTH) {
        socket.emit('messageError', { message: `Il messaggio è troppo lungo (max ${MAX_MESSAGE_LENGTH} caratteri).` });
        return;
      }
      if (message.senderAlias && message.senderAlias.length > MAX_ALIAS_LENGTH) {
        socket.emit('messageError', { message: `Il nome è troppo lungo (max ${MAX_ALIAS_LENGTH} caratteri).` });
        return;
      }

      const tenantSlug = user.tenantSlug;
      message.text = sanitizedText; // Use sanitized version
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

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`> Ready on http://localhost:${PORT} and http://0.0.0.0:${PORT}`);
  });
});
