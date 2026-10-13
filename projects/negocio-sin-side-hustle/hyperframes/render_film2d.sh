#!/bin/bash
cd "$(dirname "$0")"
mkdir -p ../renders/parts
for p in f1 f2; do
  if [ -s ../renders/parts/$p.mp4 ]; then echo "$p exists, skipping"; continue; fi
  echo "START $p $(date +%T)"
  (cd $p && npx hyperframes render . --output ../../renders/parts/$p.mp4 --workers 1 --fps 30 2>&1 | tail -3)
  if [ ! -s ../renders/parts/$p.mp4 ]; then echo "FAILED $p"; exit 1; fi
  echo "DONE $p $(date +%T)"
done
echo ALL_PARTS_DONE
