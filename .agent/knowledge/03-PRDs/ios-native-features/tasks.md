# Task: iOS Native Features Implementation

Based on [ios-permission-plan.md](file:///Users/ivanmuccini/Desktop/chatapp/chat/.agent/knowledge/03-PRDs/ios-permission-plan.md)

## Task 1: Fix BSSID Retrieval on iOS
- [x] Create native Swift plugin `WifiInfoPlugin.swift` (Already exists) <!-- id: 0 -->
- [x] Create Objective-C bridge `WifiInfoPlugin.m` (Done) <!-- id: 1 -->
- [x] Create TypeScript bridge `wifi-info.ts` (Verified) <!-- id: 2 -->
- [x] Update `wifi.ts` to use new plugin on iOS <!-- id: 3 -->
- [x] Replace timeout in `page.tsx` with proper async plugin call <!-- id: 4 -->
- [x] Fix empty `NSLocationAlwaysAndWhenInUseUsageDescription` in `Info.plist` <!-- id: 5 -->

## Task 2: WiFi Profile Service with SQLite State
- [x] Add `app_settings` table to `sqlite.ts` <!-- id: 6 -->
- [x] Create `wifiProfileService.ts` <!-- id: 7 -->
- [x] Refactor `AutoConnectScreen.tsx` <!-- id: 8 -->
- [x] Refactor `OnboardingScreen.tsx` <!-- id: 9 -->

## Task 3: Location Permissions & Significant Location Monitoring
- [x] Add location permission overlay to `SearchSpacesScreen.tsx` <!-- id: 10 -->
- [x] Create native plugin `SignificantLocationPlugin` (.swift/.m) (Done) <!-- id: 11 -->
- [x] Create TypeScript bridge `significantLocation.ts` <!-- id: 12 -->
- [x] Integrate location monitoring in `page.tsx` <!-- id: 13 -->

## Task 4: Integrated Onboarding Flow
- [x] Restructure `OnboardingScreen.tsx` into 3 steps <!-- id: 14 -->
- [x] Move onboarding trigger to instruction screen in `page.tsx` <!-- id: 15 -->
- [x] Migrate `onboarding_done` to SQLite <!-- id: 16 -->

## Task 5: Fix Plugin Registration (New)
- [x] Restore `.m` files (Required for method dispatch/registration fallback) <!-- id: 17 -->
- [x] Update `build_cap.sh` to use `cap sync` and inject plugins <!-- id: 18 -->
- [x] Reinstall `@capacitor-community/sqlite` (Was corrupted/empty in node_modules) <!-- id: 19 -->
- [x] **Fix Portability**: Moved patches to root to support hoisted dependencies. Run `npm install` from root. <!-- id: 20 -->
- [x] **Fix Version Mismatch**: Relaxed `CapApp-SPM` version requirement to `from: "8.0.0"` to match `package.json`. <!-- id: 21 -->
- [x] **Fix Prod API Loop**: Update `apiService.ts` to use correct backend path `/api/tenants/validate-nas`. <!-- id: 22 -->
- [x] **Fix Prod API Loop**: Update `next.config.mjs` rewrites for local dev. <!-- id: 23 -->
- [x] **Cleanup**: Delete redundant `apps/web/app/api/validate-nas` route. <!-- id: 24 -->
- [x] **Fix Prod Loading Freeze**: Update `config.ts` to use relative paths in production (Web). <!-- id: 25 -->
