#!/usr/bin/env bash

# Prepare the author
git config user.email "gordan@neki.ch"
git config user.name "Gordan Nekić"

# Checkout to the feat/code branch where we have all code content.
git checkout feat/code
# Delete main branch locally
git branch -d main
# Create empty branch we can do some painting...
# git switch --orphan main 
# Create new main branch based on the feat/code
git checkout -b main

# Generate git commit commands from JSON template
touch brush
git add brush

#{{GIT_COMMITS}}

# Push the new data to main branch.
git push -u -f origin main
