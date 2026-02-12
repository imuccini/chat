# Implementation Plan: iOS Native Features

Implement native iOS features to fix BSSID retrieval, manage WiFi profiles via SQLite, and enhance the onboarding flow with precise location permissions.

## Proposed Changes

### [Component] Native iOS

#### [MODIFY] [Info.plist](file:///Users/ivanmuccini/Desktop/chatapp/chat/apps/web/ios/App/App/Info.plist)
- Update `NSLocationAlwaysAndWhenInUseUsageDescription` with a valid description strings to prevent rejection/crashes.

#### [NEW] [WifiInfoPlugin, SignificantLocationPlugin, WifiConfigPlugin]
- **Bridge Files**: Created `.m` files to expose existing Swift plugins to Capacitor.
- **Config**: Updated `capacitor.config.json` to include these plugins.

### [Component] Web Frontend (Logic)

#### [MODIFY] [wifi.ts](file:///Users/ivanmuccini/Desktop/chatapp/chat/apps/web/lib/wifi.ts)
- Use `WifiInfo.getInfo()` on iOS for reliable BSSID retrieval.
- Add `checkPreciseLocation()` using the new plugin data.

#### [MODIFY] [sqlite.ts](file:///Users/ivanmuccini/Desktop/chatapp/chat/apps/web/lib/sqlite.ts)
- Add `app_settings` table for persisting local state (onboarding status, wifi profile opt-in).
- Add `getSetting(key)` and `setSetting(key, value)` methods.

#### [NEW] [wifiProfileService.ts](file:///Users/ivanmuccini/Desktop/chatapp/chat/apps/web/lib/wifiProfileService.ts)
- Centralize WiFi profile logic.
- Check/Set opt-in status via `sqlite.ts`.
- Call `WifiConfig` plugin methods.

#### [MODIFY] [page.tsx](file:///Users/ivanmuccini/Desktop/chatapp/chat/apps/web/app/page.tsx)
- Replace timeout-based resolution with async plugin calls.
- Integrate significant location monitoring to trigger resolution when moving.
- Logic to show onboarding only if not completed (checked via SQLite).

### [Component] Web Frontend (UI)

#### [MODIFY] [OnboardingScreen.tsx](file:///Users/ivanmuccini/Desktop/chatapp/chat/apps/web/components/OnboardingScreen.tsx)
- Split into 3 steps: Welcome -> WiFi Profile -> Location.
- Use `WifiProfileService` for the profile step.

#### [MODIFY] [SearchSpacesScreen.tsx](file:///Users/ivanmuccini/Desktop/chatapp/chat/apps/web/components/SearchSpacesScreen.tsx)
- Add overlay to request location permissions if missing.

## Verification Plan

### Manual Verification
- **BSSID**: Build and run on iOS. Verify BSSID is logged in console.
- **WiFi Profile**: Verify "Abilita" button installs profile and persists state across app restarts.
- **Location**: Verify map shows permission overlay if needed.
- **Onboarding**: Verify flow appears on fresh install and persists "done" state.
