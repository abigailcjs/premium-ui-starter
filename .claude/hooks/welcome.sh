#!/bin/sh
# Runs on every Claude Code session start. Tells Claude the project's build mode
# so guided-vs-auto behavior persists across all future builds, and points new
# users at the way in. Output is added to Claude's context.

prefs=".claude/build-preferences.json"
mode="guided"
if [ -f "$prefs" ] && grep -q '"mode"[[:space:]]*:[[:space:]]*"auto"' "$prefs"; then
  mode="auto"
fi

echo "👋 premium-ui-starter — a guided starter for building UI (great for new coders)."
echo

if [ "$mode" = "auto" ]; then
  echo "Build mode: AUTO. When the user wants to build/design/extend the app, use the"
  echo "guided-build skill but pick sensible defaults and move fast, pausing only at"
  echo "high-impact decisions. The user can say \"switch to guided\" to change this."
else
  echo "Build mode: GUIDED. When the user wants to build/design/extend the app, use the"
  echo "guided-build skill: at EACH decision, propose 2-4 concrete options with quick"
  echo "trade-offs (mark a recommended one) and wait for their pick before building."
  echo "The user can say \"switch to auto\" to change this (update $prefs)."
fi

echo
echo "Ways in: /build (guided walkthrough) · /setup (just look & feel) · /new-coder"
echo "(gentle orientation). The build mode lives in $prefs."
