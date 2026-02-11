# Task Checklist: Swipe-to-Delete for Private Chats

## Preparation
- [x] Research existing chat list implementation <!-- id: 0 -->
- [x] Analyze Prisma schema for conversation hiding <!-- id: 1 -->

## Backend Implementation
- [x] Update Prisma schema with `HiddenConversation` model <!-- id: 2 -->
- [x] Run database migration <!-- id: 3 -->
- [x] Implement `hideConversation` in `ChatService` <!-- id: 4 -->
- [x] Add `hideConversation` socket handler in `ChatGateway` <!-- id: 5 -->

## UI Implementation
- [x] Create `SwipeableChatItem` component with Framer Motion <!-- id: 6 -->
- [x] Integrate `SwipeableChatItem` into `UnifiedChatList` <!-- id: 7 -->
- [x] Add haptic feedback for > 50% swipe <!-- id: 8 -->

## State & Persistence
- [x] Update `ChatInterface` to handle optimistic deletion <!-- id: 9 -->
- [x] Update `sqliteService` to handle local conversation hiding <!-- id: 10 -->

## Verification
- [x] Verify swipe gesture on web <!-- id: 11 -->
- [x] Verify haptic feedback and animations on native <!-- id: 12 -->
- [x] Verify persistence after refresh <!-- id: 13 -->
