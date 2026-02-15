# Authentication State Flow & Cleanup

## Overview
This document outlines how the application manages user state during authentication transitions (Login -> Active -> Logout), with specific focus on preventing "Ghost Users" by ensuring clean state resets.

## State Lifecycle

### 1. Login / Initialization
- **Source of Truth**: `ChatInterface.tsx` initializes `currentUser` from `localStorage` or session API.
- **Socket Connection**: Established only after `currentUser` is valid.
- **Initial Fetch**:
  - Messages are fetched from API/SQLite.
  - `onlineUsers` and `roomOnlineCounts` are initially empty (or cached if configured).

### 2. Active Session
- **Real-time Updates**:
  - `socket.on('presenceUpdate')` updates `onlineUsers`, `onlineUserIds`, and `roomOnlineCounts`.
  - `socket.on('newMessage')` updates message lists.
- **Local State**:
  - `privateChats`: Stores private conversation state.
  - `roomLastMessages`: Stores metadata for room list UI.

### 3. Logout / Session Switch
When a user logs out (`handleLogout`), the application MUST purge all user-specific state to prevent data leakage or "Ghost User" artifacts in the UI for the next user (especially relevant for shared devices or quick account switching).

#### Cleanup Actions
The `handleLogout` function performs the following **synchronous** cleanup actions:
1. **Disconnect Socket**: Immediately disconnects to stop incoming events.
2. **Clear User Identity**:
   - `setCurrentUser(null)`
   - `localStorage.removeItem('chat_user')`
3. **Purge Data Stores**:
   - `setPrivateChats({})`
   - `sqliteService.clearMessages()` (Native only)
   - `queryClient.setQueryData(...)` (Reset React Query cache)
4. **Purge Presence State** (CRITICAL for "Ghost User" prevention):
   - `setOnlineUsers([])`: Clears the visual list of users.
   - `setOnlineUserIds([])`: Clears the ID set used for online indicators.
   - `setRoomOnlineCounts({})`: Resets room counters.
   - `setRoomUnreads({})`: Clears unread counts.
   - `setRoomLastMessages({})`: Clears message previews.

## Prevention of "Ghost Users"
A "Ghost User" occurs when the `activeUsers` list from Session A persists into Session B. This happens if the state is not explicitly reset.
By enforcing the `setOnlineUsers([])` and related resets in `handleLogout`, we ensure that Session B starts with a pristine state, waiting for its own socket connection to populate the fresh list of online users.
