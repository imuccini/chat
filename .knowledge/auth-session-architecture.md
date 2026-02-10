# Authentication, Session & WebSocket Architecture

> **Last updated**: 2026-02-10
> **Scope**: Full analysis of auth flows, session management, WebSocket connection, state sync, and security posture.

---

## Table of Contents

1. [Authentication Overview](#1-authentication-overview)
2. [Anonymous Login Flow](#2-anonymous-login-flow)
3. [OTP Phone Login Flow](#3-otp-phone-login-flow)
4. [Session Resolution](#4-session-resolution)
5. [WebSocket Authentication](#5-websocket-authentication)
6. [Backend Auth (NestJS)](#6-backend-auth-nestjs)
7. [Frontend State Management](#7-frontend-state-management)
8. [API Proxy Pattern](#8-api-proxy-pattern)
9. [Data Flow Diagrams](#9-data-flow-diagrams)
10. [Security Analysis](#10-security-analysis)
11. [Known Issues & Bugs](#11-known-issues--bugs)
12. [Recommendations](#12-recommendations)
13. [Key Files Reference](#13-key-files-reference)

---

## 1. Authentication Overview

The app uses **BetterAuth** for authentication with multiple strategies:

| Strategy | Cookie Set? | Session Type | Socket Auth |
|----------|-------------|--------------|-------------|
| Anonymous (BetterAuth plugin) | Should be, but often missing | BetterAuth-managed | Falls back to anonymous socket path |
| OTP Phone Login | Yes (manually set) | Raw token in DB | BetterAuth client can't read it (bug) |
| Email/Password | Yes (BetterAuth) | BetterAuth-managed | Session ID via `authClient.getSession()` |
| Passkey/WebAuthn | Yes (BetterAuth) | BetterAuth-managed | Session ID via `authClient.getSession()` |

### Key Config Files

- **BetterAuth Server**: `apps/web/lib/auth.ts` - Dynamic origin-based config (handles Capacitor, localhost, production)
- **BetterAuth Client**: `apps/web/lib/auth-client.ts` - Creates `authClient` with passkey + anonymous plugins
- **Session Resolver**: `apps/web/lib/session.ts` - Multi-source session resolution (BetterAuth -> cookie -> DB)

### Cookie Name

BetterAuth stores the session token in: `better-auth.session_token` (HTTP-only cookie).

---

## 2. Anonymous Login Flow

**Entry point**: `apps/web/components/Login.tsx` (handleAnonymousSubmit)

### Steps

1. **Check existing session** (useEffect on mount):
   - Calls `authClient.getSession()`
   - If a session exists with `isAnonymous: true`, shows "continue" view

2. **Sign in** (3 fallback layers):

   ```
   [Attempt 1] authClient.signIn.anonymous()
       |-- BetterAuth creates session + sets cookie
       |-- Returns { data: { user, session } }

   [Attempt 2] Manual fetch to /api/auth/sign-in/anonymous
       |-- Uses credentials: 'include' to set cookie
       |-- Returns JSON user data

   [Attempt 3] authClient.getSession()
       |-- Retrieves session that may have been set by Attempt 2
   ```

3. **Profile update**: `authClient.updateUser({ name: alias, gender })`

4. **Login callback**: Constructs User object, calls `onLogin(user)`

### Current Issue

Anonymous users frequently end up **without a BetterAuth session cookie**. This was confirmed by debugging: the cookie header shows only `admin_session=true; __next_hmr_refresh_hash__=...` with no `better-auth.session_token`. The root cause is likely that `authClient.signIn.anonymous()` fails silently or the fallback path doesn't properly set the cookie.

**Impact**: Anonymous users connect to the socket via the anonymous fallback path (userId in query params) rather than with a session token. HTTP endpoints that require auth (like feedback) need a userId-based fallback.

---

## 3. OTP Phone Login Flow

**Entry point**: `apps/web/components/Login.tsx` (handleOtpSubmit)

### Send OTP
- **Route**: `apps/web/app/api/auth/otp/send/route.ts`
- Generates 6-digit OTP, stores in Prisma `Verification` table (5-min expiry)
- Sends SMS via BulkGate API

### Verify OTP
- **Route**: `apps/web/app/api/auth/otp/verify/route.ts`
- Two-phase verification:
  - **Probe phase**: If new user + no alias -> return `{ isNewUser: true }` (don't consume OTP)
  - **Creation phase**: When alias provided -> create user, create session, delete OTP

### Session Creation (OTP-specific)
```typescript
// verify route, lines ~78-94
const rawToken = crypto.randomBytes(32).toString('base64');
await prisma.session.create({
    data: {
        userId: user.id,
        token: rawToken,
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
    }
});
// Sets HTTP-only cookie: better-auth.session_token = rawToken
```

### Known Bug

OTP sessions are created **outside BetterAuth** (manual Prisma insert + manual cookie). This means:
- `authClient.getSession()` does NOT recognize OTP sessions
- Socket connection for OTP users sends `token = undefined` -> treated as anonymous
- `resolveSession()` in Next.js API routes CAN find them (via the cookie fallback path)

---

## 4. Session Resolution

**File**: `apps/web/lib/session.ts`

This function handles multi-source session resolution:

```
resolveSession(headers)
    |
    |-- [1] BetterAuth: auth.api.getSession({ headers })
    |       Uses the better-auth.session_token cookie
    |       Works for: BetterAuth-managed sessions (email, passkey, anonymous if cookie set)
    |
    |-- [2] Authorization Header: headers.get('authorization')
    |       Extracts Bearer token
    |       Works for: Native apps sending token in header
    |
    |-- [3] Cookie Fallback: Parse better-auth.session_token from cookie header
    |       Manual regex extraction
    |       Works for: OTP sessions (created outside BetterAuth)
    |
    |-- [4] DB Lookup: prisma.session.findFirst({ where: { token } })
    |       Validates token + expiry
    |       Works for: Any session type stored in DB
    |
    |-- Returns: { session, user } or null
```

### When It Works

| Login Method | BetterAuth Step | Cookie Fallback | Result |
|-------------|-----------------|-----------------|--------|
| Email/Password | Session found | N/A | User resolved |
| Anonymous (cookie set) | Session found | N/A | User resolved |
| Anonymous (no cookie) | Fails | No cookie | **null** |
| OTP | Fails (not BetterAuth session) | Cookie found -> DB lookup | User resolved |

---

## 5. WebSocket Authentication

### Client Side

**File**: `apps/web/components/ChatInterface.tsx` (lines ~261-276)

```typescript
const sessionData = await authClient.getSession();
const token = sessionData?.data?.session?.id;  // BetterAuth session ID

io(SOCKET_URL, {
    auth: { token },                    // Session ID (or undefined)
    query: {
        tenantSlug: tenant.slug,
        userId: currentUser.id,         // From localStorage/state
        userAlias: currentUser.alias
    },
});
```

### Server Side

**File**: `apps/api/src/chat/chat.gateway.ts` (handleConnection)

```
handleConnection(socket)
    |
    |-- Extract: token = socket.handshake.auth?.token
    |-- Extract: userId, userAlias = socket.handshake.query
    |
    |-- if (token) {
    |       // AUTHENTICATED PATH
    |       session = prisma.session.findUnique({ id: token })
    |       if (!session || expired) -> disconnect
    |       socket.data.user = session.user
    |   }
    |
    |-- if (!token) {
    |       // ANONYMOUS PATH
    |       if (existingUserId) {
    |           user = prisma.user.findUnique({ id: existingUserId })
    |           if (user exists) -> reconnect (emit 'userConfirmed')
    |           if (user missing) -> create new (emit 'userCreated')
    |       } else {
    |           create new user -> emit 'userCreated'
    |       }
    |   }
```

### Important: Session ID vs Token

The socket sends `session.id` (the UUID primary key of the Session record), NOT `session.token`. The gateway validates by `prisma.session.findUnique({ id: token })`.

The NestJS tenant controller's `resolveUserFromToken()` queries by `token` field (not `id`). These are **different lookup strategies** for the same Session table.

| Consumer | Looks up by | Field |
|----------|-------------|-------|
| ChatGateway (socket) | `session.id` | Primary key UUID |
| TenantController (REST) | `session.token` | Token column |
| resolveSession (Next.js) | `session.token` | Token column |

---

## 6. Backend Auth (NestJS)

### Tenant Controller Auth

**File**: `apps/api/src/tenant/tenant.controller.ts`

The `resolveUserId()` private method handles dual authentication:

```typescript
private async resolveUserId(auth: string): Promise<string> {
    if (!auth) throw new UnauthorizedException();
    const token = auth.replace('Bearer ', '');

    // [1] Try JWT verification
    try {
        const payload = this.jwtService.verify(token, {
            secret: process.env.BETTER_AUTH_SECRET
        });
        userId = payload.sub || payload.id;
    } catch {
        // [2] Try as session token (DB lookup)
        const resolvedUserId = await this.tenantService.resolveUserFromToken(token);
        if (resolvedUserId) userId = resolvedUserId;
    }

    if (!userId) throw new UnauthorizedException('Invalid token');
    return userId;
}
```

### TenantInterceptor

**File**: `apps/api/src/tenant/tenant.interceptor.ts`

Minimal interceptor that extracts `tenantId` from `x-tenant-id` header and sets `req.tenantContext`. Not involved in auth.

---

## 7. Frontend State Management

### Three-Tier Session Restoration

**File**: `apps/web/components/ChatInterface.tsx` (lines ~136-202)

On page load/reload:

```
[Tier 1] BetterAuth: useSession() hook
    |-- If session?.user exists -> use as source of truth
    |-- Sync to localStorage('chat_user')

[Tier 2] localStorage: getItem('chat_user')
    |-- If BetterAuth empty but localStorage has data
    |-- Keep user logged in (may be stale)

[Tier 3] Debug endpoint: fetch('/api/debug-session')
    |-- Last resort server-side session check
    |-- If found -> update state + localStorage

Result -> isRestoringSession = false -> unblock UI
```

### localStorage Usage

`localStorage.setItem('chat_user', JSON.stringify(user))` is used at:
- After BetterAuth session sync
- After debug session restore
- After login (handleLogin callback)
- After updating alias or status

**Note**: Only stores non-sensitive user fields (id, alias, gender). Tokens stay in HTTP-only cookies.

### Socket-Driven State Updates

```
socket.on('userCreated')    -> Update currentUser + localStorage (new anonymous users)
socket.on('userConfirmed')  -> Update userIdRef (reconnecting users)
socket.on('presenceUpdate') -> Update onlineUsers, roomOnlineCounts
socket.on('newMessage')     -> Save to SQLite + update React Query cache
socket.on('privateMessage') -> Save to SQLite + update private chat state
socket.on('messageDeleted') -> Remove from cache + SQLite
```

---

## 8. API Proxy Pattern

The app uses Next.js API routes as proxies for authenticated requests to avoid cross-port cookie issues.

### Pattern

```
Browser (port 3000) --cookie--> Next.js API route (port 3000)
    |-- resolveSession(headers) reads cookie
    |-- Direct Prisma query (or forward to NestJS)
    |-- Returns response
```

### Existing Proxies

| Route | Method | Auth | Purpose |
|-------|--------|------|---------|
| `/api/tenants/[slug]` | GET | None (public) | Fetch tenant info |
| `/api/tenants/[slug]` | POST | resolveSession + authorizeTenant | Admin tenant updates |
| `/api/tenants/[slug]/feedback` | POST | resolveUser (session OR userId fallback) | Submit feedback |
| `/api/tenants/[slug]/feedback` | GET | resolveUser (session OR userId fallback) | List feedback |

### When to Use Proxy vs Direct

- **Use proxy** (Next.js route): When the endpoint needs BetterAuth cookie auth
- **Use direct** (NestJS API_BASE_URL): When the endpoint is public or uses socket-based auth

---

## 9. Data Flow Diagrams

### Authentication Flow

```
USER ACTION: ANONYMOUS LOGIN
=============================

Login.tsx
    |
    v
[1] authClient.signIn.anonymous()
    |-- BetterAuth -> POST /api/auth/sign-in/anonymous
    |-- Creates Session record in DB
    |-- Sets better-auth.session_token cookie (SOMETIMES FAILS)
    |-- Returns { user, session }
    |
    [FALLBACK if [1] fails]
    v
[2] Manual fetch /api/auth/sign-in/anonymous (credentials: include)
    |
    [FALLBACK if [2] fails]
    v
[3] authClient.getSession()
    |
    v
onLogin(user) -> ChatInterface
    |-- localStorage.setItem('chat_user', user)
    |-- Socket connects (may or may not have token)
```

### WebSocket Connection

```
ChatInterface.tsx                    ChatGateway.ts
    |                                     |
    |-- authClient.getSession()           |
    |-- token = session?.id               |
    |                                     |
    |-- io(SOCKET_URL, {                  |
    |     auth: { token },          ----> handleConnection(socket)
    |     query: { userId, alias }        |
    |   })                                |
    |                                     |-- if (token)
    |                                     |     session = DB.findById(token)
    |                                     |     if valid -> authenticated
    |                                     |
    |                                     |-- if (!token)
    |                                     |     userId from query
    |                                     |     DB.findUser(userId)
    |   <-- 'userConfirmed' ------------- |     emit confirmation
    |                                     |
    |-- socket.emit('join', {             |
    |     user, tenantSlug          ----> handleJoin()
    |   })                                |-- join rooms
    |                                     |-- broadcast presence
```

### Feedback Submission

```
LocalFeedbackOverlay                Next.js API Route              Database
    |                                     |                           |
    |-- POST /api/tenants/                |                           |
    |   slug/feedback                     |                           |
    |   { score, comment, userId }  ----> |                           |
    |                                     |                           |
    |                               resolveUser(headers, userId)      |
    |                                     |                           |
    |                               [1] resolveSession(headers)       |
    |                                     |-- Read cookie             |
    |                                     |-- auth.api.getSession()   |
    |                                     |                           |
    |                               [2] If no session:                |
    |                                     |-- prisma.user.findUnique  |
    |                                     |   ({ id: userId })  ----> |-- Verify exists
    |                                     |                           |
    |                               prisma.feedback.create()    ----> |-- Insert feedback
    |                                     |                           |
    |   <---- 200 { feedback } ---------- |                           |
```

---

## 10. Security Analysis

### 10.1 userId Fallback in Feedback Route

**Risk**: LOW-MEDIUM

The feedback POST accepts `userId` in the body as a fallback for anonymous users without cookies. An unauthenticated client could submit feedback as any user if they know the user ID.

**Current mitigations**:
- BetterAuth session is checked first (authenticated users can't be spoofed)
- User IDs are CUIDs (not guessable sequential integers)
- Feedback is a low-sensitivity operation

**Possible improvement**: Add a rate limit per IP to prevent abuse.

### 10.2 Cross-Port Cookie Handling

**Ports**: Web = 3000, API = 3001

BetterAuth cookies are set for `localhost` (no port restriction by default). However:
- Direct requests from browser to `:3001` may not include `:3000` cookies depending on browser
- The proxy pattern (routing through `:3000` Next.js routes) solves this cleanly
- Socket.IO connects to `:3001` but uses token-based auth (not cookies)

### 10.3 CORS Configuration

**NestJS** (`apps/api/src/main.ts`):
- Allows all `localhost` origins
- Allows local network ranges: `192.168.x.x`, `10.x.x.x`, `172.x.x.x`
- Allows `capacitor://localhost`

**Next.js** (`apps/web/lib/cors.ts`):
- Explicit allowlist: localhost variants + `NEXT_PUBLIC_SERVER_URL` derivatives

**Note**: Local network ranges are wide open. On shared networks, any device can make API requests.

### 10.4 Anonymous Alias Injection

Socket connection accepts `userAlias` from query params and stores it in the DB. A malicious client could connect with a forged alias.

**Recommendation**: Validate alias format (max length, allowed characters).

### 10.5 Token Confusion

The `Session` table has both `id` (UUID) and `token` (unique string) columns. Different parts of the system look up sessions by different fields:
- Socket gateway: by `id`
- NestJS REST controller: by `token`
- Next.js resolveSession: by `token`

This works but is confusing and error-prone for future development.

---

## 11. Known Issues & Bugs

### HIGH Priority

| Issue | Location | Impact |
|-------|----------|--------|
| **Anonymous users often lack BetterAuth cookie** | Login.tsx -> auth flow | HTTP endpoints need userId fallback for anonymous users |
| **OTP users can't authenticate on socket** | ChatInterface.tsx:262-263 | `authClient.getSession()` returns null for OTP sessions -> treated as anonymous |

### MEDIUM Priority

| Issue | Location | Impact |
|-------|----------|--------|
| **Session ID vs Token confusion** | chat.gateway.ts vs tenant.controller.ts | Different lookup strategies for same table; easy to introduce bugs |
| **No alias validation on socket** | chat.gateway.ts:49, 91 | Alias from query params stored directly in DB |
| **Debug session endpoint in production** | ChatInterface.tsx:171 | `/api/debug-session` should be removed or restricted |

### LOW Priority

| Issue | Location | Impact |
|-------|----------|--------|
| **Console.log debug statements** | Multiple files | Should be removed before production |
| **Wide CORS for local network** | main.ts:20-34 | Any device on LAN can make API requests |

---

## 12. Recommendations

### Short Term (Quick Wins)

1. **Validate socket aliases**: Add max-length and character validation for `userAlias` in `ChatGateway.handleConnection()`
2. **Remove debug logs**: Clean up `console.log("[Login] DEBUG ...")` statements
3. **Rate limit feedback**: Add per-IP rate limiting to the feedback proxy route

### Medium Term (Architecture)

4. **Unify session lookup**: Pick one field (either `id` or `token`) for session validation across all consumers. Recommended: always use `token` since it's what BetterAuth sets in cookies.

5. **Fix OTP socket auth**: After OTP login, store the session token in a way that `authClient.getSession()` can find it, OR pass the raw token directly to the socket handshake instead of relying on the BetterAuth client.

6. **Investigate anonymous cookie issue**: Determine why `authClient.signIn.anonymous()` fails to set the `better-auth.session_token` cookie. This may be a BetterAuth version issue or a configuration problem.

### Long Term (Security Hardening)

7. **Move OTP into BetterAuth plugin**: Instead of manual session creation in the verify route, create a custom BetterAuth plugin that handles OTP. This eliminates the dual-session-type complexity.

8. **Remove userId fallback**: Once the anonymous cookie issue is fixed, remove the `userId` body parameter from the feedback route and require proper session-based auth.

9. **Session invalidation on logout**: Ensure server-side session deletion when users log out. Currently localStorage is cleared but the session may persist in DB.

10. **Restrict debug endpoint**: Remove or gate the `/api/debug-session` endpoint behind a development-only check.

---

## 13. Key Files Reference

| File | Purpose |
|------|---------|
| `apps/web/lib/auth.ts` | BetterAuth server config (dynamic origin, passkey, anonymous, OAuth) |
| `apps/web/lib/auth-client.ts` | BetterAuth client (passkey + anonymous plugins) |
| `apps/web/lib/session.ts` | Multi-source session resolution (BetterAuth -> cookie -> DB) |
| `apps/web/components/Login.tsx` | All login strategies (anonymous, OTP, existing session) |
| `apps/web/components/ChatInterface.tsx` | Session sync, socket lifecycle, state management |
| `apps/web/config.ts` | URL configuration (SERVER_URL, API_BASE_URL, SOCKET_URL) |
| `apps/web/services/apiService.ts` | API client functions (tenant, feedback, messages) |
| `apps/web/lib/cors.ts` | CORS configuration for Next.js API routes |
| `apps/web/app/api/tenants/[slug]/route.ts` | Tenant proxy (admin updates with full auth) |
| `apps/web/app/api/tenants/[slug]/feedback/route.ts` | Feedback proxy (session + userId fallback) |
| `apps/web/app/api/auth/otp/send/route.ts` | OTP send (BulkGate SMS) |
| `apps/web/app/api/auth/otp/verify/route.ts` | OTP verify (manual session creation) |
| `apps/api/src/chat/chat.gateway.ts` | WebSocket gateway (auth + anonymous, rooms, messages) |
| `apps/api/src/tenant/tenant.controller.ts` | REST endpoints (JWT + session token dual auth) |
| `apps/api/src/tenant/tenant.service.ts` | DB queries (tenant, feedback, session resolution) |
| `apps/api/src/tenant/tenant.interceptor.ts` | Tenant context extraction from headers |
| `apps/api/src/main.ts` | NestJS bootstrap + CORS config |
| `packages/database/prisma/schema.prisma` | Database schema (Session, User, TenantMember, Feedback) |
