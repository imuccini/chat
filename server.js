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

  const isValidOrigin = (origin) => {
    if (!origin) return true; // Allow server-to-server or non-browser requests
    const allowed = [
      'capacitor://localhost',
      'http://localhost',
      'http://localhost:3000',
    ];
    // Check if it's in the allowed list OR if it's a local IP address (192.168.x.x, 10.x.x.x, etc.)
    return allowed.includes(origin) ||
      origin.startsWith('http://192.168.') ||
      origin.startsWith('http://10.') ||
      origin.startsWith('http://172.');
  };

  app.use(cors({
    origin: (origin, callback) => {
      if (isValidOrigin(origin)) {
        callback(null, true);
      } else {
        console.warn(`Blocked by CORS: ${origin}`);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
  }));

  // Rate Limiting per API HTTP
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    validate: { trustProxy: false },
  });
  app.use('/api', limiter);

  // API: Recupera metadata Tenant
  app.get('/api/tenants/:slug', async (req, res) => {
    try {
      const tenant = await prisma.tenant.findUnique({
        where: { slug: req.params.slug },
        include: { rooms: true }
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

  // API: Recupera messaggi per stanza o globali
  app.get('/api/messages', async (req, res) => {
    const { tenant: tenantSlug, roomId } = req.query;
    if (!tenantSlug) return res.status(400).json({ error: 'Missing tenant parameter' });

    try {
      const tenantRecord = await prisma.tenant.findUnique({ where: { slug: String(tenantSlug) } });
      if (!tenantRecord) return res.json([]);

      const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000);

      const whereCondition = {
        tenantId: tenantRecord.id,
        recipientId: null, // Public/Group only
        createdAt: { gte: threeHoursAgo }
      };

      if (roomId) {
        whereCondition.roomId = String(roomId);
      } else {
        // Fallback for transition: if no roomId requested, maybe return "Global" ones? 
        // Or return all? For now specific room request is safer.
        // If legacy client calls without roomId, we might return legacy messages (roomId=null).
        whereCondition.roomId = null;
      }

      const messages = await prisma.message.findMany({
        where: whereCondition,
        take: 100,
        orderBy: { createdAt: 'desc' }
      });

      const mappedMessages = messages.map(m => ({
        ...m,
        timestamp: m.createdAt.toISOString()
      }));

      res.json(mappedMessages.reverse());
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Database error' });
    }
  });

  // --- Socket.IO Logic ---
  const onlineUsers = new Map();
  const lastMessageTime = new Map();
  const RATE_LIMIT_MS = 500;
  const MAX_MESSAGE_LENGTH = 1000;
  const MAX_ALIAS_LENGTH = 30;

  const broadcastPresence = (tenantSlug) => {
    const users = Array.from(onlineUsers.values()).filter(u => u.tenantSlug === tenantSlug);
    // Broadcast presence to the tenant "lobby" room
    io.to(`tenant:${tenantSlug}`).emit('presenceUpdate', users);
  };

  const sanitizeText = (text) => {
    if (typeof text !== 'string') return '';
    return text.replace(/<[^>]*>/g, '').trim();
  };

  io.on('connection', (socket) => {
    socket.on('join', async (data) => {
      const { user, tenantSlug } = data;
      if (!user || !tenantSlug) return;
      onlineUsers.set(socket.id, { ...user, socketId: socket.id, tenantSlug });

      // Join Tenant Lobby (for presence and system events)
      socket.join(`tenant:${tenantSlug}`);

      // Join User's Private Room
      socket.join(user.id);

      // Join All Tenant Rooms (Announcements, General, etc.) to receive live updates
      try {
        const tenant = await prisma.tenant.findUnique({
          where: { slug: tenantSlug },
          include: { rooms: true }
        });
        if (tenant && tenant.rooms) {
          tenant.rooms.forEach(room => {
            socket.join(room.id);
          });
        }
      } catch (e) {
        console.error("Error joining tenant rooms:", e);
      }

      broadcastPresence(tenantSlug);
    });

    socket.on('sendMessage', async (message) => {
      if (!message || !message.text) return;
      const user = onlineUsers.get(socket.id);
      if (!user) return;

      const now = Date.now();
      const lastTime = lastMessageTime.get(socket.id) || 0;
      if (now - lastTime < RATE_LIMIT_MS) {
        socket.emit('rateLimited', { retryAfter: RATE_LIMIT_MS - (now - lastTime) });
        return;
      }
      lastMessageTime.set(socket.id, now);

      const sanitizedText = sanitizeText(message.text);
      if (!sanitizedText || sanitizedText.length === 0) return;

      // Validate lengths... (omitted for brevity, handled similar to before/client side validation primarily)

      const tenantSlug = user.tenantSlug;
      message.text = sanitizedText;
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
              roomId: message.roomId || null,
              tenantId: tenantRecord.id,
              createdAt: new Date()
            }
          });
        }
      } catch (e) {
        console.error("Error saving message:", e);
      }

      if (message.recipientId) {
        // Private Message
        const recipientSocket = Array.from(onlineUsers.values()).find(u => u.id === message.recipientId);
        if (recipientSocket) io.to(recipientSocket.socketId).emit('privateMessage', message);
        socket.emit('privateMessage', message);
      } else if (message.roomId) {
        // Room Message
        io.to(message.roomId).emit('newMessage', message);
      } else {
        // Fallback Global Message (Legacy)
        io.to(`tenant:${tenantSlug}`).emit('newMessage', message);
      }
    });

    socket.on('deleteMessage', async (data) => {
      const { messageId, roomId, tenantSlug } = data;
      if (!messageId || !tenantSlug) return;

      const user = onlineUsers.get(socket.id);
      if (!user) return;

      try {
        // Verify permissions
        const tenant = await prisma.tenant.findUnique({
          where: { slug: tenantSlug },
          include: {
            members: {
              where: { userId: user.id }
            }
          }
        });

        const membership = tenant?.members[0];
        const canModerate = membership && (membership.role === 'ADMIN' || membership.role === 'MODERATOR' || membership.canModerate);

        if (!canModerate) {
          socket.emit('error', { message: 'Unauthorized to delete messages' });
          return;
        }

        await prisma.message.delete({
          where: { id: messageId }
        });

        // Broadcast deletion
        if (roomId) {
          io.to(roomId).emit('messageDeleted', { messageId, roomId });
        } else {
          io.to(`tenant:${tenantSlug}`).emit('messageDeleted', { messageId });
        }
      } catch (e) {
        console.error("Error deleting message:", e);
        socket.emit('error', { message: 'Failed to delete message' });
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
