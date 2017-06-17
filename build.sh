#!/bin/sh
yarn prod-build
scp -P 20022 dist/app.* apps@54.92.64.233:matome_channel/shared/frontend/.
