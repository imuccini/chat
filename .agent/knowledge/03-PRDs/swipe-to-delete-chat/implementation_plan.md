# Implementation Plan: Swipe-to-Delete for Private Chats

Enable users to hide or remove private conversations from their chat list using a high-performance swipe gesture on mobile devices.

## User Review Required

> [!IMPORTANT]
> This feature introduces a new `HiddenConversation` model in the database to persist the hidden state across devices. A database migration will be required.

## Proposed Changes

### Database

#### [MODIFY] [schema.prisma](file:///Users/ivanmuccini/Desktop/chatapp/chat/packages/database/prisma/schema.prisma)
- Add `HiddenConversation` model:
```prisma
model HiddenConversation {
  id        String   @id @default(uuid())
  userId    String
  peerId    String   // The user ID of the other person in the chat
  tenantId  String
  hiddenAt  DateTime @default(now())

  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([userId, peerId, tenantId])
}
```
- Add `hiddenConversations HiddenConversation[]` to the `User` model.

### API Layer

#### [MODIFY] [chat.service.ts](file:///Users/ivanmuccini/Desktop/chatapp/chat/apps/api/src/chat/chat.service.ts)
- Add `hideConversation(userId, peerId, tenantId)` method.
- Add logic to check if a conversation is hidden when fetching chat lists (if applicable).

#### [MODIFY] [chat.gateway.ts](file:///Users/ivanmuccini/Desktop/chatapp/chat/apps/api/src/chat/chat.gateway.ts)
- Add `@SubscribeMessage('hideConversation')` to handle the socket event.

### Frontend Layer

#### [NEW] [SwipeableChatItem.tsx](file:///Users/ivanmuccini/Desktop/chatapp/chat/apps/web/components/ui/SwipeableChatItem.tsx)
- A reusable wrapper for list items using Framer Motion.
- Implements:
    - Horizontal pan gesture.
    - Red underlay with Trash icon.
    - Snap point at 80px (for < 50% swipe).
    - Auto-trigger on > 50% swipe.
    - Haptic feedback integration.

#### [MODIFY] [UnifiedChatList.tsx](file:///Users/ivanmuccini/Desktop/chatapp/chat/apps/web/components/UnifiedChatList.tsx)
- Wrap private chat buttons with `SwipeableChatItem`.
- Pass `onDelete` callback.

#### [MODIFY] [ChatInterface.tsx](file:///Users/ivanmuccini/Desktop/chatapp/chat/apps/web/components/ChatInterface.tsx)
- Implement `handleDeleteChat` to:
    - Update `privateChats` state optimistically.
    - Emit `hideConversation` socket event.
    - If on native, also clear messages from `sqliteService` for that peer.

## Verification Plan

### Automated Tests
- N/A (Manual verification on device is preferred for gestures).

### Manual Verification
- **Web**:
    - Swipe left on a private chat using a mouse or touch emulator.
    - Verify red background and trash icon reveal.
    - Verify snap behavior at < 50%.
    - Verify deletion at > 50%.
    - Refresh page and verify chat remains hidden.
- **Mobile (Capacitor)**:
    - Perform gestures on an iOS/Android device.
    - Verify haptic feedback when crossing the 50% threshold.
    - Verify smooth animations.
