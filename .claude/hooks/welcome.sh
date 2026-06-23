#!/bin/sh
# Greets a coder when a Claude Code session starts. Shows a full welcome the
# first time (until they've designed their UI), then stays quiet/brief after.
# Output is added to Claude's context, so it nudges Claude to help.

marker=".claude/.setup-complete"

if [ -f "$marker" ]; then
  exit 0
fi

cat <<'EOF'
👋 Welcome to the premium-ui-starter — a starter pack for new coders.

This project has a friendly walkthrough (Setup Studio) that lets the user pick
their app's fonts, color, corner roundness, and motion by clicking — no config.

Good things to offer the user right now:
  • Run `npm install` then `npm run dev`, open http://localhost:5173, and the
    Setup Studio pops up on first launch (or via the ✨ wand, bottom-right).
  • Or run the `/setup` command to walk through the choices together in chat.
  • Brand new to coding? The `/new-coder` command gives a gentle orientation.

Once they've designed their UI, create the file `.claude/.setup-complete` so this
welcome stops showing.
EOF
