import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import path from 'path';
import Database from 'better-sqlite3';
import rateLimit from 'express-rate-limit';
import next from 'next';
import { parse } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Next.js
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const PORT = process.env.PORT || 3000;

nextApp.prepare().then(() => {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer);

  app.use(express.json());

  // Rate Limiting per API HTTP
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minuti
    max: 100, // Limite
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use('/api', limiter);

  // SQLite Config (Legacy - Consider moving to Prisma eventually)
  const db = new Database('chat.db');
  db.pragma('journal_mode = WAL');

  // ... (Existing DB Schema init logic preserved below in abbreviated form if needed, or we rely on Prisma in newer services)
  // For now, keeping legacy DB init to ensure existing logic still works until full migration
  db.exec(`
    CREATE TABLE IF NOT EXISTS tenants (
      slug TEXT PRIMARY KEY,
      name TEXT,
      createdAt INTEGER
    );
    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      senderId TEXT,
      senderAlias TEXT,
      senderGender TEXT,
      text TEXT,
      timestamp INTEGER,
      recipientId TEXT,
      tenantSlug TEXT
    );
  `);
  // Migrations
  try { db.exec('ALTER TABLE messages ADD COLUMN recipientId TEXT'); } catch (e) { }
  try { db.exec('ALTER TABLE messages ADD COLUMN tenantSlug TEXT'); } catch (e) { }

  // Seed Tenants
  const defaultTenants = [
    { slug: 'spiaggia-azzurra', name: 'Spiaggia Azzurra' },
    { slug: 'disco-club', name: 'Disco Club 90' },
    { slug: 'treno-wifi', name: 'Treno WiFi Chat' },
    { slug: 'treno-lucca-aulla', name: 'Treno Lucca-Aulla' }
  ];
  const insertTenant = db.prepare('INSERT INTO tenants (slug, name, createdAt) VALUES (?, ?, ?)');
  defaultTenants.forEach(t => {
    const exists = db.prepare('SELECT 1 FROM tenants WHERE slug = ?').get(t.slug);
    if (!exists) insertTenant.run(t.slug, t.name, Date.now());
  });


  // API: Recupera metadata Tenant
  app.get('/api/tenants/:slug', (req, res) => {
    const tenant = db.prepare('SELECT * FROM tenants WHERE slug = ?').get(req.params.slug);
    if (!tenant) return res.status(404).json({ error: 'Tenant not found' });
    res.json(tenant);
  });

  // API: Recupera solo messaggi PUBBLICI del tenant (ultimi 100)
  app.get('/api/messages', (req, res) => {
    const { tenant } = req.query;
    if (!tenant) return res.status(400).json({ error: 'Missing tenant parameter' });
    try {
      const messages = db.prepare(`
        SELECT * FROM messages 
        WHERE recipientId IS NULL AND tenantSlug = ?
        ORDER BY timestamp DESC 
        LIMIT 100
      `).all(tenant);
      res.json(messages.reverse());
    } catch (err) {
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

      // Save to SQLite (Legacy)
      try {
        db.prepare(`
          INSERT INTO messages (id, senderId, senderAlias, senderGender, text, timestamp, recipientId, tenantSlug)
          VALUES (@id, @senderId, @senderAlias, @senderGender, @text, @timestamp, @recipientId, @tenantSlug)
        `).run({ ...message, recipientId: message.recipientId || null });
      } catch (e) {
        console.error("Error saving socket message", e);
      }

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
