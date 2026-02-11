# Login & Authentication Flow

This document describes the complete authentication system for the Antigravity Chat app, covering web and native mobile platforms (iOS/Android via Capacitor).

## Table of Contents
1. [Overview](#overview)
2. [Authentication Methods](#authentication-methods)
3. [Platform Considerations](#platform-considerations)
4. [Session Management](#session-management)
5. [Biometric Authentication](#biometric-authentication)
6. [Social Login (Google/Apple)](#social-login-googleapple)
7. [Key Files](#key-files)
8. [Future Work](#future-work)

---

## Overview

The app supports multiple authentication methods:
- **Phone/OTP** - Primary login method for Italian users
- **Social Login** - Google (iOS/Android/Web) and Apple ID (iOS)
- **Biometric** - FaceID/TouchID for returning users on native apps
- **Anonymous** - Guest access with alias

### Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Login.tsx                                 │
│  (Main login component - handles all auth methods)              │
└─────────────────────────────────────────────────────────────────┘
                              │
         ┌────────────────────┼────────────────────┐
         ▼                    ▼                    ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   OTP Flow      │  │  Social Login   │  │   Biometric     │
│                 │  │                 │  │                 │
│ /api/auth/otp/* │  │ /api/auth/      │  │ /api/auth/      │
│                 │  │ social/native   │  │ biometric/*     │
└─────────────────┘  └─────────────────┘  └─────────────────┘
         │                    │                    │
         └────────────────────┼────────────────────┘
                              ▼
                    ┌─────────────────┐
                    │   Session       │
                    │   (Prisma DB)   │
                    └─────────────────┘
```

---

## Authentication Methods

### 1. Phone/OTP Login

**Flow:**
1. User enters Italian phone number (+39)
2. Backend sends SMS with 6-digit OTP code
3. User enters OTP code
4. If new user: prompt for alias and gender
5. Backend creates/retrieves user, creates session
6. Returns `sessionToken` for native apps

**Endpoints:**
- `POST /api/auth/otp/send` - Send OTP SMS
- `POST /api/auth/otp/verify` - Verify OTP, create session

**Key Implementation:**
```typescript
// apps/web/app/api/auth/otp/verify/route.ts
// Creates session with raw token, returns sessionToken in response
const rawToken = crypto.randomBytes(32).toString('base64');
await prisma.session.create({ data: { userId, token: rawToken, ... } });
return { success: true, user, sessionToken: rawToken };
```

### 2. Social Login (Google/Apple)

**Flow (Native):**
1. User taps Google/Apple button
2. `@capgo/capacitor-social-login` opens native auth flow
3. Native SDK returns `idToken` (JWT) and `profile`
4. App calls custom `/api/auth/social/native` endpoint
5. Backend verifies token with provider (Google tokeninfo / Apple JWT decode)
6. Creates/retrieves user, creates session
7. Returns `sessionToken` for native apps

**Endpoints:**
- `POST /api/auth/social/native` - Custom endpoint for native social login

**Why Custom Endpoint?**
Better-Auth's `signIn.social()` expects `idToken` as an object, but native SDKs return it as a string. The custom endpoint handles the native token format correctly.

**Key Implementation:**
```typescript
// apps/web/app/api/auth/social/native/route.ts
// Verifies Google token via tokeninfo endpoint
const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`);
const tokenInfo = await response.json();
// Creates user and session, returns sessionToken
```

### 3. Biometric Login (FaceID/TouchID)

**Flow:**
1. On app mount, check if biometrics available AND enabled
2. If enabled, show "Accedi con FaceID" button
3. User taps button → triggers `NativeBiometric.verifyIdentity()`
4. After successful scan, retrieve credentials from Keychain
5. Call `/api/auth/biometric/login` with token + identifier
6. Backend validates token, creates new session

**Setup Flow:**
1. After successful login (OTP or Social), prompt to enable biometrics
2. User taps "Attiva Ora"
3. `NativeBiometric.verifyIdentity()` - triggers FaceID scan
4. Backend generates secure token via `/api/auth/biometric/setup`
5. Store token in Keychain: `NativeBiometric.setCredentials()`
6. Set `localStorage.biometrics_enabled = 'true'`

**Key Points:**
- `verifyIdentity()` MUST be called before `setCredentials()` or `getCredentials()` to trigger the actual biometric prompt
- Always delete existing credentials before setting new ones (avoids KeychainError)
- Identifier can be phone number OR email (for social login users)

**Endpoints:**
- `POST /api/auth/biometric/setup` - Generate biometric token
- `POST /api/auth/biometric/login` - Login with biometric token

### 4. Anonymous Login

**Flow:**
1. User chooses anonymous access
2. Enters alias and gender
3. Better-Auth creates anonymous session
4. User can chat but with limited features

---

## Platform Considerations

### Web vs Native Differences

| Feature | Web | Native (Capacitor) |
|---------|-----|-------------------|
| Cookies | Work normally | Don't work reliably |
| Session token | In httpOnly cookie | Must pass in localStorage/headers |
| API URLs | Relative (`/api/...`) | Absolute (`http://IP:3000/api/...`) |
| Social login | Better-Auth redirect flow | Native SDK + custom endpoint |
| Biometrics | Not available | FaceID/TouchID via NativeBiometric |

### Native Token Handling

On native platforms, httpOnly cookies can't be read by JavaScript. The solution:

1. **Session Token in Response**: All login endpoints return `sessionToken` in JSON
2. **Store in localStorage**: `localStorage.setItem('session_token', token)`
3. **Pass in Headers**: For biometric setup, pass via `Authorization: Bearer {token}`
4. **Pass in Body**: Also pass `sessionToken` in request body as fallback

```typescript
// Native fetch with token
const response = await fetch(url, {
  headers: {
    'Content-Type': 'application/json',
    ...(sessionToken && { 'Authorization': `Bearer ${sessionToken}` })
  },
  credentials: 'include', // Still try cookies
  body: JSON.stringify({ sessionToken }) // Also in body
});
```

### URL Configuration

```typescript
// apps/web/config.ts
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';

// Usage in native code
const url = Capacitor.isNativePlatform()
  ? `${SERVER_URL}/api/auth/...`
  : '/api/auth/...';
```

---

## Session Management

### Session Creation

All auth methods create sessions the same way:

```typescript
const rawToken = crypto.randomBytes(32).toString('base64');
const expiresAt = new Date();
expiresAt.setDate(expiresAt.getDate() + 365); // 1 year

await prisma.session.create({
  data: {
    userId: user.id,
    token: rawToken,
    expiresAt,
    ipAddress: req.headers.get('x-forwarded-for'),
    userAgent: req.headers.get('user-agent')
  }
});
```

### Session Cookie

For web apps, set cookie alongside JSON response:

```typescript
response.cookies.set('better-auth.session_token', rawToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 365 * 24 * 60 * 60,
  path: '/'
});
```

---

## Biometric Authentication

### Files

- `apps/web/lib/biometrics.ts` - BiometricService
- `apps/web/app/api/auth/biometric/setup/route.ts` - Setup endpoint
- `apps/web/app/api/auth/biometric/login/route.ts` - Login endpoint

### BiometricService API

```typescript
BiometricService.isAvailable()  // Check hardware support
BiometricService.isEnabled()    // Check if user opted-in (localStorage)
BiometricService.setup(identifier, sessionToken)  // Enable biometrics
BiometricService.authenticate() // Login with biometrics
BiometricService.clear()        // Disable biometrics
```

### Database Schema

```prisma
model BiometricToken {
  id        String   @id @default(cuid())
  token     String   @unique
  userId    String
  deviceId  String?
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id])
}
```

### Keychain Storage

Credentials stored in iOS Keychain / Android Keystore:
- **Server**: `com.antigravity.chat` (app identifier)
- **Username**: User's phone number or email
- **Password**: Biometric token from backend

---

## Social Login (Google/Apple)

### Capacitor Plugin

Using `@capgo/capacitor-social-login`:

```typescript
// Initialize on mount
SocialLogin.initialize({
  google: {
    webClientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID_WEB,
    iOSClientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID_IOS,
    iOSServerClientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID_WEB, // For token verification
    mode: 'online'
  },
  apple: {
    clientId: process.env.NEXT_PUBLIC_APPLE_CLIENT_ID,
    redirectUrl: window.location.origin,
  }
});

// Login
const result = await SocialLogin.login({ provider: 'google', options: {} });
// Returns: { idToken, accessToken, profile }
```

### Google Client IDs

Required in `.env`:
```
GOOGLE_CLIENT_ID=...                          # Server-side
NEXT_PUBLIC_GOOGLE_CLIENT_ID_WEB=...          # Web OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID_IOS=...          # iOS OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID_ANDROID=...      # Android OAuth (future)
```

### Token Verification

**Google:**
```typescript
const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`);
const tokenInfo = await response.json();
// tokenInfo contains: email, name, picture, sub (Google user ID)
```

**Apple:**
```typescript
// Decode JWT payload (Apple tokens are self-contained)
const parts = idToken.split('.');
const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf8'));
// payload contains: email, sub (Apple user ID)
```

---

## Key Files

| File | Purpose |
|------|---------|
| `apps/web/components/Login.tsx` | Main login UI component |
| `apps/web/lib/biometrics.ts` | BiometricService |
| `apps/web/app/api/auth/otp/send/route.ts` | Send OTP SMS |
| `apps/web/app/api/auth/otp/verify/route.ts` | Verify OTP, create session |
| `apps/web/app/api/auth/social/native/route.ts` | Native social login |
| `apps/web/app/api/auth/biometric/setup/route.ts` | Biometric setup |
| `apps/web/app/api/auth/biometric/login/route.ts` | Biometric login |
| `apps/web/lib/auth.ts` | Better-Auth configuration |
| `apps/web/config.ts` | SERVER_URL and other config |

---

## Future Work

### Google Login for Android

1. Create Android OAuth Client ID in Google Cloud Console
2. Add to `.env`: `NEXT_PUBLIC_GOOGLE_CLIENT_ID_ANDROID=...`
3. Configure in `SocialLogin.initialize()`:
   ```typescript
   google: {
     androidClientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID_ANDROID,
     // ... existing config
   }
   ```
4. Add SHA-1 fingerprint to Google Cloud Console
5. Test on Android device/emulator

### Apple ID on iOS

1. Enable "Sign in with Apple" capability in Xcode
2. Configure App ID in Apple Developer Portal
3. Add to `.env`: `NEXT_PUBLIC_APPLE_CLIENT_ID=...`
4. Initialize in `SocialLogin.initialize()` (already configured)
5. Add Apple token verification in `/api/auth/social/native`:
   ```typescript
   // For production: verify signature using Apple's public keys
   // Current implementation decodes JWT without signature verification
   ```

### Improvements

- [ ] Add proper JWT signature verification for Apple tokens
- [ ] Add refresh token handling for expired sessions
- [ ] Add device management (list/revoke biometric tokens)
- [ ] Add multi-factor authentication option
- [ ] Add rate limiting for login attempts

---

## Troubleshooting

### Biometric Setup Fails with KeychainError

**Cause:** Existing credentials in Keychain
**Fix:** Delete existing credentials before setting new ones (implemented)

### Social Login Returns Token Format Error

**Cause:** Better-Auth expects object, native SDK returns string
**Fix:** Use custom `/api/auth/social/native` endpoint (implemented)

### Session Token Not Available on Native

**Cause:** httpOnly cookies can't be read by JavaScript
**Fix:** Pass `sessionToken` in API response, store in localStorage, pass in headers/body

### FaceID Not Prompting

**Cause:** `setCredentials()`/`getCredentials()` don't trigger biometric prompt
**Fix:** Call `verifyIdentity()` first to trigger the actual FaceID/TouchID scan
