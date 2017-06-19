#!/bin/sh
rm -f dist_prod/*
yarn staging-build
JS_FILE=`ls dist_prod/app.*.js | sed 's|dist_prod/||'`
CSS_FILE=`ls dist_prod/app.*.css | sed 's|dist_prod/||'`
sed -e "s|__JS_FILENAME__|$JS_FILE|" -e "s|__CSS_FILENAME__|$CSS_FILE|" src/index.html > dist_prod/index.html
scp dist_prod/* apps@192.168.33.10:matome_channel/shared/frontend/.
