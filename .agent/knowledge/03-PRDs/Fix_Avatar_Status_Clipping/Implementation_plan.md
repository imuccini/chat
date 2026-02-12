# Fix Avatar Status Indicator Clipping

This plan addresses the issue where the status indicator (online dot) on user and room avatars is being clipped by the parent container's `overflow-hidden` class.

## Proposed Changes

### [Web Components](file:///Users/ivanmuccini/Apps/Antigravity/chat/chat/apps/web/components)

#### [MODIFY] [UserList.tsx](file:///Users/ivanmuccini/Apps/Antigravity/chat/chat/apps/web/components/UserList.tsx)
- Wrap the avatar circle in a `relative` container.
- Move the status dot outside the `overflow-hidden` circle.
- Adjust dot positioning to ensure it overlays the avatar correctly without clipping.

#### [MODIFY] [UnifiedChatList.tsx](file:///Users/ivanmuccini/Apps/Antigravity/chat/chat/apps/web/components/UnifiedChatList.tsx)
- Similarly to `UserList.tsx`, wrap the avatar in a `relative` div.
- Ensure the status dot is a sibling of the `overflow-hidden` circle.

## Verification Plan

### Manual Verification
- Run the app and check the user list and chat list.
- Verify that the blue/green/red status dots are fully visible over the avatar corner.
- Confirm that the avatar images are still circular.
