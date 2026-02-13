# Android SQLite Build Fix

## 🐛 **The Problem**

Android build fails with:
```
Configuring project ':capacitor-community-sqlite' without an existing directory is not allowed.
The configured projectDirectory '.../apps/web/node_modules/@capacitor-community/sqlite/android' does not exist
```

## 🔍 **Root Cause**

This is a **monorepo-specific issue**:

1. ✅ **Dependencies are hoisted** - npm workspaces hoist `@capacitor-community/sqlite` to `/chat/node_modules/` (root)
2. ❌ **Capacitor assumes local node_modules** - `npx cap sync android` generates `capacitor.settings.gradle` with paths like `../node_modules/`
3. ❌ **Path mismatch** - Android looks in `apps/web/node_modules/` but the package is in `/chat/node_modules/` (3 levels up)

### **File Structure:**
```
/chat/
  ├── node_modules/
  │   └── @capacitor-community/
  │       └── sqlite/           # ✅ Package is HERE (root)
  │           └── android/
  └── apps/
      └── web/
          ├── node_modules/      # ❌ Empty (dependencies hoisted)
          └── android/
              └── capacitor.settings.gradle  # Looks for ../node_modules/
```

---

## ✅ **The Solution**

A post-sync script that automatically corrects the path in `capacitor.settings.gradle`.

### **What Was Implemented:**

#### **1. Created `scripts/fix-android-sqlite-path.mjs`**
```javascript
// Automatically fixes:
// FROM: ../node_modules/@capacitor-community/sqlite/android
// TO:   ../../../node_modules/@capacitor-community/sqlite/android
```

This script:
- ✅ Runs after `npx cap sync android`
- ✅ Only modifies SQLite path (leaves other plugins alone)
- ✅ Idempotent (safe to run multiple times)
- ✅ Skips if Android not synced yet

#### **2. Updated `package.json` Scripts**

**Before:**
```json
"cap:sync:android": "npx cap sync android && node scripts/inject-cap-plugins.mjs android"
```

**After:**
```json
"cap:sync:android": "npx cap sync android && node scripts/fix-android-sqlite-path.mjs && node scripts/inject-cap-plugins.mjs android"
```

**Order matters:**
1. `npx cap sync android` - Generates `capacitor.settings.gradle` (wrong path)
2. `fix-android-sqlite-path.mjs` - Fixes SQLite path
3. `inject-cap-plugins.mjs` - Injects custom native plugins

---

## 🚀 **How to Build Android Now**

### **Correct Build Process:**

```bash
# 1. Build the web app
npm run build

# 2. Export for Capacitor
npm run build:cap

# 3. Sync Android (automatically fixes paths)
npm run cap:sync:android

# 4. Open in Android Studio
npm run cap:open:android

# 5. Build in Android Studio (should work now!)
```

### **DO NOT Run:**
```bash
# ❌ WRONG - Doesn't fix paths
npx cap sync android

# ✅ CORRECT - Runs the fix script
npm run cap:sync:android
```

---

## 🧪 **Verification**

After running `npm run cap:sync:android`, check:

```bash
cat android/capacitor.settings.gradle | grep sqlite
```

**Expected output:**
```gradle
include ':capacitor-community-sqlite'
project(':capacitor-community-sqlite').projectDir = new File('../../../node_modules/@capacitor-community/sqlite/android')
```

**✅ Correct:** `../../../node_modules/` (3 levels up to monorepo root)
**❌ Wrong:** `../node_modules/` (only 1 level up, doesn't exist)

---

## 🔄 **Why iOS Doesn't Have This Issue**

| Platform | Dependency Resolution | Issue? |
|----------|----------------------|--------|
| **iOS** | CocoaPods automatically resolves paths from workspace | ✅ No issue |
| **Android** | Gradle requires exact hardcoded paths | ❌ Needs manual fix |

CocoaPods (iOS) is smart enough to find hoisted dependencies, but Gradle (Android) needs exact paths.

---

## 📝 **Comparison with iOS Workflow**

### **iOS (Working):**
```bash
npm run build
npm run build:cap
npm run cap:sync:ios        # Runs inject-cap-plugins.mjs
npm run cap:open:ios
# ✅ Works perfectly
```

### **Android (Now Fixed):**
```bash
npm run build
npm run build:cap
npm run cap:sync:android    # Runs fix-android-sqlite-path.mjs + inject-cap-plugins.mjs
npm run cap:open:android
# ✅ Now works!
```

---

## 🛠️ **Troubleshooting**

### **Issue: Build still fails after running script**

**Check 1:** Verify path was fixed
```bash
cat android/capacitor.settings.gradle | grep sqlite
# Should show: ../../../node_modules/
```

**Check 2:** Verify SQLite exists in root
```bash
ls -la ../../node_modules/@capacitor-community/sqlite/android
# Should show: directory exists
```

**Check 3:** Clean Android build
```bash
cd android
./gradlew clean
cd ..
npm run cap:sync:android
```

---

### **Issue: Script says "SQLite entry not found"**

This means `capacitor.settings.gradle` doesn't include SQLite at all.

**Solution:**
```bash
# Ensure SQLite is installed
npm install @capacitor-community/sqlite

# Re-sync
npm run cap:sync:android
```

---

### **Issue: Build works once, then breaks again**

This happens if you run `npx cap sync android` directly (without `npm run`).

**Always use:**
```bash
npm run cap:sync:android   # ✅ Runs fix script
```

**Never use:**
```bash
npx cap sync android       # ❌ Doesn't run fix script
```

---

## 📚 **Related Files**

| File | Purpose |
|------|---------|
| `scripts/fix-android-sqlite-path.mjs` | Fixes SQLite path in Android |
| `scripts/inject-cap-plugins.mjs` | Injects custom native plugins |
| `android/capacitor.settings.gradle` | Gradle settings (auto-generated, then patched) |
| `package.json` | Contains `cap:sync:android` script |

---

## 🎯 **Summary**

**Problem:** Monorepo hoists dependencies, but Android Gradle needs exact paths.

**Solution:** Automated script that fixes SQLite path after `cap sync`.

**Usage:** Always use `npm run cap:sync:android` (never `npx cap sync android` directly).

**Status:** ✅ Fixed and automated

---

**Last Updated:** 2026-02-13
**Tested With:** Capacitor 8, @capacitor-community/sqlite 8.0.0, npm workspaces
