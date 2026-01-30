# QuickChat Solidification Plan

This plan outlines steps to transform the current prototype into a robust, production-ready application, specifically tailored for a **captive portal environment** (high mobile usage, potentially unstable/restricted internet).

## 1. Architecture & Performance (Critical)

### 🚀 Migrate from Polling to WebSockets
**Current State:** The app polls the server every 3 seconds.
**Problem:** High battery drain for users, latency in messages, and unnecessary server load.
**Recommendation:** Implement **Socket.io**.
- **Why:** Instant message delivery, lower latency, significantly reduced battery consumption on mobile devices.
- **Implementation:** Replace the `setInterval` in `ChatRoom.tsx` with a socket connection.

### 🗄️ Persistence (SQLite)
**Current State:** In-memory `const db = { messages: [] }`. Data is lost on server restart.
**Recommendation:** Use **SQLite** (via `better-sqlite3` or `sqlite3`).
- **Why:** Zero-configuration, file-based database perfect for local/embedded environments. It allows chat history to survive server restarts/deployment updates without needing a complex external DB server.

## 2. Security & Regulation

### 🛡️ Rate Limiting & spam Protection
**Current State:** No limits on API endpoints.
**Problem:** A malicious user could flood the chat or crash the server memory.
**Recommendation:**
- Add `express-rate-limit` to throttle message sending (e.g., max 5 messages per 10 seconds).
- Implement basic input sanitization (DOMPurify on client or server safeguards) to strictly prevent HTML injection, although React escapes by default.

### 👮 Automated Moderation
**Current State:** Free-for-all.
**Recommendation:**
- **Bad Word Filter:** A simple local dictionary to replace profanity with asterisks.
- **Shadowban:** Ability to mute users locally without them knowing (useful in confined public spaces).

## 3. User Experience (Mobile First)

### 💓 Connection Resilience
**Current State:** Basic "Offline" indicator.
**Recommendation:**
- **Reconnection Logic:** With Socket.io, handle "reconnecting" states gracefully (e.g., when a train goes through a tunnel).
- **Queueing:** If offline, queue sent messages and retry automatically when connection returns.

### 📱 PWA Upgrade
**Current State:** Standard web app.
**Recommendation:** Add a `manifest.json` and Service Worker.
- Allows users to "Add to Home Screen" for a full-screen app experience, hiding the browser UI entirely and giving more screen real estate.

## 4. Deployment & DevOps

### 🐳 Dockerization
**Recommendation:** Create a `Dockerfile`.
- Ensures the environment (Node version, dependencies) is identical on your dev machine and the captive portal server hardware.
- Simplifies restarts (`docker restart quickchat`).

## Implementation Roadmap

| Phase | Task | Effort | Impact |
|-------|------|--------|--------|
| **1** | **Socket.io Migration** | Medium | ⭐⭐⭐⭐⭐ _(Critical for "Chat" feel)_ |
| **2** | **SQLite Persistence** | Low | ⭐⭐⭐⭐ _(Don't lose data)_ |
| **3** | **Rate Limiting & Security** | Low | ⭐⭐⭐ |
| **4** | **PWA / Manifest** | Low | ⭐⭐⭐ |
