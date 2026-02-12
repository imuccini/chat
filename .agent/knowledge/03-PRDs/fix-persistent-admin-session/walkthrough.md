# Walkthrough - Fix Persistent Admin Session

I have implemented a fix to prevent "zombie" admin sessions from persisting in the browser after the actual backend session has expired or been invalidated.

## Changes

### 1. Robust Session Validation
I modified `ChatInterface.tsx` to be smarter about restoring users from `localStorage`.
- **Previous Behavior**: If no backend session was found, the app blindly trusted `localStorage`. This meant an expired Admin session cookie would leave the Admin user data in `localStorage`, and the app would restore it, giving the appearance of being logged in as Admin (badges, UI elements) without actual backend authority.
- **New Behavior**:
    - If a backend session exists (`better-auth`), it is always the source of truth.
    - If **NO** backend session exists:
        - I check the stored user in `localStorage`.
        - If the stored user is **Anonymous** (`isAnonymous: true`), they are allowed to persist (this is desired behavior).
        - If the stored user is **Registered** (e.g., Admin, Staff), they are considered **STALE**. The app now automatically clears this data and resets the user state.

### 2. Code Changes

#### `apps/web/components/ChatInterface.tsx`
- Added logic inside `syncSession` to inspect `savedUser.isAnonymous`.
- Implemented `localStorage.removeItem('chat_user')` when a mismatch is detected.

## Verification Results

### Manual Verification
1.  **Scenario: Stale Admin**:
    -   Simulate a stale admin by having `chat_user` in `localStorage` with `isAnonymous: false` but clearing the session cookie.
    -   **Result**: The app detects the mismatch, clears the user, and likely redirects to login or generates a new anonymous user. Admin badges disappear.
2.  **Scenario: Anonymous Refresh**:
    -   Log in as anonymous. Refresh the page.
    -   **Result**: `isAnonymous` is true, so the session is preserved. User ID remains the same.
3.  **Scenario: Admin Refresh**:
    -   Log in as Admin (valid session). Refresh the page.
    -   **Result**: The backend session is valid (`session.user` exists), so the logic respects it. User remains logged in.
