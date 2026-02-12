# Implementation Plan - Revert Staff List in UserList

The user prefers the previous layout where staff members are not shown in a separate section if they are offline, but wants them to have a "Staff" badge if they are online.

## Proposed Changes

### Frontend (`apps/web`)

#### [MODIFY] [UserList.tsx](file:///Users/ivanmuccini/Apps/Antigravity/chat/chat/apps/web/components/UserList.tsx)
-   **Logic Fixes**:
    -   Update `filteredOnlineUsers` to include staff members (remove `!staffIds.has(u.id)` filter).
    -   Remove `filteredStaff` logic as it's no longer needed for a separate section.
-   **Rendering Updates**:
    -   Remove the distinct "Staff del Locale" section from the JSX.
    -   Update the map progress for `filteredOnlineUsers` to pass `staffIds.has(user.id)` to `renderUserItem`.
    -   Ensure the "Staff" badge is visible for these users.
    -   Keep the "Utenti Online" header but remove the conditional logic that checks for staff presence to determine its display.

## Verification Plan

### Automated Tests
- None.

### Manual Verification
1.  Log in as a normal user.
2.  Log in as an admin in another browser/session.
3.  Check the "Utenti" tab.
4.  Verify that the Admin appears in the single "Utenti Online" list with a "Staff" badge.
5.  Verification of "Contact Staff" button on the Local page still works.
