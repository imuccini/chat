# Android Studio "Module not specified" Error - Fix Guide

## 🐛 The Problem

When opening the Android project, you get:
```
Error: Module not specified
```

This prevents you from running/building the app.

---

## ✅ Solution: Clear Caches & Reimport

### **Method 1: Automated Script (Easiest)**

```bash
cd apps/web
bash scripts/open-android-clean.sh
```

This script:
1. Clears Android Studio caches (`.idea`, `.gradle`)
2. Stops Gradle daemon
3. Opens Android Studio cleanly

---

### **Method 2: Manual Steps**

#### **Step 1: Close Android Studio**
- Close Android Studio completely (Cmd+Q)

#### **Step 2: Clear Caches**
```bash
cd apps/web
rm -rf android/.idea
rm -rf android/.gradle
```

#### **Step 3: Stop Gradle Daemon**
```bash
cd android
./gradlew --stop
cd ..
```

#### **Step 4: Open Clean**
```bash
npm run cap:open:android
```

#### **Step 5: Wait for Indexing**
- Android Studio will re-index the project
- Wait until "Indexing..." in bottom right corner finishes
- This may take 2-5 minutes

---

### **Method 3: In Android Studio (If Already Open)**

1. **File → Invalidate Caches...**
2. Check: "Invalidate and Restart"
3. Click "Invalidate and Restart"
4. Wait for Android Studio to reopen and re-index

---

## 🎯 After Opening: Configure Run Configuration

If you still see "Module not specified" after Android Studio opens:

### **Step 1: Edit Run Configuration**
1. Click the dropdown next to the ▶️ Run button (top toolbar)
2. Select "Edit Configurations..."

### **Step 2: Fix Module**
If you see a configuration (usually called "app"):
1. Select it
2. In "Module" dropdown, select **app**
3. Click "Apply" → "OK"

If no configuration exists:
1. Click "+" (top left)
2. Select "Android App"
3. Name: `app`
4. Module: Select **app**
5. Click "Apply" → "OK"

---

## 🔍 Verify Project Structure

Your project should have this structure:

```
apps/web/android/
├── app/                    # ✅ Main module
│   ├── build.gradle
│   └── src/
├── build.gradle            # ✅ Root build file
├── settings.gradle         # ✅ Includes :app
└── capacitor.settings.gradle
```

**Check if `:app` module is included:**
```bash
cat android/settings.gradle
```

**Expected output:**
```gradle
include ':app'
```

---

## 🚨 Common Causes

### **Cause 1: Stale IDE Cache**
- **Symptom**: Android Studio doesn't recognize modules
- **Fix**: Clear `.idea` and `.gradle` folders

### **Cause 2: Gradle Sync Failed**
- **Symptom**: Yellow/red bars at top of IDE
- **Fix**: Click "Sync Project with Gradle Files" button (elephant icon in toolbar)

### **Cause 3: Wrong Project Opened**
- **Symptom**: Android Studio opened wrong directory
- **Fix**: Ensure you're opening `apps/web/android/` (not `apps/web/`)

### **Cause 4: Corrupted Gradle Cache**
- **Symptom**: Gradle sync keeps failing
- **Fix**:
  ```bash
  cd android
  ./gradlew clean
  ./gradlew --stop
  rm -rf ~/.gradle/caches
  ```

---

## 🧪 Verification Steps

After Android Studio opens and finishes indexing:

### **1. Check Module Appears**
- Bottom left: Click "Project" tab
- You should see: `app` module in the tree

### **2. Check Run Configuration**
- Top toolbar: Dropdown should show "app" (not empty)

### **3. Try Building**
- Click: Build → Make Project (Cmd+F9)
- Should complete without "module not specified" error

### **4. Check Gradle Sync**
- File → Sync Project with Gradle Files
- Should complete successfully (green checkmark)

---

## 🛠️ Advanced Troubleshooting

### **Issue: Gradle Sync Fails**

**Check Gradle wrapper:**
```bash
cd android
cat gradle/wrapper/gradle-wrapper.properties
```

**Expected:**
```properties
distributionUrl=https\://services.gradle.org/distributions/gradle-9.1.0-bin.zip
```

**If wrong version:**
```bash
cd android
./gradlew wrapper --gradle-version=9.1.0
```

---

### **Issue: "SDK location not found"**

**Check `local.properties`:**
```bash
cat android/local.properties
```

**Should contain:**
```properties
sdk.dir=/Users/yourusername/Library/Android/sdk
```

**If missing or wrong:**
```bash
echo "sdk.dir=$HOME/Library/Android/sdk" > android/local.properties
```

---

### **Issue: "Plugin with id 'com.android.application' not found"**

**Check `app/build.gradle` first line:**
```bash
head -5 android/app/build.gradle
```

**Should be:**
```gradle
apply plugin: 'com.android.application'
```

**If missing, your `build.gradle` is corrupted. Re-sync:**
```bash
npm run cap:sync:android
```

---

## 📊 What NOT to Do

### **❌ Don't manually edit `.idea/` files**
- Android Studio regenerates these
- Manual edits will be overwritten

### **❌ Don't delete `app/` module**
- This is your main module
- Deleting it breaks the project

### **❌ Don't open the wrong directory**
- Open: `apps/web/android/` ✅
- Not: `apps/web/` ❌
- Not: `chat/` ❌

---

## 🎯 Quick Reference

| Problem | Solution |
|---------|----------|
| Module not specified | Clear caches, reopen Android Studio |
| Gradle sync failed | Click "Sync Project with Gradle Files" |
| No run configuration | Create new Android App configuration |
| Wrong module shown | Edit configuration, select **app** module |
| Project won't build | File → Invalidate Caches → Restart |

---

## 🚀 Correct Opening Workflow

**Every time you open Android Studio:**

```bash
# From apps/web directory
npm run cap:open:android

# OR use the clean script
bash scripts/open-android-clean.sh
```

**Never:**
```bash
# ❌ Wrong - Opens from wrong directory
cd android
open -a "Android Studio" .

# ❌ Wrong - Skips Capacitor setup
open -a "Android Studio" apps/web/android
```

---

## ✅ Success Criteria

After following this guide, you should:
- [ ] Android Studio opens without errors
- [ ] "app" module appears in Project tree
- [ ] Run configuration shows "app" in dropdown
- [ ] Gradle sync completes successfully
- [ ] Build → Make Project works (Cmd+F9)
- [ ] No "Module not specified" errors

---

## 📞 Still Not Working?

If you still see the error after trying all methods:

1. **Check Capacitor version:**
   ```bash
   npx cap --version
   ```

2. **Re-sync completely:**
   ```bash
   rm -rf android
   npm run cap:sync:android
   ```

3. **Check Android Studio version:**
   - Help → About Android Studio
   - Should be: Android Studio Ladybug | 2024.2.1 or newer

4. **Restart computer** (sometimes Gradle daemon gets stuck)

---

**Last Updated:** 2026-02-13
**Tested With:** Android Studio Ladybug 2024.2.1, Capacitor 8, Gradle 9.1.0
**Status:** ✅ Verified fix
