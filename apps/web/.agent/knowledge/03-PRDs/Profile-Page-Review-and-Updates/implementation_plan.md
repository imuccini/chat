# Profile Page Review and Updates

Review and update the profile page to hide sensitive information, consolidate user data, and provide clear session type indicators.

## Proposed Changes

### Web Application

#### [MODIFY] [types.ts](file:///Users/ivanmuccini/Desktop/chatapp/chat/apps/web/types.ts)
- Add `email?: string` and `isAnonymous?: boolean` to the `User` interface to support session type identification and email display.

#### [MODIFY] [Settings.tsx](file:///Users/ivanmuccini/Desktop/chatapp/chat/apps/web/components/Settings.tsx)
- Hide the User ID field to improve privacy.
- Consolidate Alias, Phone Number, Email, and Gender into a single group under an "Account Information" header.
- Add a session type indicator below the User Avatar:
    - Display "Anonymous Session" for temporary users.
    - Display "Verified User" for registered users.
- Use `user.isAnonymous` and `user.email` to determine the session status.

## Verification Plan

### Manual Verification
- Log in as an anonymous user and verify:
    - "Anonymous Session" indicator is visible.
    - User ID is hidden.
    - Alias, Phone, and Gender are grouped together.
- Log in as a registered user (via Google/Apple or Passkey) and verify:
    - "Verified User" indicator is visible.
    - User ID is hidden.
    - Alias, Phone, Email, and Gender are grouped together.
- Verify that editing the alias still works as expected.
