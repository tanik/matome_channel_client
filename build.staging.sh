#!/bin/sh
yarn prod-build
scp dist/* apps@192.168.33.10:matome_channel/shared/frontend/.
