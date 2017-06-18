#!/bin/sh
yarn prod-build
scp -P 20022 dist/* apps@54.92.64.233:matome_channel/shared/frontend/.
