# Block & Report Feature — Implementation Walkthrough

> **Status**: Implemented (pending `db:push`)
> **Date**: 2026-02-15
> **Depends on**: HiddenConversation pattern, existing Radix UI components
> **No new dependencies added**

---

## Overview

This document describes the complete implementation of the Block & Report feature across the full stack: Prisma schema, shared types, NestJS backend (service + gateway), and React frontend (ChatInterface, GlobalChat, UserList, ReportDialog).

The feature allows users to:
1. **Block** another user — hides their messages in public rooms, prevents private messaging (bidirectional), removes their private chat from the list.
2. **Unblock** — restores visibility and messaging capability.
3. **Report** — submits a reason + optional details + last 10 messages as context to the database for admin review.

---

## Architecture Decisions

| Decision | Rationale |
|----------|-----------|
| Socket-based (not REST) | Consistent with all other user actions in the app (join, sendMessage, hideConversation). Enables real-time UI updates without polling. |
| Client-side message filtering | Room messages from blocked users are filtered in `GlobalChat` before Virtuoso renders. Server still broadcasts to all — this avoids per-user fan-out complexity. |
| Server-side private message blocking | Private messages are silently dropped in the gateway if either party has blocked the other. The sender sees no error (privacy requirement). |
| Bidirectional block check for PMs | `isBlocked(A, B)` returns true if A blocked B **or** B blocked A. Prevents the blocked user from sending messages back. |
| Blocked list emitted on join | The `blockedUsers` event fires during `handleJoin`, so the client always has the full list on connect/reconnect. |
| No toast/notification for reports | Keeps it minimal. The `reportSubmitted` event is emitted but not currently surfaced in UI — can be wired to a toast later. |

---

## Files Changed

### Database Layer

#### `packages/database/prisma/schema.prisma`
**Added two models:**

```
BlockedUser
  - id, userId, blockedId, createdAt
  - @@unique([userId, blockedId]) — prevents duplicate blocks
  - @@index([userId]) — fast lookup of "who did I block?"
  - Cascade delete on both User relations

Report
  - id, reporterId, accusedId, reason, details?, context (Json?), tenantId, createdAt
  - @@index([accusedId]) — find reports against a user
  - @@index([tenantId]) — find reports within a venue
  - Cascade delete on both User relations
```

**Updated `User` model** with four new relation fields:
- `blockedUsers` / `blockedByUsers` (BlockedUser)
- `reportsFiled` / `reportsReceived` (Report)

#### `apps/api/src/prisma/prisma.service.ts`
Added `blockedUser` and `report` getters to delegate to the Prisma singleton, consistent with all other model accessors in this file.

---

### Shared Types

#### `packages/types/src/index.ts`

**ServerToClientEvents** (server emits to client):
| Event | Payload | When |
|-------|---------|------|
| `blockedUsers` | `{ blockedIds: string[] }` | On `join` — full list of blocked user IDs |
| `userBlocked` | `{ blockedId: string }` | After successful block |
| `userUnblocked` | `{ unblockedId: string }` | After successful unblock |
| `reportSubmitted` | (none) | After report saved |

**ClientToServerEvents** (client emits to server):
| Event | Payload |
|-------|---------|
| `blockUser` | `{ blockedId: string }` |
| `unblockUser` | `{ blockedId: string }` |
| `reportUser` | `{ accusedId: string, reason: string, details?: string, context?: any[] }` |

---

### Backend Service

#### `apps/api/src/chat/chat.service.ts`

Five new methods following the existing `hideConversation`/`unhideConversation` pattern:

| Method | Signature | Notes |
|--------|-----------|-------|
| `blockUser` | `(userId, blockedId) => Promise<boolean>` | Upsert — idempotent, won't fail on duplicate |
| `unblockUser` | `(userId, blockedId) => Promise<boolean>` | `deleteMany` — safe if no record exists |
| `getBlockedUserIds` | `(userId) => Promise<string[]>` | Returns array of blocked user IDs |
| `isBlocked` | `(userA, userB) => Promise<boolean>` | Bidirectional check — true if either blocked the other |
| `createReport` | `(reporterId, accusedId, reason, details, context, tenantId) => Promise<boolean>` | Creates Report row |

---

### Backend Gateway

#### `apps/api/src/chat/chat.gateway.ts`

**Three new `@SubscribeMessage` handlers:**

1. `blockUser` — calls `chatService.blockUser()`, emits `userBlocked` back to socket
2. `unblockUser` — calls `chatService.unblockUser()`, emits `userUnblocked` back to socket
3. `reportUser` — calls `chatService.createReport()` with the socket's `tenantId`, emits `reportSubmitted`

**Modified `handleJoin`** (after presence broadcast):
```typescript
const blockedIds = await this.chatService.getBlockedUserIds(user.id);
socket.emit('blockedUsers', { blockedIds });
```

**Modified `handleMessage`** (before private message routing):
```typescript
if (message.recipientId) {
    const blocked = await this.chatService.isBlocked(message.senderId, message.recipientId);
    if (blocked) return; // Silently drop
}
```

---

### Frontend

#### `apps/web/components/ReportDialog.tsx` (NEW)

Italian-localized modal using existing Radix `Dialog` components.

- **Props**: `open`, `onOpenChange`, `peerAlias`, `onSubmit(reason, details?)`
- **Reasons**: Spam, Molestie, Contenuto inappropriato, Altro
- **Details textarea** shown when "Altro" is selected
- **Buttons**: "Annulla" / "Invia segnalazione"
- Resets state on close

#### `apps/web/components/ChatInterface.tsx`

**New state:**
```typescript
const [blockedUserIds, setBlockedUserIds] = useState<Set<string>>(new Set());
const [showBlockConfirm, setShowBlockConfirm] = useState<string | null>(null);
const [showReportDialog, setShowReportDialog] = useState<string | null>(null);
```

**New socket listeners** (inside the connect effect):
- `blockedUsers` — initializes the full `Set<string>` on join
- `userBlocked` — adds to set, clears private chat if currently open with that user
- `userUnblocked` — removes from set

**New handler functions:**
- `handleBlockUser(userId)` — emits `blockUser` via socket
- `handleUnblockUser(userId)` — emits `unblockUser` via socket
- `handleReportUser(accusedId, reason, details?)` — grabs last 10 messages from privateChats as context, emits `reportUser`

**Private chat header**: Added a 3-dot `DropdownMenu` with:
- "Blocca utente" / "Sblocca utente" (toggles based on `blockedUserIds.has()`)
- "Segnala utente"

**Block confirmation dialog**: Radix `Dialog` at the render root — "Bloccare questo utente?" with "Annulla" / "Blocca" buttons.

**ReportDialog**: Rendered at the render root, controlled by `showReportDialog` state.

**Props passed to children:**
- `<GlobalChat blockedUserIds={blockedUserIds} />` (room chats)
- `<UserList blockedUserIds={blockedUserIds} onShowBlockConfirm={...} onShowReport={...} />`

#### `apps/web/components/GlobalChat.tsx`

**New prop**: `blockedUserIds?: Set<string>`

**Filtering logic** (before Virtuoso):
```typescript
const visibleMessages = blockedUserIds?.size
  ? messages.filter(msg => !blockedUserIds.has(msg.senderId))
  : messages;
```

All references to `messages` in the render path (Virtuoso `data`, `length` checks, `renderMessage` lookups, scroll-to-index) now use `visibleMessages`.

#### `apps/web/components/UserList.tsx`

**New props**: `blockedUserIds?`, `onShowBlockConfirm?`, `onShowReport?`

**Changed**: The chat icon button on each user row is now a `DropdownMenu` with:
- "Scrivi messaggio" (existing chat action)
- Separator
- "Blocca utente" (red)
- "Segnala utente" (red)

Click propagation is stopped on the dropdown trigger and content so clicking menu items doesn't also trigger `onStartChat`.

---

## Data Flow

### Block Flow
```
User taps "Blocca" in dropdown
  → ChatInterface.setShowBlockConfirm(peerId)
  → User confirms in Dialog
  → ChatInterface.handleBlockUser(peerId)
  → socket.emit('blockUser', { blockedId })
  → Gateway.handleBlockUser()
  → ChatService.blockUser() → DB upsert
  → socket.emit('userBlocked', { blockedId })
  → ChatInterface listener:
      → blockedUserIds.add(blockedId)
      → privateChats removes blocked user
      → selectedChatPeerId cleared if viewing that chat
  → GlobalChat re-filters visibleMessages (hides in room chats)
```

### Report Flow
```
User taps "Segnala" in dropdown
  → ChatInterface.setShowReportDialog(peerId)
  → ReportDialog opens
  → User selects reason + optional details
  → onSubmit(reason, details)
  → ChatInterface.handleReportUser(accusedId, reason, details)
  → socket.emit('reportUser', { accusedId, reason, details, context: last10Messages })
  → Gateway.handleReportUser()
  → ChatService.createReport() → DB insert
  → socket.emit('reportSubmitted')
```

### Persistence on Reconnect
```
User reconnects (app resume, page reload)
  → socket connects
  → handleJoin fires on server
  → Gateway emits 'blockedUsers' with full list
  → Client restores blockedUserIds Set
  → GlobalChat filters messages immediately
```

---

## Acceptance Criteria Status

| AC | Description | Status |
|----|-------------|--------|
| AC 1 (Block - Private) | Blocking prevents PMs and hides existing chat | Done — server silently drops messages; client removes chat from list |
| AC 2 (Block - Public) | Blocked user's room messages hidden for blocker | Done — `GlobalChat` filters via `visibleMessages` |
| AC 3 (Report) | Report creates DB entry with context | Done — `Report` model with reason, details, JSON context |
| AC 4 (Profile UI) | Chat headers and user list have Block/Report access | Done — 3-dot menus in both private chat header and UserList rows |

---

## Pending / Future Work

| Item | Priority | Notes |
|------|----------|-------|
| `npm run db:push` | **Required** | Schema must be pushed to the database before feature works |
| Admin dashboard for reports | High | Reports are stored but not surfaced in `/admin` yet. Query `Report` table with accused user info + context JSON. |
| Toast on report submission | Low | `reportSubmitted` event is emitted but not shown to user. Wire to a toast/snackbar. |
| Blocked users list in Settings | Medium | Let users see and manage their block list from the Settings tab. |
| Auto-hide on N reports | Low | Strategic brief mentions auto-hiding messages after X reports. Not implemented. |
| Block from room chat context | Low | Currently block is only accessible from private chat header and UserList. Could add long-press on room messages. |
| SQLite cleanup on block | Low | When blocking, local SQLite private messages are not deleted. Only the React state is cleared. |
