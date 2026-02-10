---
description: Comprehensive analysis of Traen Chat architecture, focusing on authentication, sessions, websockets, and permissions.
---

# App Architecture & Core Concepts

This document provides a deep analysis of the application's core architectural components, serving as a ground truth to prevent common errors related to authentication, sessions, and real-time communication.

## 1. Authentication & Session Management

The application uses **Better Auth** for authentication, but handles sessions differently across platforms.

### Web Platform
- **Mechanism**: Standard cookie-based session management.
- **Client**: `authClient` from `@/lib/auth-client` manages the session automatically.
- **API Calls**: Browser automatically sends cookies; no manual `Authorization` header needed for standard calls, BUT `apiService.ts` mimics native behavior for consistency.
- **Middleware**: Next.js middleware protects routes based on session data.

### Native Platform (Capacitor/Mobile)
- **Mechanism**: Token-based authentication.
- **Login**: `authClient.signIn` builds the session.
- **Token Storage**: The session token (`session.token` or `session.id`) is critical.
- **API Calls**: **CRITICAL RULE**: All API calls from native clients MUST include the `Authorization: Bearer <token>` header. The persistent session cookie is NOT sufficient or reliable on native.
  - *Correction*: Recent fixes in `apiService.ts` ensure this header is sent if a token is present, regardless of platform, to be safe.
- **Session Restoration**:
  - `localStorage` item `chat_user` acts as a fast-load backup for offline/cold start.
  - On mount, `ChatInterface` syncs this with the server session (`useSession` hook).

### User Identification
- **User ID**: Found in `session.user.id`.
- **Anonymous Users**: The backend (`ChatGateway`) supports anonymous connections, creating temporary users if no token is provided but a `userId` is in the handshake query.

## 2. WebSockets (Socket.IO)

Real-time features rely heavily on Socket.IO, with specific logic for connection and room management.

### Connection
- **URL**: `SOCKET_URL` from config.
- **Handshake Auth**:
  - `auth: { token }`: Passed in the connection options.
  - `query: { tenantSlug, userId, userAlias }`: specific params to help the gateway route the connection and handle anonymous users.
- **Reconnection**: Handled automatically, but `ChatInterface` has logic to prevent loops for anonymous users receiving new IDs.

### Rooms & Namespaces
There are three main types of socket rooms:
1.  **Tenant Lobby** (`tenant:[slug]`): For global broadcasts within a tenant (e.g., "User X joined").
2.  **Private User Room** (`[userId]`): For direct messages and private notifications. *Crucial for staff-to-user replies.*
3.  **Chat Rooms** (`[roomId]`): For messages within a specific topic/channel.
4.  **Global** (implicit): The default namespace.

### Events
- **`join`**: Emitted by client on connect. Server joins user to Tenant Lobby, Private User Room, and all Room IDs defined in their membership.
- **`sendMessage`**: Client emits this to send a message.
- **`newMessage`**: Server broadcasts this to a `roomId` or `tenant:[slug]`.
- **`privateMessage`**: Server emits this specifically to the recipient's `[userId]` room AND the sender's `[userId]` room (for multi-device sync). **Note**: The event name is `privateMessage`, NOT `message` or `newMessage` for DM contexts.

## 3. Permissions & Roles

The application implements a Role-Based Access Control (RBAC) system scoped to Tenants.

### Roles
Defined in `schema.prisma` (`TenantRole` enum):
- **OWNER**: Full access to tenant.
- **ADMIN**: Full access to tenant settings, modifying staff, etc.
- **MODERATOR**: Can manage messages/users but not tenant settings.
- **STAFF**: Employee role, often synonymous with generic "admin" privileges in UI logic but distinct in database.
- **USER**: Standard end-user.

### Verification
- **Frontend**: `useMembership` hook checks permissions against the current user's `TenantMember` record.
  - `isAdmin`: checks for `ADMIN` or `OWNER`.
  - `canManageTenant`: broader check.
- **Backend**: `TenantService` methods (e.g., `isTenantAdmin`) verify roles before allowing sensitive actions.
- **API Guards**: Controllers use these service methods to throw `ForbiddenException`.

## 4. CORS & Network

- **Native Issues**: iOS/Android impose strict CORS and networking rules.
- **Fetch API**: Native apps must use absolute URLs (`API_BASE_URL` + endpoint).
- **Caching**: iOS aggressively caches GET requests. **CRITICAL RULE**: All fetch calls for changing data (like messages or room lists) MUST use `{ cache: 'no-store' }`.
- **Localhost**: Android emulator uses `10.0.2.2` to access host localhost; iOS simulator uses `localhost`. The `API_BASE_URL` config handles this dynamically.

## 5. Architectural Rules for Development

1.  **Always Send Auth**: When modifying `apiService`, ensure the `Authorization` header is included if a token exists. Do not rely on cookies alone.
2.  **Check Socket Events**: Verify event names in `ChatGateway` before implementing frontend listeners. Mismatches (e.g. `message` vs `privateMessage`) are common bugs.
3.  **Handle Native Fetches**: Always prepend `API_BASE_URL` and disable cache for dynamic data.
4.  **Platform Checks**: Use `Capacitor.isNativePlatform()` for UI logic differences (e.g., back buttons, haptics, status bars).
