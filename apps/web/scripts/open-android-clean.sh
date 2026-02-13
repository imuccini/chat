#!/bin/bash
# Clean open Android Studio with fresh cache

echo "🧹 Cleaning Android Studio caches..."
rm -rf android/.idea
rm -rf android/.gradle

echo "🔨 Syncing Gradle..."
cd android
./gradlew --stop
cd ..

echo "🚀 Opening Android Studio..."
npx cap open android

echo "✅ Done! Wait for Android Studio to finish indexing..."
