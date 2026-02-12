# Fix Persistent Admin Session

## Goal Description
Prevent anonymous users from inheriting admin privileges (UI-only or otherwise) from previous sessions on the same browser. This happens because `localStorage` or cookies might be stale, and the frontend optimistically uses them.

## Proposed Changes

### Web Application (`apps/web`)

#### [MODIFY] [ChatInterface.tsx](file:///Users/ivanmuccini/Apps/Antigravity/chat/chat/apps/web/components/ChatInterface.tsx)
-   In the session sync effect (`useEffect` dependent on `session`):
    -   Inspect the "No session" fallback path.
    -   Retrieve `chat_user` from `localStorage`.
    -   **Correction**: If `chat_user` exists but `chat_user.isAnonymous` is FALSE (meaning it was a logged-in user), and `session?.user` is NULL, we must **invalidate** this user.
    -   Clear `localStorage` and `currentUser` in this case to force a fresh state (or new anonymous user generation).
    -   This prevents stale Admin users (who require a valid `session` to function) from persisting in the UI when their backend session is gone.

#### [MODIFY] [useMembership.ts](file:///Users/ivanmuccini/Apps/Antigravity/chat/chat/apps/web/hooks/useMembership.ts)
-   No changes needed if the `ChatInterface` fix is sufficient. The root cause is `ChatInterface` passing a stale ID to `useMembership`.

## Verification Plan

### Manual Verification
1.  Login as Admin.
2.  Refresh to confirm admin status.
3.  Logout (or simulate session expiry/cookie deletion).
4.  Enter as anonymous (or reload).
5.  Confirm `isAdmin` is false and no admin badges are shown.
