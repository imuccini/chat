# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Antigravity Chat — a multi-tenant, real-time chat application with venue-based auto-discovery. Users connect to chat rooms tied to physical venues (identified via NAS/WiFi BSSID). Supports web and native mobile (iOS/Android via Capacitor). UI is Italian-localized.

## Monorepo Structure

- **Package manager**: npm workspaces + Turborepo
- **`apps/api`**: NestJS 11 backend (REST + Socket.IO WebSocket gateway), ES modules
- **`apps/web`**: Next.js 16 frontend (App Router), also serves as Capacitor shell for mobile
- **`packages/database`**: Prisma schema, client, and migrations (PostgreSQL)
- **`packages/dtos`**: Shared Zod validation schemas
- **`packages/types`**: Shared TypeScript interfaces (`User`, `Message`, `Room`, `Tenant`, Socket.IO event types)

## Common Commands

```bash
npm install              # Install all workspace dependencies
npm run dev              # Run both web (port 3000) and API (port 3001)
npm run dev:web          # Web only
npm run dev:api          # API only
npm run build            # Build all apps via Turbo
npm run lint             # Lint all workspaces

# Database (Prisma)
npm run db:generate      # Generate Prisma client from schema
npm run db:push          # Push schema to database (no migration)

# API tests (Jest, run from apps/api)
cd apps/api && npm test          # Run all tests
cd apps/api && npm run test:watch
cd apps/api && npm run test:e2e

# Mobile (Capacitor, run from apps/web)
cd apps/web && npm run build:cap
npx cap sync
npx cap open ios
```

## Architecture

### Authentication (BetterAuth)

Configured in `apps/web/lib/auth.ts`. Supports multiple strategies:
- Email/password sessions stored in PostgreSQL via Prisma
- WebAuthn/FIDO2 passkeys (origin-aware RP ID for mobile)
- Anonymous guest login (auto-generated alias)
- Optional Google/Apple OAuth

Auth API routes live at `apps/web/app/api/auth/`. Session tokens are used by both the Next.js frontend and forwarded to the NestJS backend for WebSocket authentication.

### Real-Time Chat (Socket.IO)

The WebSocket gateway is at `apps/api/src/chat/chat.gateway.ts`. Key design:
- **Tenant isolation**: Socket.IO rooms named `tenant:{slug}` and room IDs
- **Private messaging**: User-specific rooms named by user ID
- **Presence**: In-memory `Map<socketId, { user, tenantId, rooms }>` broadcast on connect/disconnect
- **Rate limiting**: 500ms per message
- **Message retention**: 48 hours (enforced at query time in ChatService)
- **Redis adapter**: Optional for horizontal scaling, falls back to in-memory

Events: `join`, `sendMessage`, `deleteMessage` (client→server); `newMessage`, `privateMessage`, `presenceUpdate`, `messageDeleted`, `rateLimited` (server→client). Types defined in `packages/types`.

### Tenant & Venue Discovery (NAS Validation)

Tenants map to physical venues. Auto-discovery flow:
1. Client detects WiFi BSSID (via Capacitor plugin) or public IP
2. Sends to `/api/validate-nas` endpoint
3. Backend matches against `NasDevice` records (nasId, bssid, vpnIp, publicIp)
4. Returns tenant slug → client navigates to `/{slug}` chat

### Frontend Routing

- `/` — Home page with tenant auto-discovery
- `/[...slug]` — Dynamic tenant chat page (`TenantChatClient.tsx` is the main client component)
- `/admin/*` — Admin dashboard (nested layout with auth guard)
- `/api/tenants/[slug]` — Proxies to NestJS backend with auth headers

### Data Flow

- **Server state**: TanStack React Query v5
- **Real-time updates**: Socket.IO event listeners update UI directly
- **API service**: `apps/web/services/apiService.ts` wraps fetch calls
- **Backend modules**: NestJS DI modules (`ChatModule`, `TenantModule`, `MessageModule`, `PrismaModule`)

### Mobile (Capacitor)

The Next.js app doubles as the Capacitor web bundle. Key plugins: SQLite (offline), WiFi (BSSID detection), keyboard animations, haptics, status bar. Config in `apps/web/capacitor.config.ts`. Dev server binds `0.0.0.0` for LAN access.

### Styling

Tailwind CSS with CSS variable-based theming (HSL colors). Component library in `apps/web/components/ui/` follows shadcn patterns (Radix UI + class-variance-authority). Animations via Framer Motion. Colors use a custom `primary` variable — avoid hardcoded emerald/green shades.

## Key Files

| Purpose | Location |
|---|---|
| Prisma schema | `packages/database/prisma/schema.prisma` |
| BetterAuth config | `apps/web/lib/auth.ts` |
| WebSocket gateway | `apps/api/src/chat/chat.gateway.ts` |
| Chat service (persistence) | `apps/api/src/chat/chat.service.ts` |
| NestJS bootstrap | `apps/api/src/main.ts` |
| Next.js config | `apps/web/next.config.mjs` |
| Tailwind config | `apps/web/tailwind.config.js` |
| Shared types | `packages/types/src/index.ts` |
| Frontend config | `apps/web/config.ts` |
| API service | `apps/web/services/apiService.ts` |

## Environment Variables

Required in root `.env`:
- `DATABASE_URL` — PostgreSQL connection string
- `BETTER_AUTH_SECRET` — Auth signing secret
- `BETTER_AUTH_URL` — Auth base URL (must match request origin for passkeys)
- `NEXT_PUBLIC_SERVER_URL` — Public-facing URL for the web app
- `API_PORT` — NestJS port (default 3001)
- `REDIS_URL` — Optional, for distributed Socket.IO

## Conventions

- Backend uses NestJS module/controller/service pattern with ES modules (`"type": "module"`)
- Frontend uses Next.js App Router with server components where possible; client components marked with `"use client"`
- Workspace packages imported as `@local/database`, `@local/dtos`, `@local/types`
- CORS is configured for Capacitor origins (`capacitor://localhost`) and local network ranges
- The web app proxies some API calls to the NestJS backend (see `apps/web/app/api/tenants/`)
