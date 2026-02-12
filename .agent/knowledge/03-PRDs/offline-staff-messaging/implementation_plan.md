# Enable Offline Staff Messaging

## Goal Description
Allow users to initiate chat sessions with tenant staff/admins at any time, regardless of their online status. Remove preemptive blocks and provide a polite "Offline" context alert if the staff member is not currently active. ensuring messages are delivered and stored for later retrieval.

## User Review Required
- **Alert Text**: Using specific text "Lo staff non è online. Lascia un messaggio e ti risponderemo appena possibile."
- **Staff Visibility**: Staff will be added to `UserList` as a persistent entry/section.

## Proposed Changes

### Web Application (`apps/web`)

#### [MODIFY] [ChatInterface.tsx](file:///Users/ivanmuccini/Apps/Antigravity/chat/chat/apps/web/components/ChatInterface.tsx)
-   Fetch tenant staff using `clientGetTenantStaff` (via `useQuery`).
-   Pass specific `staff` list to `UserList` component.
-   Ensure `handleStartChat` creates a private chat entry immediately.
-   Verify/Update the "Offline" alert in the chat view to match the requested text: "Lo staff non è online. Lascia un messaggio e ti risponderemo appena possibile."

#### [MODIFY] [UserList.tsx](file:///Users/ivanmuccini/Apps/Antigravity/chat/chat/apps/web/components/UserList.tsx)
-   Accept `staff` prop (List of Users).
-   Add a "Staff del Locale" section at the top of the list.
-   Render staff members with online/offline status indicators.
-   Allow clicking staff members to trigger `onStartChat`.

### API / Common

#### [Review] [apiService.ts](file:///Users/ivanmuccini/Apps/Antigravity/chat/chat/apps/web/services/apiService.ts)
- Verify `clientGetTenantStaff` returns all staff, not just online ones.

## Verification Plan

### Manual Verification
1.  **Offline Admin Test**:
    -   Log in as a standard user.
    -   Ensure the Admin/Staff account is offline (logged out).
    -   Go to "Users" tab. Verify Staff is visible.
    -   Click Staff. Verify Chat opens.
    -   Verify "Offline" alert is visible with correct text.
    -   Send a message. Verify it appears sent.
2.  **Admin Receipt**:
    -   Log in as Admin (on another browser/device).
    -   Verify the message is received/visible in the chat list.
