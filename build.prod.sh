#!/bin/sh
rm -f dist_prod/*
yarn prod-build
JS_FILE=`ls dist_prod/app.*.js | sed 's|dist_prod/||'`
CSS_FILE=`ls dist_prod/app.*.css | sed 's|dist_prod/||'`
sed -e "s|__JS_FILENAME__|$JS_FILE|" -e "s|__CSS_FILENAME__|$CSS_FILE|" src/index.html > dist_prod/index.html
scp -P 20022 dist_prod/* apps@54.92.64.233:matome_channel/shared/frontend/.
