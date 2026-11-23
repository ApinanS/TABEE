#!/bin/sh
# Rebuild studio/engine.js from the Auto Check engine inside PEV Studio (run from the repo root).
# Check the line ranges still match if pevstudio/js/app.js was restructured.
A=pevstudio/js/app.js
{ sed -n '1,5p' studio/engine.js; sed -n '22p;27p' $A
  sed -n '398,479p' $A | sed 's/^const MAJOR=1500;/const MAJOR=self.TRACK_MAJOR||1500;/'
  sed -n '511,521p' $A; } > studio/engine.tmp && mv studio/engine.tmp studio/engine.js
