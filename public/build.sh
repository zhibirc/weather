#!/usr/bin/env sh
#--------------------------
# Simple handmade bundler.
#--------------------------

# prepare target directory
[ -d dist ] && rm -rf dist
mkdir dist

# minify sources
yes | npx minify src/index.html > dist/index.html
yes | npx minify src/main.css > dist/main.css

# bundle CSS with HTML in a single file
sed -i '' -e "s|<link rel=stylesheet href=./main.css>|<style>$(cat dist/main.css)</style>|" dist/index.html
# the point of the below is preserve workable state or, if bundling is successful, reduce "dist" directory size
# shellcheck disable=SC2181
[ $? -eq 0 ] && rm dist/main.css

# report and exit
printf %s\\n "Build success" && exit 0
