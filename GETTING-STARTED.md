# Getting started (for new coders) 👋

Welcome! This is a **starter pack** for building good‑looking web apps — and it
comes with a built‑in coach so you're never on your own.

## The easiest way: let Claude walk you through it

Open this repo in **Claude Code** and just say:

> "Help me build something."  *(or type `/build`)*

Claude runs the **guided‑build** coach. Instead of deciding everything for you, it
**offers a few options at each step and lets you pick** — what to build, how the
pages are laid out, the fonts and colors, the components, the words, the motion.
You choose, Claude does the typing, and you see it come together one step at a time.

### You're in control of how much it asks

There are two modes (you can switch anytime by saying *"switch to guided/auto"*):

| Mode | What happens |
|---|---|
| **Guided** (default) | Claude proposes a few options at **every** step and waits for your pick. Best for learning. |
| **Auto** | Claude picks sensible defaults and moves fast, only checking with you on the big stuff. |

This preference is remembered for **all future builds** — it lives in
`.claude/build-preferences.json`.

## Want to see it in a browser too?

You can also run the app and design the look visually:

```bash
npm install      # downloads the building blocks — once
npm run dev      # starts your app
```

Open the link it prints (usually **http://localhost:5173**). The **Setup Studio**
pops up so you can pick fonts, color, corners and motion by clicking — previewed
live. (Reopen it anytime from the ✨ wand button, bottom‑right.)

## Handy commands in Claude Code

- `/build` — start the guided, options‑at‑each‑step walkthrough.
- `/setup` — jump straight to choosing the look & feel (fonts, color, corners, motion).
- `/new-coder` — a gentle, no‑jargon orientation if this is all brand new.

## Where things live

```
.claude/
  skills/guided-build/   ← the build coach (proposes options, you pick)
  build-preferences.json ← guided vs auto, remembered across builds
  commands/              ← /build, /setup, /new-coder
src/
  App.tsx                ← the page you edit
  components/ui/          ← prebuilt pieces (buttons, cards, inputs)
  studio/                 ← the visual Setup Studio + <Reveal> motion
```

Have fun building. There's no wrong way to start — and you'll always get to choose. 💛
