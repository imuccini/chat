# Implement SSO Integration (Apple & Google)

This plan outlines the steps to add Apple and Google SSO options to the login screen, aimed at reducing SMS OTP costs. It also includes UI improvements for better keyboard handling on mobile devices.

## User Review Required

> [!IMPORTANT]
> To enable social login, the following environment variables must be configured in `.env` (values to be provided by the developer/user):
> - `GOOGLE_CLIENT_ID`
> - `GOOGLE_CLIENT_SECRET`
> - `APPLE_CLIENT_ID`
> - `APPLE_CLIENT_SECRET`

## Proposed Changes

### Web Application

#### [MODIFY] [Login.tsx](file:///Users/ivanmuccini/Desktop/chatapp/chat/apps/web/components/Login.tsx)
- **SSO Buttons**: Add a row of social login buttons (Apple ID, Google) in the `phone_input` view.
  - On iOS: Show only Apple ID.
  - On Android: Show both Apple ID and Google.
- **Divider**: Add a horizontal divider with the text "oppure" between the SSO options and the phone number input.
- **Improved Keyboard Handling**:
  - Wrap the `phone_input` form in a container that applies `contentStyle` from `useKeyboardAnimation`.
  - Ensure the container allows scrolling (`overflow-y-auto`).
  - Implement a `handlePhoneFocus` function that scrolls the input into view at the top of the container when focused.
- **Social Login Logic**:
  - Implement `handleSocialLogin(provider)` using `authClient.signIn.social`.

## Verification Plan

### Automated Tests
- I will verify that the social login buttons trigger the correct `authClient` calls by logging the attempts (social login requires external configuration to fully verify redirect flows).

### Manual Verification
- **Cross-Platform Check**: Verify that the correct social buttons appear on iOS vs. Android (or emulated platforms).
- **Keyboard Interaction**: On a mobile device (or simulated mobile browser), focus the phone input and verify that:
  - The screen slides up correctly.
  - The "Invia Codice Verifica" button remains visible or easily accessible.
  - The page as a whole remains scrollable if needed.
