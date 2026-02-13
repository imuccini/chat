# Account Management Page

## Goal Description
Create a public-facing `/account` page that allows users to log in (registered users only) and manage their account, specifically to view their data and delete their account permanently.

## User Review Required
> [!IMPORTANT]
> The "No Signup" requirement means that entering a new phone number or a new social account will result in an error rather than creating a new profile.

## Proposed Changes

### [Web] Account Page & Components

#### [NEW] [account/page.tsx](file:///Users/ivanmuccini/Apps/Antigravity/chat/chat/apps/web/app/account/page.tsx)
- A public page using Next.js App Router.
- Displays a Login UI if not authenticated.
- Displays Profile + Delete button if authenticated.

#### [NEW] [components/AccountProfile.tsx](file:///Users/ivanmuccini/Apps/Antigravity/chat/chat/apps/web/components/AccountProfile.tsx)
- Simplified version of the Profile view for the public account page.

#### [MODIFY] [components/Login.tsx](file:///Users/ivanmuccini/Apps/Antigravity/chat/chat/apps/web/components/Login.tsx)
- Add a `requireExisting` prop.
- If true, intercept new user flow and show appropriate error.

### [Web] API Flow

#### [NEW] [api/auth/account/delete/route.ts](file:///Users/ivanmuccini/Apps/Antigravity/chat/chat/apps/web/app/api/auth/account/delete/route.ts)
- Backend logic to irrevocably delete the user.

#### [MODIFY] [api/auth/otp/verify/route.ts](file:///Users/ivanmuccini/Apps/Antigravity/chat/chat/apps/web/app/api/auth/otp/verify/route.ts)
- Add check for `requireExisting` flag to block signup.

## Verification Plan
### Manual Verification
1.  **Restrict Signup**: Attempt to login with a new account. Verify error.
2.  **Existing Login**: Login with existing account. Verify data display.
3.  **Deletion**: Delete account. Verify redirected to login and data removed from DB.
