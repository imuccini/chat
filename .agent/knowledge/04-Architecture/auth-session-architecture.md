# Authentication, Session & WebSocket Architecture

> **Last updated**: 2026-02-10
> **Scope**: Full analysis of auth flows, session management, WebSocket connection, CORS, ports, environment configuration, and mobile/web platform considerations.

---

## CRITICAL RULES FOR AI AGENTS

> **READ THIS SECTION BEFORE MAKING ANY CHANGES TO AUTH, SESSION, WEBSOCKET, OR NETWORKING CODE**

### Rule 1: Never Hardcode URLs, IPs, or Ports

**FORBIDDEN:**
```typescript
// NEVER DO THIS
const apiUrl = 'http://localhost:3001';
const serverUrl = 'http://192.168.1.110:3000';
fetch('http://localhost:3001/api/messages');
io('http://localhost:3001');
```

**CORRECT:**
```typescript
// ALWAYS use environment variables or config.ts exports
import { API_BASE_URL, SOCKET_URL, SERVER_URL } from '@/config';
const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL?.replace(':3000', ':3001') || 'http://localhost:3001';
```

### Rule 2: Understand the Two-Server Architecture

| Server | Port | Purpose | Protocol |
|--------|------|---------|----------|
| **Next.js** | 3000 | Frontend + BetterAuth + API Proxies | HTTP |
| **NestJS** | 3001 | Backend API + WebSocket Gateway | HTTP + WS |

- Next.js handles authentication (BetterAuth cookies are on port 3000)
- NestJS handles chat/tenant API and Socket.IO connections
- API proxies in Next.js (`/apps/web/app/api/*`) forward to NestJS when needed

### Rule 3: Know the URL Configuration Pattern

**File: `apps/web/config.ts`**

```typescript
// Native (Capacitor): Uses NEXT_PUBLIC_SERVER_URL from env (absolute URL)
// Web: Uses window.location (dynamic, adapts to current host)

export const SERVER_URL = isNative
    ? (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000')
    : '';

export const API_BASE_URL = isNative
    ? (process.env.NEXT_PUBLIC_SERVER_URL?.replace(':3000', ':3001') || 'http://localhost:3001')
    : (typeof window !== 'undefined'
        ? `${window.location.protocol}//${window.location.hostname}:3001`
        : ...);

export const SOCKET_URL = // Same pattern as API_BASE_URL
```

### Rule 4: Session Token vs Session ID

The `Session` table has TWO identifiers:
- `id` (UUID primary key)
- `token` (unique string stored in cookie)

**CURRENT INCONSISTENCY (DO NOT CHANGE WITHOUT FIXING ALL):**
| Consumer | Looks up by | Column |
|----------|-------------|--------|
| ChatGateway (Socket.IO) | `session.id` | Primary key |
| TenantController (NestJS REST) | `session.token` | Token column |
| resolveSession (Next.js) | `session.token` | Token column |

**When modifying session code, verify which field you're using!**

### Rule 5: CORS Must Be Configured in THREE Places

1. **NestJS HTTP CORS** (`apps/api/src/main.ts`)
2. **NestJS WebSocket CORS** (`apps/api/src/chat/chat.gateway.ts`)
3. **Next.js API Routes** (`apps/web/lib/cors.ts`)

**If you change CORS in one place, consider if it needs changing in others.**

### Rule 6: Environment Changes Require Rebuild for Mobile

Mobile apps (Capacitor) bake `NEXT_PUBLIC_SERVER_URL` at build time. Changing the server IP requires:
1. Update `.env` with new IP
2. Run `npm run build:cap`
3. Re-sync and rebuild native apps (`npx cap sync`)

**Web apps auto-detect hostname from `window.location` - no rebuild needed.**

### Rule 7: BetterAuth vs OTP Sessions

| Login Method | Session Created By | Cookie? | authClient.getSession() Works? |
|--------------|-------------------|---------|-------------------------------|
| Email/Password | BetterAuth | Yes | Yes |
| Passkey | BetterAuth | Yes | Yes |
| Anonymous | BetterAuth | Sometimes* | Yes (if cookie set) |
| OTP Phone | Manual Prisma insert | Yes (manual) | **NO** |

*Anonymous sessions sometimes fail to set cookies due to BetterAuth quirks.

**For OTP sessions:** Use `resolveSession()` fallback or read cookie manually.

### Rule 8: When Debugging Connection Issues

Check these in order:
1. **Is the server IP correct in `.env`?** → `NEXT_PUBLIC_SERVER_URL`
2. **Is the API port correct?** → Default 3001, check `API_PORT`
3. **Is CORS allowing the origin?** → Check all three CORS configs
4. **Is the session token being sent?** → Check `socket.handshake.auth.token`
5. **Is the session expired?** → Check `expiresAt` in database
6. **Is the database URL correct?** → `DATABASE_URL`

### Rule 9: Never Modify These Files Without Full Understanding

| File | Risk | Reason |
|------|------|--------|
| `apps/web/lib/auth.ts` | HIGH | Dynamic origin handling for passkeys |
| `apps/api/src/chat/chat.gateway.ts` | HIGH | WebSocket auth + session validation |
| `apps/web/config.ts` | HIGH | All URL configuration |
| `apps/api/src/main.ts` | HIGH | CORS + server bootstrap |
| `apps/web/lib/session.ts` | MEDIUM | Multi-source session resolution |
| `.env` | CRITICAL | All environment configuration |

### Rule 10: Test After Environment Changes

When IP or port changes, test these flows:
1. [ ] Web anonymous login
2. [ ] Web OTP login
3. [ ] Mobile (Capacitor) login
4. [ ] WebSocket connection (send/receive messages)
5. [ ] API proxy routes (`/api/tenants/*`)
6. [ ] Biometric authentication (mobile)

---

## Table of Contents

1. [Environment Configuration](#1-environment-configuration)
2. [Authentication Overview](#2-authentication-overview)
3. [BetterAuth Configuration](#3-betterauth-configuration)
4. [Session Management](#4-session-management)
5. [WebSocket Configuration](#5-websocket-configuration)
6. [CORS Configuration](#6-cors-configuration)
7. [API Proxying Pattern](#7-api-proxying-pattern)
8. [Mobile (Capacitor) Configuration](#8-mobile-capacitor-configuration)
9. [Hardcoded Values Registry](#9-hardcoded-values-registry)
10. [Troubleshooting Guide](#10-troubleshooting-guide)
11. [Security Considerations](#11-security-considerations)
12. [Key Files Reference](#12-key-files-reference)

---

## 1. Environment Configuration

### Required Environment Variables

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/chat_db?schema=public"

# Authentication
BETTER_AUTH_SECRET="<random-32-char-secret>"  # MUST be secure in production
BETTER_AUTH_URL="http://192.168.1.110:3000"   # Server URL for auth

# Public URLs (exposed to frontend)
NEXT_PUBLIC_SERVER_URL="http://192.168.1.110:3000"  # Base URL for the app

# API Configuration
API_PORT=3001  # NestJS port (optional, defaults to 3001)

# Optional
REDIS_URL="redis://localhost:6379"  # For distributed Socket.IO
GOOGLE_CLIENT_ID="..."              # Google OAuth (optional)
GOOGLE_CLIENT_SECRET="..."
APPLE_CLIENT_ID="..."               # Apple OAuth (optional)
APPLE_CLIENT_SECRET="..."
```

### Environment File Locations

| File | Purpose | Git tracked? |
|------|---------|--------------|
| `.env` | All environments | Should be `.env.example` |
| `.env.local` | Local overrides | No (gitignored) |
| `.env.production` | Production values | No (gitignored) |

### Critical: IP Address Configuration

When changing development machines:

1. Find your machine's local IP: `ifconfig | grep "inet " | grep -v 127.0.0.1`
2. Update `.env`:
   ```bash
   BETTER_AUTH_URL="http://YOUR_IP:3000"
   NEXT_PUBLIC_SERVER_URL="http://YOUR_IP:3000"
   ```
3. Rebuild mobile app if needed: `npm run build:cap && npx cap sync`

### Port Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Browser / Capacitor App                  │
└─────────────────────┬───────────────────┬───────────────────┘
                      │                   │
                      ▼                   ▼
┌─────────────────────────────┐   ┌─────────────────────────────┐
│     Next.js (Port 3000)     │   │     NestJS (Port 3001)      │
│                             │   │                             │
│  • BetterAuth endpoints     │   │  • REST API (/api/*)        │
│  • API proxy routes         │   │  • Socket.IO WebSocket      │
│  • Static frontend          │   │  • Redis adapter (optional) │
│  • Session cookies          │   │                             │
└─────────────────────────────┘   └─────────────────────────────┘
                      │                   │
                      └─────────┬─────────┘
                                ▼
                    ┌─────────────────────┐
                    │    PostgreSQL DB    │
                    │                     │
                    │  • Sessions         │
                    │  • Users            │
                    │  • Messages         │
                    │  • Tenants          │
                    └─────────────────────┘
```

---

## 2. Authentication Overview

### Supported Authentication Methods

| Method | Cookie Set? | Session Type | Socket Auth | Mobile Support |
|--------|-------------|--------------|-------------|----------------|
| Email/Password | Yes (BetterAuth) | BetterAuth-managed | token via getSession() | Yes |
| Passkey/WebAuthn | Yes (BetterAuth) | BetterAuth-managed | token via getSession() | Yes (with rpID) |
| Anonymous | Sometimes* | BetterAuth-managed | Fallback to query params | Yes |
| OTP Phone | Yes (manual) | Raw token in DB | Manual cookie read | Yes |
| Biometric | JSON response | Session via API | Token in response | Native only |

*Anonymous sessions have a known issue where cookies sometimes fail to set.

### Authentication Flow Summary

```
User Action
    │
    ├─> Email/Password ──> BetterAuth ──> Cookie set ──> Session in DB
    │
    ├─> Passkey ──> WebAuthn ──> BetterAuth ──> Cookie set ──> Session in DB
    │
    ├─> Anonymous ──> BetterAuth plugin ──> Cookie (sometimes) ──> Session in DB
    │                                           │
    │                                           └─> Fallback: userId in socket query
    │
    ├─> OTP Phone ──> Manual verify ──> Manual session insert ──> Manual cookie
    │                                                               │
    │                                                               └─> authClient can't read it!
    │
    └─> Biometric (mobile) ──> Token from Keychain ──> API creates session ──> JSON response
```

---

## 3. BetterAuth Configuration

### Server Configuration

**File:** `apps/web/lib/auth.ts`

```typescript
export function getAuth(origin: string) {
    // Dynamic auth instance based on request origin
    // Critical for passkey RP ID validation

    const baseURL = (isCapacitor || isAndroidLocal)
        ? (process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000")
        : origin;

    return betterAuth({
        database: prismaAdapter(prisma, { provider: "postgresql" }),
        secret: process.env.BETTER_AUTH_SECRET,
        baseURL: baseURL,
        session: {
            expiresIn: 60 * 60 * 24 * 30,      // 30 days
            updateAge: 60 * 60 * 24,           // Refresh daily
            cookieCache: { maxAge: 5 * 60 },   // 5 min client cache
        },
        plugins: [
            passkey({
                rpID: new URL(baseURL).hostname,  // Dynamic for multi-env
                rpName: "Local",
                origin: origin,  // Original origin for WebAuthn
            }),
            anonymous(),
        ],
        trustedOrigins: [
            "capacitor://localhost",
            "http://localhost",
            origin,
            baseURL,
            // ... env URLs
        ],
    });
}
```

### Client Configuration

**File:** `apps/web/lib/auth-client.ts`

```typescript
const isNative = Capacitor.isNativePlatform();
const envUrl = process.env.NEXT_PUBLIC_SERVER_URL;

// Native: Always use absolute URL
// Web localhost: Use relative paths (for cookie proxying)
// Web IP: Use absolute URL
const baseURL = (isNative || (isProductionOrIP && !isLocalhost)) ? envUrl : undefined;

export const authClient = createAuthClient({
    baseURL,
    plugins: [passkeyClient(), anonymousClient()],
});
```

### Passkey RP ID Handling

For passkeys to work across environments, the RP ID must match the origin:

| Environment | Origin | RP ID |
|------------|--------|-------|
| Web localhost | http://localhost:3000 | localhost |
| Web LAN IP | http://192.168.1.110:3000 | 192.168.1.110 |
| Capacitor iOS | capacitor://localhost | localhost |
| Capacitor Android | http://localhost | localhost |
| Production | https://chat.example.com | chat.example.com |

---

## 4. Session Management

### Session Resolution (Multi-Source)

**File:** `apps/web/lib/session.ts`

```
resolveSession(headers)
    │
    ├─[1]─> BetterAuth: auth.api.getSession({ headers })
    │       Works for: Email, Password, Passkey, Anonymous (if cookie set)
    │
    ├─[2]─> Authorization Header: Bearer <token>
    │       Works for: Native apps, explicit token passing
    │
    ├─[3]─> Cookie Fallback: Parse better-auth.session_token
    │       Works for: OTP sessions (created outside BetterAuth)
    │
    └─[4]─> DB Lookup: prisma.session.findFirst({ where: { token } })
            Validates: Token exists + not expired

    Returns: { session, user } or null
```

### Session Storage

```sql
-- Prisma Schema: Session table
model Session {
  id        String   @id @default(uuid())
  userId    String
  token     String   @unique          -- The session token in cookie
  expiresAt DateTime
  ipAddress String?
  userAgent String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  user      User     @relation(...)
}
```

### Cookie Configuration

```typescript
// Cookie name: better-auth.session_token
// Properties:
{
    httpOnly: true,                    // Prevents XSS token theft
    secure: NODE_ENV === 'production', // HTTPS only in prod
    sameSite: 'lax',                   // CSRF protection
    maxAge: 30 * 24 * 60 * 60,         // 30 days (BetterAuth)
           // OR 365 days (OTP manual)
    path: '/',
}
```

### OTP Session Creation (Manual)

**File:** `apps/web/app/api/auth/otp/verify/route.ts`

```typescript
// OTP creates sessions OUTSIDE BetterAuth
const rawToken = crypto.randomBytes(32).toString('base64');
await prisma.session.create({
    data: {
        userId: user.id,
        token: rawToken,           // Stored raw (not hashed)
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    }
});
// Cookie set manually with raw token

// CONSEQUENCE: authClient.getSession() CANNOT find OTP sessions
// Must use resolveSession() fallback path
```

---

## 5. WebSocket Configuration

### Server Setup (NestJS)

**File:** `apps/api/src/chat/chat.gateway.ts`

```typescript
@WebSocketGateway({
    cors: {
        origin: '*',        // WARNING: Too permissive! Should match HTTP CORS
        credentials: true,
    },
    transports: ['websocket', 'polling'],
})
export class ChatGateway {
    async handleConnection(socket: CustomSocket) {
        const token = socket.handshake.auth?.token || socket.handshake.query?.token;
        const { tenantSlug, userId, userAlias } = socket.handshake.query;

        if (token) {
            // AUTHENTICATED PATH
            const session = await this.prisma.session.findFirst({
                where: { token: token as string },  // Uses token column!
                include: { user: true },
            });
            if (!session || new Date(session.expiresAt) < new Date()) {
                socket.disconnect();
                return;
            }
            socket.data.user = session.user;
        } else {
            // ANONYMOUS PATH
            // Creates or finds user by userId from query params
        }
    }
}
```

### Client Connection

**File:** `apps/web/components/ChatInterface.tsx`

```typescript
// Get session token (with OTP fallback)
const sessionData = await authClient.getSession();
let token = sessionData?.data?.session?.token;

// OTP fallback: read cookie directly
if (!token && typeof document !== 'undefined') {
    const match = document.cookie.match(/better-auth\.session_token=([^;]+)/);
    if (match) token = decodeURIComponent(match[1]);
}

// Connect to Socket.IO
const newSocket = io(SOCKET_URL, {
    auth: { token },             // Session token for auth
    query: {
        tenantSlug: tenant.slug,
        userId: currentUser.id,   // Fallback for anonymous
        userAlias: currentUser.alias
    },
    transports: ['websocket', 'polling'],
    reconnectionAttempts: 10,
    reconnectionDelay: 1000
});
```

### Socket Events

```typescript
// Client → Server
interface ClientToServerEvents {
    join: (data: { user: User; tenantSlug: string }) => void;
    sendMessage: (msg: Message) => void;
    deleteMessage: (data: { messageId: string; roomId?: string; tenantSlug: string }) => void;
}

// Server → Client
interface ServerToClientEvents {
    newMessage: (msg: Message) => void;
    presenceUpdate: (data: { users: User[]; onlineIds: string[]; roomCounts: Record<string, number> }) => void;
    messageDeleted: (data: { messageId: string; roomId?: string }) => void;
    privateMessage: (msg: Message) => void;
    rateLimited: (data: { retryAfter: number }) => void;
    error: (data: { message: string }) => void;
    userCreated: (userData: { id: string; alias: string; tenantId: string | null }) => void;
    userConfirmed: (userData: { id: string; alias: string; tenantId: string | null }) => void;
}
```

### Rate Limiting

- **Messages:** 500ms minimum between sends per socket
- **Connection:** No explicit rate limit (consider adding)

---

## 6. CORS Configuration

### Three Configuration Points

#### 1. NestJS HTTP CORS

**File:** `apps/api/src/main.ts`

```typescript
app.enableCors({
    origin: (origin, callback) => {
        const allowed = [
            'capacitor://localhost',
            'http://localhost',
            'http://localhost:3000',
        ];
        const isAllowed = !origin ||
            allowed.includes(origin) ||
            origin?.startsWith('http://192.168.') ||
            origin?.startsWith('http://10.') ||
            origin?.startsWith('http://172.');
        callback(null, isAllowed);
    },
    credentials: true,
});
```

#### 2. NestJS WebSocket CORS

**File:** `apps/api/src/chat/chat.gateway.ts`

```typescript
@WebSocketGateway({
    cors: {
        origin: '*',        // BUG: Should match HTTP CORS!
        credentials: true,
    },
})
```

**WARNING:** WebSocket CORS is `'*'` which allows any origin. This is a security issue.

#### 3. Next.js API Routes CORS

**File:** `apps/web/lib/cors.ts`

```typescript
const allowedOrigins = [
    'capacitor://localhost',
    'http://localhost',
    'http://localhost:3000',
    'http://localhost:3001',
    // Dynamic from NEXT_PUBLIC_SERVER_URL
];
```

### CORS Mismatch Issues

| Aspect | NestJS HTTP | NestJS WebSocket | Next.js |
|--------|-------------|------------------|---------|
| Private IPs | 192.168.*, 10.*, 172.* | `'*'` (all) | Only configured |
| Capacitor | Yes | Yes | Yes |
| localhost | Yes | Yes | Yes |
| Credentials | Yes | Yes | Yes |

**Recommendation:** Unify CORS configuration across all three.

---

## 7. API Proxying Pattern

### Why Proxy?

- BetterAuth cookies are set on port 3000 (Next.js)
- Direct requests from browser to port 3001 (NestJS) may not include cookies
- Proxy routes on port 3000 can read cookies and forward auth to NestJS

### Current Proxy Routes

| Route | Method | Auth | Target |
|-------|--------|------|--------|
| `/api/validate-nas` | POST/GET | None | NestJS `/api/tenants/validate-nas` |
| `/api/tenants/[slug]` | GET | None | NestJS `/api/tenants/:slug` |
| `/api/tenants/[slug]` | POST | Session | Direct Prisma (bypass NestJS) |
| `/api/tenants/[slug]/feedback` | POST/GET | Session + userId fallback | Direct Prisma |
| `/api/messages` | GET | Authorization header | NestJS `/api/messages` |
| `/api/auth/*` | * | BetterAuth | BetterAuth handlers |

### KNOWN BUG: Hardcoded URLs in Proxies

**Files with hardcoded `http://localhost:3001`:**
- `apps/web/app/api/tenants/[slug]/route.ts` (line 16)
- `apps/web/app/api/messages/route.ts` (line 14)

**These break in production!** Should use:
```typescript
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
const apiUrl = serverUrl.replace(':3000', ':3001');
```

---

## 8. Mobile (Capacitor) Configuration

### Capacitor Config

**File:** `apps/web/capacitor.config.ts`

```typescript
const config: CapacitorConfig = {
    appId: 'io.trenochat.app',
    appName: 'TrenoChat',
    webDir: 'out',              // Static export directory
    server: {
        androidScheme: 'http',  // Allow HTTP (not just HTTPS)
        cleartext: true         // Allow cleartext traffic on Android
    },
};
```

### Mobile URL Resolution

```typescript
// In config.ts:
const isNative = Capacitor.isNativePlatform();

// Native apps use NEXT_PUBLIC_SERVER_URL (absolute, from env at build time)
// Web uses window.location (dynamic)

export const API_BASE_URL = isNative
    ? (process.env.NEXT_PUBLIC_SERVER_URL?.replace(':3000', ':3001') || 'http://localhost:3001')
    : `${window.location.protocol}//${window.location.hostname}:3001`;
```

### Mobile Build Process

```bash
# 1. Build static export
npm run build:cap   # Runs build_cap.sh (hides dynamic routes, builds, restores)

# 2. Sync with native projects
npx cap sync

# 3. Open in IDE
npx cap open ios    # Opens Xcode
npx cap open android # Opens Android Studio
```

### What Breaks on IP Change (Mobile)

| Component | Behavior | Fix |
|-----------|----------|-----|
| Auth API calls | Uses hardcoded IP from build | Rebuild app |
| WebSocket | Uses hardcoded IP from build | Rebuild app |
| Biometric tokens | Still work (stored locally) | N/A |
| SQLite cache | Still works | N/A |

### Biometric Authentication

**File:** `apps/web/lib/biometrics.ts`

```typescript
// Store credentials in device secure storage
await NativeBiometric.setCredentials({
    username: phoneNumber,
    password: token,
    server: 'com.antigravity.chat',  // App identifier for Keychain/Keystore
});

// Login flow:
// 1. User triggers biometric
// 2. Retrieve credentials from secure storage
// 3. POST to /api/auth/biometric/login with token + phone
// 4. Server validates, creates session
// 5. Return session in JSON (not cookie for native)
```

---

## 9. Hardcoded Values Registry

### CRITICAL (Break Production)

| File | Line | Value | Should Be |
|------|------|-------|-----------|
| `apps/web/app/api/tenants/[slug]/route.ts` | 16 | `'http://localhost:3001'` | `process.env...` |
| `apps/web/app/api/messages/route.ts` | 14 | `'http://localhost:3001'` | `process.env...` |

### MEDIUM (Break Non-Standard Setups)

| File | Line | Value | Issue |
|------|------|-------|-------|
| `apps/web/config.ts` | 16, 25 | `:3001` port | Hardcoded API port |
| `apps/api/src/main.ts` | 23-26 | CORS allowlist | Not configurable |
| `.env` | 8, 13 | `192.168.1.110` | Developer's IP |

### LOW (Development Defaults)

| File | Line | Value | Purpose |
|------|------|-------|---------|
| `apps/web/lib/auth.ts` | 26, 34, 109 | `localhost:3000` | Fallback defaults |
| `apps/api/src/main.ts` | 59 | `3001` | Default API port |

### Port Replacement Pattern (Fragile)

Used in multiple files:
```typescript
serverUrl.replace(':3000', ':3001')
```

**Issues:**
- Fails if URL has no port
- Fails if using non-standard ports
- Duplicated in multiple places

**Better approach:** Use separate `NEXT_PUBLIC_API_URL` env var.

---

## 10. Troubleshooting Guide

### Problem: Mobile App Can't Connect

1. **Check `.env`:**
   ```bash
   grep NEXT_PUBLIC_SERVER_URL .env
   # Should show your current machine's IP, not localhost
   ```

2. **Verify IP is reachable from device:**
   ```bash
   # On mobile device or simulator, try:
   curl http://YOUR_IP:3000/api/health
   curl http://YOUR_IP:3001/api/health
   ```

3. **Rebuild if IP changed:**
   ```bash
   npm run build:cap && npx cap sync
   ```

### Problem: WebSocket Not Connecting

1. **Check CORS:**
   - Browser console shows CORS error?
   - Add origin to all three CORS configs

2. **Check token:**
   ```javascript
   // In browser console:
   document.cookie  // Should show better-auth.session_token
   ```

3. **Check server logs:**
   ```bash
   # In API terminal, look for:
   # "Connection rejected: Invalid or expired session"
   ```

### Problem: Messages Not Sending/Receiving

1. **Check socket connection:**
   ```javascript
   // In browser console:
   socket.connected  // Should be true
   ```

2. **Check room joined:**
   - Look for `join` event in server logs
   - Verify `tenantSlug` is correct

3. **Check rate limiting:**
   - Server logs show `rateLimited` event?
   - Wait 500ms between messages

### Problem: OTP Login Works But Session Lost

**Known issue:** OTP sessions are not recognized by `authClient.getSession()`.

**Workaround:** The ChatInterface already has fallback code:
```typescript
// Read cookie manually for OTP sessions
if (!token && typeof document !== 'undefined') {
    const match = document.cookie.match(/better-auth\.session_token=([^;]+)/);
    if (match) token = decodeURIComponent(match[1]);
}
```

### Problem: Anonymous User Has No Session

**Known issue:** Anonymous sessions sometimes fail to set cookies.

**Current behavior:** System falls back to userId in socket query params.

**Impact:** HTTP endpoints need userId fallback (implemented in feedback route).

### Problem: Passkeys Don't Work

1. **Check RP ID matches origin:**
   ```javascript
   // RP ID should be hostname only (no port)
   // Origin: http://192.168.1.110:3000 → RP ID: 192.168.1.110
   ```

2. **Check trusted origins in auth.ts**

3. **On mobile:**
   - iOS: Needs Associated Domains entitlement for production
   - Development: capacitor://localhost works

---

## 11. Security Considerations

### Current Security Issues

| Issue | Severity | Location | Impact |
|-------|----------|----------|--------|
| WebSocket CORS `'*'` | HIGH | chat.gateway.ts | Any site can connect |
| OTP tokens stored raw | MEDIUM | otp/verify/route.ts | DB breach exposes tokens |
| Private IP wildcards | MEDIUM | main.ts | LAN devices can access |
| No alias validation | LOW | chat.gateway.ts | Malicious alias injection |
| Debug endpoint exposed | LOW | ChatInterface.tsx | Info disclosure |

### Recommendations

1. **Fix WebSocket CORS:** Match HTTP CORS configuration
2. **Hash OTP tokens:** Use bcrypt before storing
3. **Restrict private IPs:** Whitelist specific IPs or use VPN
4. **Validate aliases:** Max length, allowed characters
5. **Remove debug endpoint:** Or restrict to development

### Cookie Security

| Setting | Value | Purpose |
|---------|-------|---------|
| httpOnly | true | Prevents XSS token theft |
| secure | NODE_ENV === 'production' | HTTPS only in prod |
| sameSite | 'lax' | CSRF protection |

---

## 12. Key Files Reference

### Authentication

| File | Purpose |
|------|---------|
| `apps/web/lib/auth.ts` | BetterAuth server config (dynamic origin, passkey, anonymous) |
| `apps/web/lib/auth-client.ts` | BetterAuth client (plugins, baseURL logic) |
| `apps/web/lib/session.ts` | Multi-source session resolution |
| `apps/web/app/api/auth/[...all]/route.ts` | BetterAuth API handler |
| `apps/web/app/api/auth/otp/send/route.ts` | OTP send (BulkGate SMS) |
| `apps/web/app/api/auth/otp/verify/route.ts` | OTP verify (manual session) |
| `apps/web/app/api/auth/biometric/*` | Biometric setup/login |

### WebSocket

| File | Purpose |
|------|---------|
| `apps/api/src/chat/chat.gateway.ts` | Socket.IO gateway (auth, rooms, messages) |
| `apps/api/src/chat/chat.service.ts` | Message persistence |
| `apps/api/src/chat/chat.module.ts` | Chat module DI |
| `apps/web/components/ChatInterface.tsx` | Socket client connection |

### Configuration

| File | Purpose |
|------|---------|
| `.env` | Environment variables |
| `apps/web/config.ts` | URL configuration (SERVER_URL, API_BASE_URL, SOCKET_URL) |
| `apps/web/next.config.mjs` | Next.js config + rewrites |
| `apps/web/capacitor.config.ts` | Capacitor mobile config |
| `apps/api/src/main.ts` | NestJS bootstrap + CORS |

### CORS

| File | Purpose |
|------|---------|
| `apps/api/src/main.ts` | NestJS HTTP CORS |
| `apps/api/src/chat/chat.gateway.ts` | WebSocket CORS (line ~20) |
| `apps/web/lib/cors.ts` | Next.js API routes CORS |

### API Proxies

| File | Purpose |
|------|---------|
| `apps/web/app/api/validate-nas/route.ts` | NAS validation proxy |
| `apps/web/app/api/tenants/[slug]/route.ts` | Tenant proxy (GET/POST) |
| `apps/web/app/api/tenants/[slug]/feedback/route.ts` | Feedback proxy |
| `apps/web/app/api/messages/route.ts` | Messages proxy |

### Database

| File | Purpose |
|------|---------|
| `packages/database/prisma/schema.prisma` | Database schema |
| `packages/database/src/db.ts` | Prisma client |

---

## Appendix: Environment Change Checklist

When moving to a new development machine:

- [ ] Get new machine's local IP
- [ ] Update `.env`:
  - [ ] `BETTER_AUTH_URL`
  - [ ] `NEXT_PUBLIC_SERVER_URL`
  - [ ] `DATABASE_URL` (if DB on different host)
- [ ] Verify PostgreSQL is running and accessible
- [ ] Start servers: `npm run dev`
- [ ] Test web login at `http://NEW_IP:3000`
- [ ] Test WebSocket (send a message)
- [ ] For mobile testing:
  - [ ] `npm run build:cap`
  - [ ] `npx cap sync`
  - [ ] Rebuild native app
  - [ ] Test on device/simulator
