#!/bin/bash

# Create the necessary folders for the distribution
# Note: The original script had commands to remove the dist folder; this has been commented out
# Uncomment if you need to clear out the dist folder each time
# rm -rf ./dist
# mkdir ./dist
mkdir ./dist/dist

# Move the built jsts files to the dist/dist directory
mv ./dist/jsts.* ./dist/dist

# Copy necessary source files and directories to the dist folder
cp -r ./src/java ./dist/java
cp -r ./src/org ./dist/org
cp ./src/hasInterface.js ./dist/hasInterface.js

# Copy package metadata and documentation to the dist folder
cp ./package.json ./dist/package.json
cp ./README.md ./dist/README.md

# Remove any .ast files from the dist folder
find ./dist -name '*.ast' -type f -delete

# npm publish
cd ./dist
npm publish --access public
