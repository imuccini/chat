# Implementation Plan: Enhancing Registered Users Admin Page

Improve the "Registered Users" admin dashboard by replacing the basic table with a feature-rich Shadcn/UI DataTable that supports searching, pagination, and proper scrolling.

## Proposed Changes

### [Component] Web Frontend

#### [NEW] [user-data-table.tsx](file:///Users/ivanmuccini/Desktop/chatapp/chat/apps/web/components/admin/users/user-data-table.tsx)
- Create a new, feature-rich DataTable component specifically for users (or reusable).
- Features to include:
    - **Search/Filter Bar**: A top input to filter by Name, Phone, and Email.
    - **Pagination**: Standard pagination controls (Previous, Next, Page count).
    - **Scrolling**: Wrap the table in a scrollable container to prevent page overflow.
    - **Styling**: Ensure it looks premium and matches the app aesthetics.

### [Component] Chat Re-opening & Swipe Logic

#### [MODIFY] [ChatService.ts](file:///Users/ivanmuccini/Desktop/chatapp/chat/apps/api/src/chat/chat.service.ts)
- Add `unhideConversation(userId, peerId, tenantId)` method to delete `HiddenConversation` entry.

#### [MODIFY] [ChatGateway.ts](file:///Users/ivanmuccini/Desktop/chatapp/chat/apps/api/src/chat/chat.gateway.ts)
- Call `unhideConversation` when a private message is sent/received.

#### [MODIFY] [SwipeableChatItem.tsx](file:///Users/ivanmuccini/Desktop/chatapp/chat/apps/web/components/ui/SwipeableChatItem.tsx)
- Fix the background underlay to ensure the `Trash2` icon is visible and correctly positioned.

#### [MODIFY] [columns.tsx](file:///Users/ivanmuccini/Desktop/chatapp/chat/apps/web/components/admin/users/columns.tsx)
- Ensure all relevant fields (Name, Email, Phone, Gender, Joined, Last Login) are present.
- Add an Actions column if necessary (e.g., for editing or deleting users).

#### [MODIFY] [page.tsx](file:///Users/ivanmuccini/Desktop/chatapp/chat/apps/web/app/_admin/(authenticated)/users/page.tsx)
- Switch from the basic `DataTable` to the new `UserDataTable`.
- Remove the outer `Card`-like wrapper that causes the "double border" effect.
- Adjust layout spacing to ensure vertical scrolling works correctly within the dashboard context.

## Verification Plan

### Manual Verification
- **Search**: Type in the search box and verify the table filters in real-time.
- **Pagination**: Navigate between pages and verify data changes correctly.
- **Scrolling**: On smaller screens or with many users, verify the table scrolls internally.
- **Visuals**: Check for the removal of the double border and ensure a premium feel.
