# Fix Ghost Users on Session Change

[Goal Description]
When a user logs out and switches to a temporary account (or simply logs out), the "Active Users" list currently retains the list from the previous session due to lack of state clearing. The goal is to ensure `onlineUsers` and related state are strictly purged upon logout.

## User Review Required
None.

## Proposed Changes
### Frontend
#### [MODIFY] [ChatInterface.tsx](file:///Users/ivanmuccini/Desktop/chatapp/chat/apps/web/components/ChatInterface.tsx)
- Inside `handleLogout`, add calls to reset:
  - `setOnlineUsers([])`
  - `setOnlineUserIds([])`
  - `setRoomOnlineCounts({})`
  - `setRoomUnreads({})` - To be safe
  - `setRoomLastMessages({})` - To be safe

### Documentation
#### [NEW] [.agent/knowledge/auth-state-flow.md](file:///Users/ivanmuccini/Desktop/chatapp/chat/.agent/knowledge/auth-state-flow.md)
- Document the state management flow during authentication transitions (Login -> Active -> Logout).
- Detail which states are cleared and why.

## Verification Plan
### Manual Verification
- Log in as a User A.
- Observe Active Users list.
- Log out.
- Verify Active Users list is empty (or app redirects/shows login screen).
- Log in as Temporary Account (User B).
- Verify Active Users list shows strictly current online users (and not Ghost User A if A is offline).
