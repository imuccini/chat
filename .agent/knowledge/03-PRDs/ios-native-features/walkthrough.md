# iOS Native Features Walkthrough

I have implemented the native iOS features to improve the app's connectivity and onboarding experience.

## Changes

### 1. Fixed Custom Plugin Registration & Dependencies
The custom plugins were missing, and `@capacitor-community/sqlite` was failing to initialize due to missing SPM support.
- **Restored .m files**: Ensured consistent interface definitions for Capacitor bridge.
- **Fixed SQLite Plugin**: 
    - Reinstalled corrupted package.
    - Manually added `Package.swift` to `node_modules/@capacitor-community/sqlite`.
    - **Portability**: Centralized patches in project root to handle hoisted dependencies.
    - **Versions**: Updated `CapApp-SPM/Package.swift` to use `from: "8.0.0"` instead of exact pinning, preventing mismatches between machines.
- **Updated `build_cap.sh`**: Runs `npx cap sync ios` and injects custom plugins.
- **CRITICAL**: Run `npm install` from the **ROOT** of the project, not `apps/web`.
- **Troubleshooting**: If `patch-package` fails, run `rm -rf node_modules package-lock.json && npm install` to reset dependencies.

### 2. Reliable BSSID Retrieval
- **`WifiInfoPlugin`**: Now allows fetching BSSID and checking precise location status on iOS 14+.
- **`wifi.ts`**: Updated `getConnectedWifiInfo` to use this plugin on iOS.
- **`Info.plist`**: Added `NSLocationAlwaysAndWhenInUseUsageDescription` to satisfy permission requirements.
### 4. Fix Production API Loop (404s)
The frontend was calling `/api/validate-nas`, which worked locally (via Next.js rewrite) but failed in production (Nginx/NestJS 404).
- **Corrected Path**: Updated frontend to call `/api/tenants/validate-nas` directly.
- **Aligned Dev**: Updated `next.config.mjs` to rewrite this path locally, matching production behavior.
- **Removed Code**: Deleted redundant `apps/web/app/api/validate-nas` route.

### 5. Fix Local Dev Connection (ECONNREFUSED)
Local dev was failing with `ECONNREFUSED` when connecting to the LAN IP (192.168.1.110) from the same machine (macOS loopback/firewall issue).
- **`apps/web/config.ts`**: Updated `API_BASE_URL` logic to force `http://127.0.0.1:3001` when running on the Web platform (SSR), bypassing the LAN IP for local requests while keeping it for native devices.

### 6. Fix Production Loading Freeze
The app was getting stuck on "Caricamento..." in production because `config.ts` was effectively hardcoding port `:3001` for API calls, which is blocked by firewalls (bypassing Nginx).
- **`apps/web/config.ts`**: Updated `API_BASE_URL` and `SOCKET_URL` to use **relative paths** (`""`) when in production on the Web platform. This allows Nginx to correctly route `/api` and `/socket.io` requests via standard ports (443).

### 3. WiFi Profile Service
- **`wifiProfileService.ts`**: Centralized service that handles connecting to the "Local - WiFi" network.
    - Uses `NEHotspotConfiguration` on iOS to prompt the user to join the network.
    - Uses `WifiNetworkSuggestion` (via `@capgo/capacitor-wifi`) on Android.
- **`sqlite.ts`**: Added `app_settings` table to persist creating/joining the profile.

### 4. Enhanced Onboarding Flow
- **`OnboardingScreen.tsx`**: Restructured into 3 steps:
    1.  **Welcome**: Introduction.
    2.  **Location**: Request permissions (needed for BSSID reading).
    3.  **WiFi Profile**: Prompt to install the WiFi profile for auto-connection.
- **`page.tsx`**:
    - Uses a robust `Promise.race` for detecting WiFi on startup.
    - Monitors **Significant Location Changes** using the new plugin to re-attempt tenant resolution when the user moves.
    - Shows the onboarding flow contextually if not completed.

## Verification

### Automated Checks
- **TypeScript Build**: Ran `tsc` to verify type safety of new bridge files and service logic. (Minor unrelated Next.js error ignored).

### Manual Verification Steps (Required)
Since this involves native code, you must build and run on a physical iOS device:

1.  **Build**: `npm run build:cap` (in `apps/web`)
    *   **Do NOT run `npx cap sync` manually after this.**
2.  **Open**: `npx cap open ios`
3.  **Run**: Deploy to iPhone.
4.  **Onboarding**:
    - Verify the 3-step flow appears on fresh install.
    - Step 2: Verify Location prompt appears.
    - Step 3: Verify "Local wants to join Wi-Fi Network" prompt appears and "Abilita" button works.
5.  **Connectivity**:
    - Connect to "Local - WiFi".
    - Force close app.
    - Re-open app. Verify it detects the tenant immediately (BSSID check).
6.  **Background**:
    - Move to a different location (trigger cell tower change) to test significant location monitoring (logs should show wake up).

## Code References
- `apps/web/build_cap.sh`
- `apps/web/lib/wifi.ts`
- `apps/web/lib/wifiProfileService.ts`
- `apps/web/components/OnboardingScreen.tsx`
- `apps/web/app/page.tsx`
