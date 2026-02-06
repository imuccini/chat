#!/bin/bash
set -e

# build_cap.sh
# Robust build script for Capacitor that temporarily hides incompatible directories.

echo "🏗️  Starting Capacitor Build..."

# Function to restore directories on exit (success or failure)
cleanup() {
    echo "🧹 Restoring directories..."
    if [ -d "app/_admin" ]; then
        mv app/_admin app/admin
        echo "   - Restored app/admin"
    fi
    if [ -d "app/_api" ]; then
        mv app/_api app/api
        echo "   - Restored app/api"
    fi
}

# Register the cleanup function to run on EXIT (covers success, error, or interrupt)
trap cleanup EXIT

# 1. Temporarily move directories that break static export
echo "📂 Hiding dynamic routes..."
if [ -d "app/admin" ]; then
    mv app/admin app/_admin
    echo "   + Moved app/admin -> app/_admin"
fi
if [ -d "app/api" ]; then
    mv app/api app/_api
    echo "   + Moved app/api -> app/_api"
fi

# 2. Run the build
echo "🚀 Running Next.js Build..."
# Load env vars but ignore comments, then run build
# The .env is in the root of the monorepo
export $(grep -v '^#' ../../.env | xargs)
export NEXT_STATIC_EXPORT=true 

if next build; then
    echo "✅ Build Successful!"
else
    echo "❌ Build Failed!"
    exit 1
fi
