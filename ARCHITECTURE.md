# Project Architecture Documentation

This document provides a comprehensive overview of the software architecture, technologies, and design patterns used in this project.

## 1. Overview

The project is a multi-tenant, real-time chat application designed for both web and mobile platforms. It follows a monorepo architecture for better code sharing and consistency across the frontend and backend.

### Key Capabilities:
- **Multi-tenancy**: Isolated data and configurations for different organizations/tenants.
- **Real-time Communication**: Bi-directional messaging using WebSockets.
- **Offline-First (Mobile)**: Local message caching on mobile devices for seamless usage during intermittent connectivity.
- **Cross-Platform**: Web, Android, and iOS support using Next.js and Capacitor.
- **Modern Authentication**: Support for anonymous sessions and secure authentication via Passkeys (Better-Auth).

---

## 2. Monorepo Structure

The project uses **Turborepo** to manage a collection of applications and shared packages.

```text
.
├── apps/
│   ├── api/            # NestJS Backend (Server)
│   └── web/            # Next.js Frontend (Client & Mobile)
├── packages/
│   ├── database/       # Prisma schema and generated client
│   ├── dtos/           # Shared Data Transfer Objects (Validation)
│   └── types/          # Shared TypeScript interfaces & Socket events
├── turbo.json          # Turborepo configuration
└── package.json        # Workspace definition
```

---

## 3. Tech Stack

### Frontend (`apps/web`)
- **Framework**: Next.js 15+ (App Router)
- **Real-time**: Socket.io-client
- **State & Data Fetching**: TanStack Query (React Query)
- **Styling**: Tailwind CSS, Framer Motion, Radix UI (Shadcn UI)
- **Mobile Wrapper**: Capacitor (Android/iOS)
- **Local Storage**: `@capacitor-community/sqlite` (for offline-first)
- **Authentication Client**: Better-Auth

### Backend (`apps/api`)
- **Framework**: NestJS (Node.js)
- **API Style**: REST (Express) & WebSockets (Socket.io)
- **Scaling**: Redis Adapter for Socket.io (load balancing support)
- **Database ORM**: Prisma
- **Validation**: Class-validator (used with DTOs)

### Database & Infrastructure
- **Primary Database**: PostgreSQL
- **Caching/PubSub**: Redis (for WebSocket adapter)
- **Local Cache**: SQLite (used in mobile builds)

---

## 4. Key Design Patterns & Flows

### 4.1. Multi-Tenancy
Multi-tenancy is implemented at the database level using a `tenantId` field on almost all entities (`User`, `Room`, `Message`, `TenantMember`).
- Tenants are identified by a unique `slug`.
- Backend services scope queries and socket broadcasts by the tenant context.

### 4.2. Real-time Messaging (Socket.io)
Real-time features are handled by NestJS Gateways in `apps/api`.
- **Rooms**: Users join rooms based on `tenantSlug` (lobby) and specific `roomId` (chat rooms).
- **Events**:
  - `sendMessage`: Clients send messages to the server.
  - `newMessage`: Server broadcasts messages to room/tenant members.
  - `presenceUpdate`: Server broadcasts the list of online users in a tenant.
  - `privateMessage`: Targeted events for 1:1 chat.

### 4.3. Offline-First & Mobile Synchronization
On mobile (Capacitor), the app uses a local SQLite database to cache messages.
- **TTL**: Local messages are purged if they are older than 3 hours to keep the local DB light.
- **Hybrid Fetching**: The UI first loads messages from SQLite, then fetches updates from the server and reconciles them.
- **Native Features**: Uses Capacitor Haptics for vibrations and Keyboard for layout adjustments.

### 4.4. Authentication Strategy
Managed by **Better-Auth**, supporting:
- **Sessions**: Token-based authentication stored in cookies or headers.
- **Passkeys**: Passwordless login support.
- **Anonymous Users**: Guests are assigned an anonymous identity in the database, which can be upgraded to a full account.

---

## 5. Folder Breakdown

### `apps/api` (Backend)
- `src/chat`: Socket.io gateways and logic.
- `src/tenant`: Tenant-specific business logic.
- `src/message`: REST endpoints for message history.
- `src/prisma`: Prisma service for database access.

### `apps/web` (Frontend)
- `app/`: Next.js pages and layouts (App Router).
- `components/`: React components (UI, Chat, Admin).
- `hooks/`: Custom React hooks (sockets, membership).
- `lib/`: Shared utilities (auth-client, sqlite, api).
- `services/`: API and Message abstraction services.

### `packages/`
- `database/prisma/schema.prisma`: The "Source of Truth" for the database structure.
- `types/src/index.ts`: Shared TypeScript interfaces between API and Web to ensure type safety across the network.

---

## 6. Development Workflow

- **Local Development**: `npm run dev` starts both API and Web apps.
- **Database Changes**: Modify `packages/database/prisma/schema.prisma`, then run `npm run db:generate` and `npm run db:push`.
- **Building for Mobile**: Use `npm run build:cap` in `apps/web` to sync with Android/iOS projects.
