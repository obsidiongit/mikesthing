#!/bin/bash
# Run this once from the devmike folder to set up git and push to GitHub.
# Usage:
#   chmod +x push-to-github.sh
#   ./push-to-github.sh

set -e

echo "→ Initializing git repo..."
git init
git checkout -b main

echo "→ Staging files..."
git add devmike.html
git rm --cached push-to-github.sh 2>/dev/null || true  # don't commit this script

echo "→ Committing..."
git commit -m "Add 7 features + PIN change: due dates, drag-to-reorder, quick-add (N), search (/), age badges, export/import JSON, daily progress bar, completed tasks section"

echo "→ Adding remote..."
git remote add origin https://github.com/obsidiongit/devmike.git

echo "→ Pushing to GitHub..."
git push -u origin main

echo "✓ Done! Your repo is live at https://github.com/obsidiongit/devmike"
