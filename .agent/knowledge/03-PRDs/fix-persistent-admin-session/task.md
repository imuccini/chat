# Task: Fix Persistent Admin Session

The user is experiencing an issue where an anonymous user appears as an Admin (badge visible, can type in announcements) because of leftover session data (likely cookies or localStorage) from a previous admin login on the same browser.

- [x] Analysis
    - [x] Review `ChatInterface.tsx` session restoration logic <!-- id: 1 -->
    - [x] Review `useMembership.ts` to understand how `isAdmin` is derived <!-- id: 2 -->
- [x] Implementation
    - [x] Ensure `localStorage` is cleared or validated against the actual server session <!-- id: 3 -->
    - [x] Force a cleanup if the session type mismatches (e.g., stored user claims admin, but current auth session is null or anonymous) <!-- id: 4 -->
- [x] Verification
    - [x] Verify that logging out clears admin state <!-- id: 5 -->
    - [x] Verify that visiting as anonymous after an admin session (without explicit logout if that's the case, or just general cleanup) doesn't show admin privileges <!-- id: 6 -->
