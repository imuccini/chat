
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware per gestire i dati JSON
app.use(express.json());

// Database temporaneo in memoria (si azzera al riavvio del server)
const db = {
  messages: [],
  presence: {} // { userId: { alias: string, lastSeen: number } }
};

// API: Recupera tutti i messaggi
app.get('/api/messages', (req, res) => {
  res.json(db.messages);
});

// API: Invia un nuovo messaggio
app.post('/api/messages', (req, res) => {
  const message = req.body;
  if (!message || !message.text) return res.status(400).json({ error: 'Messaggio non valido' });

  // Limita la cronologia a 100 messaggi per performance
  db.messages.push(message);
  if (db.messages.length > 100) db.messages.shift();

  // LOG NEL TERMINALE: <alias> (time) <message>
  const time = new Date(message.timestamp || Date.now()).toLocaleTimeString('it-IT', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  console.log(`\x1b[32m<${message.senderAlias}>\x1b[0m \x1b[90m(${time})\x1b[0m ${message.text}`);

  res.status(201).json(message);
});

// API: Aggiorna presenza e ottieni conteggio utenti
app.post('/api/presence', (req, res) => {
  const { id, alias } = req.body;
  const now = Date.now();

  if (id) {
    db.presence[id] = { alias, lastSeen: now };
  }

  // Pulisci utenti inattivi (> 15 secondi)
  const threshold = now - 15000;
  let activeCount = 0;
  Object.keys(db.presence).forEach(userId => {
    if (db.presence[userId].lastSeen > threshold) {
      activeCount++;
    } else {
      delete db.presence[userId];
    }
  });

  res.json({ activeCount });
});

// Serve i file statici dalla cartella di build
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(__dirname)); // Fallback per sviluppo diretto

// Rotta per la SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`
  🌟 QuickChat SERVER AVVIATO!
  -----------------------------------------
  💻 Locale:    http://localhost:${PORT}
  📱 In Rete:   Cerca l'IP del tuo Mac (es. http://192.168.1.15:${PORT})
  -----------------------------------------
  Messaggi in tempo reale:
  `);
});
