import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import path from 'path';
import Database from 'better-sqlite3';
import rateLimit from 'express-rate-limit';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rate Limiting per API HTTP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minuti
  max: 100, // Limite
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);

// SQLite Config
const db = new Database('chat.db');
db.pragma('journal_mode = WAL');

// Inizializza Tabelle
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
  if (!exists) {
    insertTenant.run(t.slug, t.name, Date.now());
    console.log(`🌱 Tenant creato: ${t.name} (${t.slug})`);
  }
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

// Mappa utenti online: socketId -> UserData (include tenantSlug)
const onlineUsers = new Map();

// Helper per inviare presenceUpdate solo agli utenti dello stesso tenant
const broadcastPresence = (tenantSlug) => {
  const users = Array.from(onlineUsers.values()).filter(u => u.tenantSlug === tenantSlug);
  io.to(`room:${tenantSlug}`).emit('presenceUpdate', users);
};

// Socket.io Logic
io.on('connection', (socket) => {

  // Gestione Identità
  socket.on('join', (data) => {
    const { user, tenantSlug } = data;
    if (!user || !tenantSlug) return;

    onlineUsers.set(socket.id, { ...user, socketId: socket.id, tenantSlug });

    // Unisciti a room del tenant e room personale
    socket.join(`room:${tenantSlug}`);
    socket.join(user.id);

    console.log(`\x1b[34m[JOIN]\x1b[0m ${user.alias} joined ${tenantSlug}`);
    broadcastPresence(tenantSlug);
  });

  socket.on('updateAlias', (data) => {
    const { oldAlias, newAlias } = data;
    const user = onlineUsers.get(socket.id);
    if (!user) return;

    console.log(`\x1b[33m[ALIAS]\x1b[0m ${oldAlias} -> ${newAlias} (${user.tenantSlug})`);

    // Aggiorna alias in memoria
    user.alias = newAlias;
    onlineUsers.set(socket.id, user);

    // Crea messaggio di sistema
    const sysMsg = {
      id: Math.random().toString(36).substr(2, 9),
      senderId: 'system',
      senderAlias: 'Sistema',
      senderGender: 'other',
      text: `Utente ${oldAlias} ha cambiato il suo alias in ${newAlias}`,
      timestamp: Date.now(),
      tenantSlug: user.tenantSlug
    };

    // Salva e invia a tutti nel tenant
    db.prepare('INSERT INTO messages (id, senderId, senderAlias, senderGender, text, timestamp, tenantSlug) VALUES (?, ?, ?, ?, ?, ?, ?)')
      .run(sysMsg.id, sysMsg.senderId, sysMsg.senderAlias, sysMsg.senderGender, sysMsg.text, sysMsg.timestamp, sysMsg.tenantSlug);

    io.to(`room:${user.tenantSlug}`).emit('newMessage', sysMsg);
    broadcastPresence(user.tenantSlug);
  });

  socket.on('sendMessage', (message) => {
    if (!message || !message.text) return;
    const user = onlineUsers.get(socket.id);
    if (!user) {
      console.log(`\x1b[31m[SEND_ERR]\x1b[0m Socket ${socket.id} not found in onlineUsers`);
      return;
    }

    console.log(`\x1b[32m[MSG]\x1b[0m ${user.alias} @ ${user.tenantSlug}: ${message.text.substring(0, 20)}`);

    // Rate Limiting
    const now = Date.now();
    if (socket.lastMessageTime && now - socket.lastMessageTime < 500) return;
    socket.lastMessageTime = now;

    // Bad Word Filter
    const badWords = ['stupido', 'idiota', 'scemo'];
    let cleanText = message.text;
    badWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      cleanText = cleanText.replace(regex, '***');
    });
    message.text = cleanText;
    message.tenantSlug = user.tenantSlug;
    message.recipientId = message.recipientId || null;
    message.timestamp = message.timestamp || Date.now();

    try {
      db.prepare(`
        INSERT INTO messages (id, senderId, senderAlias, senderGender, text, timestamp, recipientId, tenantSlug)
        VALUES (@id, @senderId, @senderAlias, @senderGender, @text, @timestamp, @recipientId, @tenantSlug)
      `).run(message);

      if (message.recipientId) {
        io.to(message.recipientId).emit('privateMessage', message);
        socket.emit('privateMessage', message);
      } else {
        io.to(`room:${user.tenantSlug}`).emit('newMessage', message);
      }
    } catch (err) {
      console.error('Failed to save message:', err);
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

// Mapping NAS ID -> Tenant Slug
const NAS_TENANT_MAP = {
  'ae:b6:ac:f9:6e:1e': 'treno-lucca-aulla'
};

// API: Validate NAS ID
app.get('/api/validate-nas', (req, res) => {
  const { nas_id } = req.query;
  const tenantSlug = NAS_TENANT_MAP[nas_id];
  if (tenantSlug) {
    res.json({ valid: true, tenantSlug });
  } else {
    res.json({ valid: false });
  }
});

// Redirect basato su nas_id
app.get('/', (req, res, next) => {
  const nasId = req.query.nas_id;

  if (nasId) {
    if (NAS_TENANT_MAP[nasId]) {
      const tenantSlug = NAS_TENANT_MAP[nasId];
      console.log(`🔀 Redirecting NAS ${nasId} to /${tenantSlug}`);

      try {
        const tenant = db.prepare('SELECT name FROM tenants WHERE slug = ?').get(tenantSlug);
        if (tenant) {
          console.log(`A user connected from ${nasId} that belongs to tenant ${tenant.name}`);
        }
      } catch (err) {
        console.error('Error fetching tenant name for logging:', err);
      }

      return res.redirect(`/${tenantSlug}`);
    } else {
      // Block invalid NAS ID
      return res.status(403).send(`
        <html>
          <head><title>Accesso Negato</title></head>
          <body style="font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; background: #f3f4f6;">
            <div style="text-align: center; padding: 2rem; background: white; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
              <h1 style="color: #ef4444; margin-bottom: 1rem;">Accesso Negato</h1>
              <p style="color: #374151;">La chat in questo spazio non e' attiva</p>
            </div>
          </body>
        </html>
      `);
    }
  }
  next();
});

// Serve i file statici
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(__dirname));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`
  🌟 QuickChat SERVER (Socket.io) AVVIATO!
  -----------------------------------------
  💻 Locale:    http://localhost:${PORT}
  📱 In Rete:   Cerca l'IP del tuo Mac
  -----------------------------------------
  Messaggi in tempo reale via WebSocket
  `);
});
