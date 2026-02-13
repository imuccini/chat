# Android Build - Complete Fix Summary

## ✅ All Issues Fixed!

Two separate issues were resolved to make Android build work in your monorepo.

---

## 🐛 Issue #1: SQLite Path Problem

### **Problem:**
```
Configuring project ':capacitor-community-sqlite' without an existing directory is not allowed.
The configured projectDirectory '.../apps/web/node_modules/@capacitor-community/sqlite/android' does not exist
```

### **Root Cause:**
Monorepo dependency hoisting - SQLite is in `/chat/node_modules/`, not `/chat/apps/web/node_modules/`

### **Solution:**
✅ Created `scripts/fix-android-sqlite-path.mjs`
✅ Updated `cap:sync:android` to run the fix automatically

**Before:**
```gradle
project(':capacitor-community-sqlite').projectDir = new File('../node_modules/@capacitor-community/sqlite/android')
```

**After:**
```gradle
project(':capacitor-community-sqlite').projectDir = new File('../../../node_modules/@capacitor-community/sqlite/android')
```

---

## 🐛 Issue #2: ProGuard Deprecated API

### **Problem:**
```
`getDefaultProguardFile('proguard-android.txt')` is no longer supported.
Instead use `getDefaultProguardFile('proguard-android-optimize.txt')`
```

### **Root Cause:**
`@capacitor/app@8.0.0` uses outdated ProGuard configuration incompatible with newer Android Gradle Plugin

### **Solution:**
✅ Created patch: `patches/@capacitor+app+8.0.0.patch`
✅ Patch is auto-applied via `postinstall` script

**Fix:**
```diff
- proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
+ proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
```

---

## 📁 Files Created/Modified

| File | Purpose |
|------|---------|
| `scripts/fix-android-sqlite-path.mjs` | Fixes SQLite path after cap sync |
| `patches/@capacitor+app+8.0.0.patch` | Fixes ProGuard configuration |
| `package.json` | Updated `cap:sync:android` script |

---

## 🚀 How to Build Android Now

### **Complete Build Process:**

```bash
# 1. Build the web app
npm run build

# 2. Export for Capacitor
npm run build:cap

# 3. Sync Android (runs both fix scripts automatically)
npm run cap:sync:android

# 4. Open in Android Studio
npm run cap:open:android

# 5. Build in Android Studio (File → Build → Make Project)
```

---

## 🔄 Comparison: iOS vs Android Workflow

### **iOS (Already Working):**
```bash
npm run build
npm run build:cap
npm run cap:sync:ios        # Runs inject-cap-plugins.mjs
npm run cap:open:ios
# Build in Xcode
```

### **Android (Now Working):**
```bash
npm run build
npm run build:cap
npm run cap:sync:android    # Runs fix-android-sqlite-path.mjs + inject-cap-plugins.mjs
npm run cap:open:android
# Build in Android Studio
```

---

## ⚠️ Important: Do NOT Use

**Never run these commands directly:**
```bash
# ❌ WRONG - Doesn't run fix scripts
npx cap sync android
npx cap sync

# ❌ WRONG - Missing patches
npm install --ignore-scripts
```

**Always use:**
```bash
# ✅ CORRECT - Runs all fix scripts
npm run cap:sync:android

# ✅ CORRECT - Applies patches
npm install
```

---

## 🧪 Verification

### **Check SQLite Path:**
```bash
cat android/capacitor.settings.gradle | grep sqlite
# Expected: ../../../node_modules/@capacitor-community/sqlite/android
```

### **Check ProGuard Fix:**
```bash
cat ../../node_modules/@capacitor/app/android/build.gradle | grep proguard
# Expected: proguard-android-optimize.txt
```

### **Test Build:**
```bash
cd android
./gradlew tasks
# Should complete without errors
```

---

## 🛠️ Troubleshooting

### **Issue: Patch not applied**

If you see the ProGuard error again:
```bash
# Re-apply patches
npm run postinstall

# Or manually
npx patch-package
```

### **Issue: SQLite path wrong again**

If you see the SQLite error again:
```bash
# Make sure you used npm run (not npx)
npm run cap:sync:android

# Not:
npx cap sync android  # ❌ This skips the fix!
```

### **Issue: Build fails with other errors**

Try cleaning:
```bash
cd android
./gradlew clean
cd ..
npm run cap:sync:android
```

---

## 📊 What Changed in Your Setup

### **Before (Broken):**
```bash
npx cap sync android
# ❌ SQLite path wrong
# ❌ ProGuard error
# ❌ Build fails
```

### **After (Fixed):**
```bash
npm run cap:sync:android
# ✅ SQLite path fixed automatically
# ✅ ProGuard patched
# ✅ Build succeeds
```

---

## 🎯 Summary

**Two fixes implemented:**
1. ✅ **SQLite path fix** - Auto-corrects hoisted dependency path
2. ✅ **ProGuard patch** - Updates deprecated API call

**How they work:**
1. `cap:sync:android` script runs both fixes automatically
2. `patch-package` applies ProGuard fix on `npm install`
3. Zero manual intervention needed

**Status:** ✅ Android build fully working!

---

## 📚 Related Documentation

- `ANDROID_SQLITE_FIX.md` - Detailed SQLite path fix explanation
- `NGINX_UPDATE_GUIDE.md` - Production nginx configuration
- `IOS_PRODUCTION_CHECKLIST.md` - iOS deployment guide

---

**Last Updated:** 2026-02-13
**Tested With:** Capacitor 8, Android Gradle Plugin 9.1.0, @capacitor/app@8.0.0
**Status:** ✅ All issues resolved, ready for production build
