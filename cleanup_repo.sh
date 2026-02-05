#!/bin/bash

# cleanup_repo.sh
# This script removes build artifacts from git tracking and updates .gitignore

echo "🧹 Starting repository cleanup..."

# 1. Update .gitignore
echo "📝 Updating .gitignore..."

if [ ! -f .gitignore ]; then
    touch .gitignore
fi

# Function to add to gitignore if not present
add_to_gitignore() {
    local pattern="$1"
    if ! grep -qF "$pattern" .gitignore; then
        echo "$pattern" >> .gitignore
        echo "   + Added $pattern to .gitignore"
    else
        echo "   = $pattern already in .gitignore"
    fi
}

add_to_gitignore ".vite/"
add_to_gitignore ".next/"
add_to_gitignore "marketing/.next/"
add_to_gitignore "out/"
add_to_gitignore "build/"
add_to_gitignore "dist/"
add_to_gitignore "node_modules/"
add_to_gitignore ".DS_Store"

# 2. Remove files from git index (keep local files)
echo "🗑️  Removing ignored files from git index (this may take a moment)..."

# Use --ignore-unmatch to avoid errors if files aren't tracked
git rm -r --cached .vite 2>/dev/null || echo "   .vite not tracked or already removed"
git rm -r --cached marketing/.next 2>/dev/null || echo "   marketing/.next not tracked or already removed"
# Check for other common offenders just in case
git rm -r --cached node_modules 2>/dev/null || true
git rm -r --cached marketing/node_modules 2>/dev/null || true

# 3. Commit changes
echo "💾 Committing changes..."
git add .gitignore
git commit -m "chore: remove build artifacts and update .gitignore" || echo "   Nothing to commit"

echo "✅ Done! Please run 'git push' to update the remote repository."
echo "   Note: This removes the files from GitHub but keeps them on your computer."
