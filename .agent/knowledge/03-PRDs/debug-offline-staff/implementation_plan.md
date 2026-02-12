# Implementation Plan - Fix Staff Contact Persistence

The user is unable to initiate a chat with the staff because the staff list is empty, often due to under-configured tenants (no members with OWNER/ADMIN roles).

## Proposed Changes

### Backend (`apps/api`)

#### [MODIFY] [tenant.service.ts](file:///Users/ivanmuccini/Apps/Antigravity/chat/chat/apps/api/src/tenant/tenant.service.ts)
- Update `findStaff(slug)`:
    - Specifically prioritize members with the `OWNER` role, then `ADMIN`.
    - **Resilience**: If the tenant has NO members assigned as staff/admin yet (e.g., in a fresh dev environment), return a 404-like error with a descriptive message OR (better for demo/dev) find the very first user who ever interacted with this tenant as a temporary fallback, but log a loud warning.
    - However, since the user says "Admin of the tenant", I will ensure it returns the user with the highest privilege available for that tenant.

### Frontend (`apps/web`)

#### [MODIFY] [ChatInterface.tsx](file:///Users/ivanmuccini/Apps/Antigravity/chat/chat/apps/web/components/ChatInterface.tsx)
-   Refine `handleContactStaff`:
    -   If the API returns a staff/admin, proceed.
    -   If the API returns empty, show a more helpful developer-centric message if in dev mode, or a generic "Support is unavailable" correctly.
    -   **Offline Messaging**: Ensure that even if the Admin is not "online" (not in `onlineUsers`), the chat window opens and the "Lascia un messaggio" warning is visible.

## Verification Plan

### Automated Tests
- None at this stage.

### Manual Verification
1.  **Preparation**: Ensure at least one user in the database is a `TenantMember` with role `OWNER` or `ADMIN` for the slug `treno-lucca-aulla`.
2.  Log in as a normal user.
3.  Click "Scrivi allo staff".
4.  Verify that the chat opens with the Admin user.
5.  Verify the "Lo staff non è online..." banner is visible if the Admin is not logged in simultaneously.
