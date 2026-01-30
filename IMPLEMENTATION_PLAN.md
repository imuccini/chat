# QuickChat Mobile Refactor Plan

This plan details the transformation of QuickChat into a full-featured messaging app with a WhatsApp-style bottom navigation and private 1:1 messaging.

## User Requirements
- **Layout**: Sticky bottom navigation bar with 4 tabs.
- **Tab 1: Room Chat** (Global). Icon badge: User count.
- **Tab 2: Users**. List of active users. Action: Start 1:1 chat.
- **Tab 3: Chats**. List of open 1:1 conversations. Unread badges.
- **Tab 4: Settings**. Change Alias, Logout.
- **Tech**: Optimized for Mobile.

## 1. Database & Server (`server.js`)

### Schema Update
- Modify `messages` table to add `recipientId` (TEXT, nullable).
  - `recipientId` IS NULL -> Global Message.
  - `recipientId` IS NOT NULL -> Private Message (Direct Message).

### Socket Events
- **Presence**:
  - Change `presenceUpdate` to send a full list of objects `[{ id, alias, gender }]` instead of just a count.
- **Messaging**:
  - `sendMessage` handler needs to check for `recipientId`.
  - If private: emit only to `sender` and `recipient`.
  - Store in DB with `recipientId`.

### API
- `GET /api/messages`: Return only global messages (where `recipientId` is null).
- `GET /api/private-messages/:userId`: (Optional) Or sync history on private chat open. *Decision: To keep it light, we can sync private history via socket requests or a specific API endpoint.*

## 2. Frontend Architecture (`APP.tsx`)

### State Management
- **Navigation**: `activeTab` ('room', 'users', 'chats', 'settings').
- **Data**:
  - `globalMessages`: Array.
  - `privateChats`: Map/Object `{ [userId]: Message[] }`.
  - `activeUsers`: Array of User objects.
  - `currentPrivateChat`: ID of the user currently being chatted with (switches view to a sub-page of 'chats').

### New Components
1.  **`BottomNav`**: The sticky footer.
2.  **`UserList`**: Tab 2 content. Renders list of users.
3.  **`ChatList`**: Tab 3 content. Renders list of conversations with last message preview and unread badge.
4.  **`Settings`**: Tab 4 content.
5.  **`GlobalChat`**: The existing `ChatRoom` adapted to fit Tab 1.
6.  **`PrivateChat`**: A variant of `ChatRoom` for 1:1.

## 3. Implementation Steps

### Phase 1: Server Side (Logic)
- Update SQLite Schema.
- Update `sendMessage` socket logic.
- Update `presence` logic to track full user details map.

### Phase 2: React Structure (UI)
- Create `BottomNav` component.
- Refactor `App.tsx` to handle the Tab switching logic.
- Move existing `ChatRoom` to `GlobalChat`.

### Phase 3: "Users" & "Settings" Features
- Implement `UserList` fetching real data from `presenceUpdate`.
- Implement `Settings` (Alias update might require a server event `updateProfile`).

### Phase 4: Private Messaging Logic
- Implement `PrivateChat` view.
- Handle receiving private messages (notifications/badges).
- "Start Chat" flow from User List.

## Verification Plan
- **Manual Test**: Open 2 browsers.
- **Global**: Default chat works.
- **Presence**: Check User List matches.
- **PM**: Send message from User A to User B. Verify User C does not see it.
- **Badges**: Verify unread counts increment.
