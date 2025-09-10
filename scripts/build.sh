#!/bin/bash

echo "Building CFO Buddy for GitHub Pages deployment..."

# Ensure we have the latest packages
npm install

# Run the build
npm run build

# Create necessary GitHub Pages files
touch dist/.nojekyll
cp _config.yml dist/

echo "Build completed. You can now run: npm run deploy"
