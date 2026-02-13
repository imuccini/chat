# iOS Production Connectivity - Complete Checklist

## 🎯 Goal
Ensure your iOS app (built in Xcode) can connect to `app.meetlocal.app` for:
- ✅ Web App (Next.js)
- ✅ REST API (NestJS)
- ✅ WebSocket (Socket.IO)
- ✅ Authentication (BetterAuth)
- ✅ Presence/Resuscitation after backgrounding

## 📋 Pre-Flight Checklist

### ✅ 1. Environment Variables
**File**: `.env` (root of project)

```bash
# Production URLs (Cloudflare SSL - no port numbers)
BETTER_AUTH_URL=https://app.meetlocal.app
NEXT_PUBLIC_SERVER_URL=https://app.meetlocal.app

# Database
DATABASE_URL="postgresql://postgres:password@db:5432/chat_db"

# Auth Secret (use a STRONG random string in production!)
BETTER_AUTH_SECRET="your-super-secret-production-key-minimum-32-chars"

# Optional: Redis for Socket.IO horizontal scaling
REDIS_URL="redis://redis:6379"

# Google/Apple OAuth (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
NEXT_PUBLIC_GOOGLE_CLIENT_ID_IOS="your-ios-google-client-id"
NEXT_PUBLIC_APPLE_CLIENT_ID="com.yourapp.bundle.id"
```

**Verification**:
```bash
# On your server
cd /path/to/chat
cat .env | grep NEXT_PUBLIC_SERVER_URL
# Should output: NEXT_PUBLIC_SERVER_URL=https://app.meetlocal.app
```

---

### ✅ 2. Nginx Configuration
**File**: `/etc/nginx/sites-available/app.meetlocal.app`

**Current Setup**: Cloudflare Flexible SSL (HTTP on port 80)

**Action Required**:
1. Update your nginx config to include `X-Forwarded-Proto: https` header
2. Add Cloudflare real IP ranges

**Use this config**: `docs/CLOUDFLARE_SSL_SETUP.md`

**Apply changes**:
```bash
# Backup current config
sudo cp /etc/nginx/sites-available/app.meetlocal.app /etc/nginx/sites-available/app.meetlocal.app.backup

# Edit config
sudo nano /etc/nginx/sites-available/app.meetlocal.app

# Test config
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

**Verification**:
```bash
# Test API
curl -v https://app.meetlocal.app/api/tenants

# Test WebSocket (should not get 404)
curl -v https://app.meetlocal.app/socket.io/
# Expected: {"code":0,"message":"Transport unknown"}
```

---

### ✅ 3. Cloudflare Settings

#### DNS
```
Type    Name    Content                 Proxy Status
A       app     <Your Server IP>        🟠 Proxied (orange cloud)
```

#### SSL/TLS
1. Go to **SSL/TLS** → **Overview**
2. Current: **Flexible** ✅
3. Recommended: Upgrade to **Full SSL** (see upgrade guide)

#### Network
1. Go to **Network**
2. **WebSockets**: ✅ ON (CRITICAL!)

**Verification**:
```bash
# Check if Cloudflare is proxying
curl -I https://app.meetlocal.app
# Should see: cf-ray: <some-value>
```

---

### ✅ 4. Code Changes (Already Applied)

#### File: `apps/web/config.ts`
✅ Updated `resolveNativeApiUrl()` function to handle production URLs without ports

#### Files to Update: Presence/Resuscitation
See `docs/PRESENCE_RESUSCITATION_FIX.md` for detailed implementation.

**Summary of changes needed**:
1. **Server** (`apps/api/src/chat/chat.gateway.ts`):
   - Add `userSocketMap` for user ID → socket ID tracking
   - Update `handleJoin` to remove ghost sockets
   - Update `handleDisconnect` to clean up properly
   - Add shorter `pingTimeout: 10000` and `pingInterval: 5000`

2. **Client** (`apps/web/components/ChatInterface.tsx`):
   - Add Capacitor `App.addListener` for foreground/background detection
   - Add `reconnect` event handler
   - Update reconnection strategy to `Infinity` attempts
   - Add dedicated `joinTenant()` function

---

### ✅ 5. Server Deployment

#### Docker Compose (Recommended)
**File**: `docker-compose.yml` (create if not exists)

```yaml
version: '3.8'

services:
  # PostgreSQL Database
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: chat_db
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    restart: unless-stopped

  # Redis (optional, for Socket.IO scaling)
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    restart: unless-stopped

  # Next.js Web App
  web:
    build:
      context: .
      dockerfile: apps/web/Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_SERVER_URL=https://app.meetlocal.app
      - BETTER_AUTH_URL=https://app.meetlocal.app
      - BETTER_AUTH_SECRET=${BETTER_AUTH_SECRET}
      - DATABASE_URL=postgresql://postgres:password@db:5432/chat_db
    depends_on:
      - db
      - redis
    restart: unless-stopped

  # NestJS API
  api:
    build:
      context: .
      dockerfile: apps/api/Dockerfile
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - API_PORT=3001
      - DATABASE_URL=postgresql://postgres:password@db:5432/chat_db
      - REDIS_URL=redis://redis:6379
      - BETTER_AUTH_SECRET=${BETTER_AUTH_SECRET}
    depends_on:
      - db
      - redis
    restart: unless-stopped

volumes:
  pgdata:
```

**Deploy**:
```bash
# On your server
cd /path/to/chat

# Build and start
docker-compose up -d --build

# Check logs
docker-compose logs -f web
docker-compose logs -f api

# Check status
docker-compose ps
```

---

### ✅ 6. iOS App Build Configuration

#### Capacitor Config
**File**: `apps/web/capacitor.config.ts`

✅ Already configured correctly:
```typescript
const config: CapacitorConfig = {
  appId: 'io.trenochat.app',
  appName: 'TrenoChat',
  webDir: 'out',
  // ... other config
};
```

#### Build for Production
```bash
cd apps/web

# 1. Set environment to production
export NODE_ENV=production
export NEXT_PUBLIC_SERVER_URL=https://app.meetlocal.app
export BETTER_AUTH_URL=https://app.meetlocal.app

# 2. Build Next.js app
npm run build

# 3. Export static files (if using static export)
# OR ensure output: 'standalone' in next.config.mjs

# 4. Build Capacitor
npm run build:cap

# 5. Sync with iOS
npx cap sync ios

# 6. Open in Xcode
npx cap open ios
```

#### Xcode Settings

1. **Signing & Capabilities**:
   - ✅ Team selected
   - ✅ Bundle Identifier: `io.trenochat.app`

2. **Info.plist** (Check for App Transport Security):
   ```xml
   <!-- Should NOT need this if using HTTPS, but just in case -->
   <key>NSAppTransportSecurity</key>
   <dict>
       <key>NSAllowsArbitraryLoads</key>
       <false/>
       <!-- Cloudflare handles SSL, so your app only sees HTTPS -->
   </dict>
   ```

3. **Build Settings**:
   - Deployment Target: iOS 13.0+ ✅
   - Architecture: arm64 (for device), x86_64 (for simulator)

---

### ✅ 7. Testing

#### A. Test in Browser (Desktop)
```bash
# 1. Open browser
https://app.meetlocal.app

# 2. Open DevTools Console
# 3. Check for errors
# 4. Verify WebSocket connection:
#    Network tab → Filter: WS → Should see socket.io connection
```

#### B. Test in iOS Simulator
```bash
# 1. Build and run in Xcode (Simulator)
# 2. Check Xcode Console for:
[ChatConfig] Native Platform Detected. SOCKET_URL: https://app.meetlocal.app
[Socket] Connected! Socket ID: abc123

# 3. Check for errors:
#    - ❌ Connection refused → Server not running
#    - ❌ CORS error → Check nginx Origin header
#    - ❌ SSL error → Check Cloudflare SSL settings
```

#### C. Test on Physical Device
```bash
# 1. Connect iPhone via USB
# 2. Select your device in Xcode
# 3. Build and Run
# 4. Check Xcode Console (same as simulator)
# 5. Test on cellular data (not just WiFi)
```

#### D. Test Presence/Resuscitation
1. Open app on Device A, verify you appear online on Device B
2. Background app on Device A for 30 seconds
3. Foreground app on Device A
4. ✅ Verify you IMMEDIATELY appear online on Device B (< 2 seconds)

#### E. Test Network Interruption
1. Open app on WiFi
2. Turn off WiFi
3. Turn WiFi back on
4. ✅ Verify socket reconnects automatically (< 5 seconds)

---

## 🔥 Critical Issues to Fix Before Production

### 1. Update Nginx Config
**File**: `/etc/nginx/sites-available/app.meetlocal.app`

**Missing**:
- `X-Forwarded-Proto: https` header
- Cloudflare real IP ranges

**Action**: Use config from `docs/CLOUDFLARE_SSL_SETUP.md`

---

### 2. Implement Presence Resuscitation
**Files**:
- `apps/api/src/chat/chat.gateway.ts`
- `apps/web/components/ChatInterface.tsx`

**Action**: Follow implementation guide in `docs/PRESENCE_RESUSCITATION_FIX.md`

**Why Critical**:
- Users will appear "offline" after backgrounding app
- "Ghost" users will accumulate in online list
- Poor user experience

---

### 3. Verify CORS Settings
**File**: `apps/api/src/main.ts`

**Current**:
```typescript
origin: (origin, callback) => {
  const allowed = [
    'capacitor://localhost',  // ✅ iOS/Android
    'http://localhost',
    'http://localhost:3000',
    'https://app.meetlocal.app',  // ✅ Production
  ];
  // ... validation logic
}
```

**Verification**:
```bash
# Check iOS requests in Nginx logs
sudo tail -f /var/log/nginx/access.log | grep "capacitor"

# Should see:
# Origin: capacitor://localhost
```

---

### 4. Verify Socket.IO CORS
**File**: `apps/api/src/chat/chat.gateway.ts`

**Current**:
```typescript
@WebSocketGateway({
    cors: {
        origin: [
            'http://localhost:3000',
            'http://localhost:3001',
            'https://app.meetlocal.app',  // ✅ Good
            'capacitor://localhost',      // ✅ Good
        ],
        credentials: true,
    },
    transports: ['websocket', 'polling'],
})
```

✅ **Already correct!**

---

## 🚀 Deployment Steps (Full Flow)

### 1. Local Development → Production Build
```bash
# On your local machine
cd /path/to/chat

# Ensure .env has production URLs
echo "NEXT_PUBLIC_SERVER_URL=https://app.meetlocal.app" >> .env

# Commit changes
git add .
git commit -m "Production build for iOS"
git push origin main
```

### 2. Deploy to Digital Ocean
```bash
# SSH into server
ssh root@<your-server-ip>

# Pull latest code
cd /path/to/chat
git pull origin main

# Rebuild Docker containers
docker-compose down
docker-compose up -d --build

# Check logs
docker-compose logs -f
```

### 3. Update Nginx
```bash
# On server
sudo nano /etc/nginx/sites-available/app.meetlocal.app
# Paste config from docs/CLOUDFLARE_SSL_SETUP.md

# Test
sudo nginx -t

# Reload
sudo systemctl reload nginx
```

### 4. Build iOS App
```bash
# On local machine
cd apps/web

# Build
npm run build
npm run build:cap
npx cap sync ios
npx cap open ios

# In Xcode:
# - Select "Any iOS Device (arm64)"
# - Product → Archive
# - Distribute App → App Store Connect
```

---

## 🐛 Troubleshooting

### Issue: Socket fails to connect from iOS
**Symptoms**:
```
[Socket] Connection error: Error: xhr poll error
```

**Debug**:
1. Check Cloudflare WebSockets: Network → WebSockets → ON
2. Check nginx logs: `sudo tail -f /var/log/nginx/error.log`
3. Test WebSocket manually:
   ```bash
   curl https://app.meetlocal.app/socket.io/
   # Should return: {"code":0,"message":"Transport unknown"}
   ```

---

### Issue: CORS error from iOS
**Symptoms**:
```
Access to XMLHttpRequest at 'https://app.meetlocal.app/api/...' from origin 'capacitor://localhost' has been blocked by CORS
```

**Fix**:
1. Verify nginx passes `Origin` header:
   ```nginx
   proxy_set_header Origin $http_origin;
   ```
2. Restart nginx: `sudo systemctl restart nginx`
3. Check NestJS CORS config includes `capacitor://localhost`

---

### Issue: Users appear offline after backgrounding
**Symptoms**:
- User backgrounds app
- User appears offline on other devices
- User foregrounds app
- User STILL appears offline (for 30+ seconds)

**Fix**: Implement presence resuscitation (see `docs/PRESENCE_RESUSCITATION_FIX.md`)

---

### Issue: BetterAuth session not persisting
**Symptoms**:
- User logs in
- User closes app
- User reopens app
- User is logged out

**Debug**:
1. Check cookie domain in BetterAuth config
2. Verify `trustedOrigins` includes `capacitor://localhost`
3. Check if cookies are being set:
   ```javascript
   // In iOS Safari Web Inspector
   document.cookie
   // Should see: better-auth.session_token=...
   ```

---

## 📊 Monitoring

### Server Health
```bash
# Check Docker containers
docker-compose ps

# Check logs
docker-compose logs -f web
docker-compose logs -f api

# Check nginx
sudo systemctl status nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Database
```bash
# Connect to PostgreSQL
docker exec -it <db-container-name> psql -U postgres -d chat_db

# Check tables
\dt

# Check active sessions
SELECT * FROM "Session" WHERE "expiresAt" > NOW();

# Check online users (from Socket.IO perspective)
# NOTE: onlineUsers is in-memory, check NestJS logs
```

### WebSocket Connections
```bash
# Check Socket.IO connections in NestJS logs
docker-compose logs api | grep "Connected!"
docker-compose logs api | grep "handleJoin"

# Count active connections
docker-compose logs api | grep "Socket ID" | wc -l
```

---

## 🎉 Success Criteria

### ✅ Before submitting to App Store:
- [ ] App connects to `https://app.meetlocal.app` from iOS device
- [ ] WebSocket connects successfully
- [ ] Messages send and receive in real-time
- [ ] Presence updates within 2 seconds
- [ ] Users "resuscitate" after backgrounding (< 5 seconds)
- [ ] Network interruptions recover automatically
- [ ] No CORS errors in console
- [ ] No SSL errors
- [ ] BetterAuth sessions persist across app restarts
- [ ] Google/Apple OAuth works (if enabled)
- [ ] Image uploads work
- [ ] Private messages work
- [ ] Room messages work
- [ ] Tested on both WiFi and cellular data

---

## 📚 Reference Documents

1. **Cloudflare SSL Setup**: `docs/CLOUDFLARE_SSL_SETUP.md`
2. **Presence Resuscitation**: `docs/PRESENCE_RESUSCITATION_FIX.md`
3. **Nginx Production Setup** (with Let's Encrypt): `docs/PRODUCTION_NGINX_SETUP.md`

---

## 🔐 Security Recommendations

### Upgrade to Full SSL (Cloudflare)
**Current**: Flexible SSL (Cloudflare → Server is HTTP)
**Recommended**: Full SSL or Full SSL (Strict)

**Why**: Traffic between Cloudflare and your server is unencrypted with Flexible SSL.

**How**:
1. Install Let's Encrypt certificate on your server
2. Update nginx to listen on port 443
3. Change Cloudflare SSL/TLS to "Full (Strict)"

See `docs/PRODUCTION_NGINX_SETUP.md` for detailed steps.

---

### Use Strong Secrets
```bash
# Generate strong secret
openssl rand -base64 32
# Use this for BETTER_AUTH_SECRET
```

---

### Enable Rate Limiting (Optional)
```nginx
# In nginx config
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;

location /api/ {
    limit_req zone=api_limit burst=20 nodelay;
    # ... rest of config
}
```

---

## 🆘 Support

If you encounter issues:
1. Check Xcode Console for errors
2. Check server logs: `docker-compose logs -f`
3. Check nginx logs: `sudo tail -f /var/log/nginx/error.log`
4. Test API manually: `curl -v https://app.meetlocal.app/api/tenants`
5. Test WebSocket: Use browser DevTools Network tab

---

**Last Updated**: 2026-02-12
**Tested On**: iOS 15.0+, Android 11+
**Production URL**: https://app.meetlocal.app
