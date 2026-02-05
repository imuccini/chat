# QuickChat Solidification Walkthrough

We have successfully solidified the QuickChat application, transforming it from a prototype into a robust, real-time application suitable for production use in captive portals.

## 🏗️ Architecture Upgrades

### 1. Real-Time Communication (Socket.io)
- **Replaced**: Polling mechanisms (`setInterval` every 3s) have been removed.
- **Implemented**: `socket.io` on the server and `socket.io-client` on the frontend.
- **Benefit**:
  - **Instant Messaging**: Messages appear immediately for everyone.
  - **Efficiency**: No more wasted HTTP requests; significantly better battery life for mobile users.
  - **Reliable Presence**: "Online" count is now derived from active socket connections.

### 2. Persistence (SQLite)
- **Replaced**: In-memory ephemeral storage (`const messages = []`).
- **Implemented**: `better-sqlite3` database (`chat.db`).
- **Benefit**: Chat history survives server restarts and crashes. Messages are stored in a local `.db` file (WAL mode enabled for performance).

## 🛡️ Security & Reliability

### 3. Rate Limiting
- **API**: `express-rate-limit` protects the HTTP endpoints (max 100 req/15min).
- **Socket**: Custom throttling logic prevents users from sending more than 1 message every 500ms.

### 4. Moderation
- **Input Filter**: Basic "bad word" filter implemented on the server-side.

## 🏢 Multi-Tenant Platform
- **Isolation**: Different venues (e.g., `/spiaggia-azzurra`, `/disco-club`) have completely separate chat rooms, message histories, and online user lists.
- **Dynamic Branding**: The application title and welcome messages update automatically based on the URL.
- **Backend Architecture**: Global and Private messages are partitioned by `tenantSlug` in the database.

## 👤 User Management
- **Alias Change**: Users can update their alias from the profile settings. A system notification is automatically broadcasted to the global chat room: *"Utente [vecchio] ha cambiato il suo alias in [nuovo]"*.
- **Session Persistence**: User data and active private chats are preserved across page refreshes via `sessionStorage`.

## 📱 Mobile-First UI (WhatsApp Style)

### 5. Multi-Tab Navigation
- **Architecture**: A new sticky bottom navigation bar with four distinct views:
  - **Stanza**: Global chat room.
  - **Utenti**: List of online users with the ability to start 1:1 private chats.
  - **Chats**: List of active private conversations with unread message badges and chat deletion.
  - **Me**: User profile settings and logout.
- **Benefit**: Intuitive navigation that mimics modern messaging apps, providing a dedicated space for private interactions.

### 6. Private Messaging
- **Logic**: Messages can be routed to specific `recipientId`s via private Socket.io rooms.
- **Persistence**: Both public and private messages are stored securely in SQLite.

### 7. Progressive Web App
- **Plugin**: Added `vite-plugin-pwa`.
- **Manifest**: The app is now installable as "Treno WiFi Chat" on modern devices.
- **Offline Ready**: Service workers will cache assets.

## 🚦 How to Run

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Server**:
   ```bash
   npm start
   ```
   (Or `npm run dev` for development)

3. **Verify**:
   - Check that `chat.db` is created.
   - Open multiple tabs to test real-time syncing.
   - Send spam messages to test rate limiting.
