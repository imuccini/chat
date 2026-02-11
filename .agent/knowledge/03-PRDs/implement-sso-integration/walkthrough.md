# Walkthrough - SSO Integration & UI Polishing

I have implemented Apple and Google SSO options to the login screen and improved the keyboard interaction for mobile users.

## Features Added

### SSO Integration
- **Social Buttons**: Added Google and Apple sign-in buttons to the login screen.
- **Native Social Login**: Integrated `@capgo/capacitor-social-login` to provide a truly native login experience on iOS and Android (using native sheets instead of browser redirects).
- **Platform Intelligence**: 
  - On **iOS**: Shows only Apple ID (as per platform conventions).
  - On **Android/Web**: Shows both Google and Apple ID.
- **Visual Improvements**: Added a clean "oppure" (or) divider to separate social methods from phone-based access.

### Mobile UX Improvements
- **Keyboard Handling**:
  - The login screen now uses an internal scrollable container.
  - When the phone input is focused, the view automatically scrolls to ensure the input and the submit button remain visible above the keyboard.
  - **Refined Focus**: Disabled `autoFocus` on the phone input to ensure SSO buttons are visible on first load.
  - Improved layout resilience when the keyboard is active.

## Technical Details

### Social Login Logic
The implementation uses `better-auth`'s social sign-in capabilities:
```typescript
const handleSocialLogin = async (provider: 'google' | 'apple') => {
  await signIn.social({
    provider,
    callbackURL: window.location.origin,
  });
};
```

### Component Structure
- Modified `Login.tsx` to handle the new `phone_input` layout.
- Integrated `useKeyboardAnimation` more deeply to sync scrolling with keyboard visibility.

## Verification

### UI Layout
- [x] Verified Apple ID button styling (Black/White).
- [x] Verified Google button styling (Standard branding).
- [x] Verified platform-specific visibility logic.

### Keyboard Interaction
- [x] Verified `onFocus` scrolling behavior for the phone input.
- [x] Verified that the scrollable area adjusts its padding based on `keyboardHeight`.

> [!TIP]
> To fully enable social login in production, make sure the `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `APPLE_CLIENT_ID`, and `APPLE_CLIENT_SECRET` environment variables are correctly set in the cloud environment.
