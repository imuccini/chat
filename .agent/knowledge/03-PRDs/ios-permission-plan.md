Plan: iOS Native Features — BSSID, WiFi Profile, Location, Onboarding                  
                                                                                        
 Context                                                

 BSSID-based tenant resolution has never worked on iOS. The @capgo/capacitor-wifi
 plugin explicitly states "BSSID is not available on iOS" and its getCurrentSSID() has
 a race condition (returns synchronously before the async NEHotspotNetwork.fetchCurrent
  callback fires). A custom native plugin is needed. Additionally, the onboarding flow
 requests permissions too early (before the user has context), and there's no
 persistent state tracking for WiFi profile installation.

 ---
 Task 1: Fix BSSID Retrieval on iOS

 Root cause: @capgo/capacitor-wifi never returns BSSID on iOS.
 NEHotspotNetwork.fetchCurrent provides it via network.bssid, but the plugin ignores
 it.

 1.1 Create native Swift plugin WifiInfoPlugin.swift

 New file: apps/web/ios/App/App/WifiInfoPlugin.swift

 Follow the existing WifiConfigPlugin.swift pattern (same file, same directory). The
 plugin will:
 - Use NEHotspotNetwork.fetchCurrent(completionHandler:) with proper async handling
 (resolve inside the callback, not after it)
 - Extract both network.ssid AND network.bssid
 - Check CLLocationManager.accuracyAuthorization (iOS 14+) for precise location status
 - Check CLLocationManager.authorizationStatus() for permission status
 - Return { ssid, bssid, isPrecise, locationPermission }

 1.2 Create Objective-C bridge WifiInfoPlugin.m

 New file: apps/web/ios/App/App/WifiInfoPlugin.m

 One-liner registration file, following WifiConfigPlugin.m pattern.

 1.3 Create TypeScript bridge wifi-info.ts

 New file: apps/web/lib/wifi-info.ts

 Register the WifiInfo plugin with registerPlugin<WifiInfoPlugin>('WifiInfo').

 1.4 Update wifi.ts to use new plugin on iOS

 Modify: apps/web/lib/wifi.ts

 - In getConnectedWifiInfo(): on iOS, use the new WifiInfo.getInfo() instead of
 @capgo/capacitor-wifi. On Android, keep existing plugin.
 - Add new export checkPreciseLocation() that returns { isPrecise: boolean }.
 - If precise location is off, return { ssid: null, bssid: null, isConnected: false,
 isPreciseOff: true }.

 1.5 Replace timeout in page.tsx

 Modify: apps/web/app/page.tsx

 - Remove the Promise.race with 2000ms timeout in resolveCurrentTenant() (lines 44-61)
 - Replace with a single call to the new plugin (which resolves via async callback, no
 indefinite hang)
 - Add a 5-second safety timeout instead of 2 seconds
 - If isPrecise === false, show a diagnostic banner: "Per identificare lo spazio,
 attiva la Posizione Precisa nelle Impostazioni."

 1.6 Fix empty NSLocationAlwaysAndWhenInUseUsageDescription in Info.plist

 Modify: apps/web/ios/App/App/Info.plist (line 48)

 Set to: "Local usa la tua posizione in background per scoprire automaticamente gli
 spazi aderenti vicino a te."

 ---
 Task 2: WiFi Profile Service with SQLite State

 2.1 Add app_settings table to SQLite

 Modify: apps/web/lib/sqlite.ts

 Add to initialize():
 CREATE TABLE IF NOT EXISTS app_settings (
     "key" TEXT PRIMARY KEY,
     "value" TEXT,
     "updatedAt" TEXT
 );

 Add methods: getSetting(key), setSetting(key, value).

 2.2 Create wifiProfileService.ts

 New file: apps/web/lib/wifiProfileService.ts

 Centralizes WiFi profile logic currently duplicated in AutoConnectScreen.tsx and
 OnboardingScreen.tsx:
 - hasOptedIn(): checks SQLite app_settings for wifi_profile_opted_in
 - setOptedIn(status): writes to SQLite
 - installProfile(): calls WifiConfig.connect() (iOS) / WifiConfig.addSuggestion()
 (Android), records opt-in on success
 - Constants: WIFI_SSID = "Local - WiFi", WIFI_PASSWORD = "localwifisicuro"
 (centralized, no longer hardcoded in 2 places)

 2.3 Refactor AutoConnectScreen.tsx

 Modify: apps/web/components/AutoConnectScreen.tsx

 Replace inline handleEnable logic (lines 15-48) with
 WifiProfileService.installProfile(). Keep web .mobileconfig fallback.

 2.4 Refactor OnboardingScreen.tsx

 Modify: apps/web/components/OnboardingScreen.tsx

 Replace inline WiFi setup (lines 42-64) with WifiProfileService.installProfile().
 Check hasOptedIn() to skip if already done.

 ---
 Task 3: Location Permissions & Significant Location Monitoring

 3.1 Add location permission overlay to SearchSpacesScreen.tsx

 Modify: apps/web/components/SearchSpacesScreen.tsx

 Before the map loads, check Geolocation.checkPermissions(). If not granted, show an
 overlay:
 - Title: "Posizione necessaria"
 - Body: "Per mostrarti gli spazi Local vicino a te, abbiamo bisogno di accedere alla
 tua posizione."
 - Button: "Attiva posizione" → triggers Geolocation.requestPermissions()
 - Dismiss: "Non ora" → show map with default Pisa center

 3.2 Create native significant location change plugin

 New file: apps/web/ios/App/App/SignificantLocationPlugin.swift
 New file: apps/web/ios/App/App/SignificantLocationPlugin.m

 Uses CLLocationManager.startMonitoringSignificantLocationChanges():
 - Works with "When In Use" permission only (no "Always" needed)
 - Fires on ~500m movement
 - Sends location updates to JS via notifyListeners("locationChange", data)

 3.3 Create TypeScript bridge and service

 New file: apps/web/lib/significantLocation.ts

 - start(): begins monitoring
 - stop(): stops monitoring
 - addListener('locationChange', callback): receives updates
 - On location change: calls clientResolveTenant() to check if near a venue

 3.4 Integrate location monitoring in page.tsx

 Modify: apps/web/app/page.tsx

 When on the "tenant_not_found" instruction screen:
 - Start significant location monitoring
 - On location change, re-attempt tenant resolution
 - This replaces the current 5-second polling timer with a location-aware trigger

 ---
 Task 4: Integrated Onboarding Flow

 4.1 Restructure OnboardingScreen.tsx into 3 steps

 Modify: apps/web/components/OnboardingScreen.tsx

 - Step 1 (Welcome): Keep as-is. "Benvenuto in Local"
 - Step 2 (WiFi Profile): Dedicated. Uses WifiProfileService.installProfile(). Skip
 button available.
 - Step 3 (Location): Dedicated. "When In Use" location permission only. Skip button
 available.

 Each step is independent — skipping one doesn't block the next.

 4.2 Move onboarding trigger to instruction screen

 Modify: apps/web/app/page.tsx

 Currently onboarding shows BEFORE the instruction screen (line 186-188). Change flow:
 1. App launches → DiscoveryScreen (loading animation)
 2. First attempt at tenant resolution (no permissions needed if has BSSID from prior
 session)
 3. If not found → show instruction screen
 4. On instruction screen, check if onboarding is done. If not, show onboarding
 overlay.

 This provides context before requesting permissions.

 4.3 Migrate onboarding_done to SQLite

 Modify: apps/web/app/page.tsx, apps/web/components/OnboardingScreen.tsx

 - Store in SQLite app_settings table (via sqliteService.setSetting())
 - Migration: check localStorage first for existing users, then SQLite
 - This prevents WebView resets from re-triggering onboarding

 ---
 Implementation Order

 1. Task 1 (BSSID fix) — highest priority, unblocks core feature
 2. Task 2 (WiFi Profile Service) — creates foundations for Tasks 3 & 4
 3. Task 4 (Onboarding) — depends on Task 2
 4. Task 3 (Location monitoring) — lowest priority, can be deferred

 Files Summary
 ┌────────┬──────────────────────────────────────────────────────┐
 │ Action │                         File                         │
 ├────────┼──────────────────────────────────────────────────────┤
 │ Create │ apps/web/ios/App/App/WifiInfoPlugin.swift            │
 ├────────┼──────────────────────────────────────────────────────┤
 │ Create │ apps/web/ios/App/App/WifiInfoPlugin.m                │
 ├────────┼──────────────────────────────────────────────────────┤
 │ Create │ apps/web/lib/wifi-info.ts                            │
 ├────────┼──────────────────────────────────────────────────────┤
 │ Create │ apps/web/lib/wifiProfileService.ts                   │
 ├────────┼──────────────────────────────────────────────────────┤
 │ Create │ apps/web/ios/App/App/SignificantLocationPlugin.swift │
 ├────────┼──────────────────────────────────────────────────────┤
 │ Create │ apps/web/ios/App/App/SignificantLocationPlugin.m     │
 ├────────┼──────────────────────────────────────────────────────┤
 │ Create │ apps/web/lib/significantLocation.ts                  │
 ├────────┼──────────────────────────────────────────────────────┤
 │ Modify │ apps/web/lib/wifi.ts                                 │
 ├────────┼──────────────────────────────────────────────────────┤
 │ Modify │ apps/web/lib/sqlite.ts                               │
 ├────────┼──────────────────────────────────────────────────────┤
 │ Modify │ apps/web/app/page.tsx                                │
 ├────────┼──────────────────────────────────────────────────────┤
 │ Modify │ apps/web/components/OnboardingScreen.tsx             │
 ├────────┼──────────────────────────────────────────────────────┤
 │ Modify │ apps/web/components/AutoConnectScreen.tsx            │
 ├────────┼──────────────────────────────────────────────────────┤
 │ Modify │ apps/web/components/SearchSpacesScreen.tsx           │
 ├────────┼──────────────────────────────────────────────────────┤
 │ Modify │ apps/web/ios/App/App/Info.plist                      │
 └────────┴──────────────────────────────────────────────────────┘
 Verification

 1. BSSID: Build iOS app, connect to WiFi with location + precise location on. Console
 should log BSSID. Toggle precise location off → should show diagnostic banner.
 2. WiFi Profile: Tap "Abilita" → system WiFi dialog appears. Tap again → skipped
 (SQLite state). Kill app, reopen → still skipped.
 3. Map Permission: Open map screen → overlay appears. Tap "Attiva" → permission
 dialog. Grant → map centers on user. Deny → default Pisa view.
 4. Onboarding: Fresh install → sees discovery animation first, then instruction
 screen, then onboarding overlay. WiFi step, then location step. Each can be skipped.
 5. Significant Location: Walk 500m+ → app re-attempts tenant resolution in background.
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌