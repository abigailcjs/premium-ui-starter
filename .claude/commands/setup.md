---
description: Walk a new coder through their UI build decisions (fonts, color, corners, motion) and apply them to the project.
---

You are running the **Setup Studio** walkthrough for someone who may be brand new
to coding. Your job is to help them make the visual decisions a builder normally
agonizes over — and then wire those decisions into this project for them. Be
warm, plain-spoken, and never assume prior knowledge.

## Two ways to do it — offer both

1. **Visual (recommended for beginners).** Tell them you can open a point-and-click
   studio in their browser:
   - Start the dev server if it isn't running: `npm run dev`
   - Tell them to open http://localhost:5173 and click the **✨ wand button**
     (bottom-right) — or it pops up automatically on first run.
   - They pick fonts, color, corners and motion by clicking, see it live, and hit
     **Save my choices**. That writes the files for them. You're done — no further action.

2. **In chat (if they'd rather decide with you).** Ask them the questions below one
   at a time, in friendly language, showing the options. Then apply their answers
   yourself (see "Applying choices").

## The decisions (and the options)

Read `src/studio/presets.ts` for the exact option ids and what each means. Summary:

- **Fonts** (`font`): `geist-inter` (modern default), `inter` (one calm typeface),
  `editorial` (elegant serif headlines), `grotesk` (geometric/playful), `system` (native, fastest).
- **Color** (`color`): `neutral`, `indigo`, `violet`, `emerald`, `rose`, `amber`, `sky`.
- **Appearance** (`mode`): `light` or `dark`.
- **Corners** (`radius`): a number in rem, `0` (sharp) to `1.5` (very round). `0.625` is the default.
- **Density** (`density`): `compact`, `cozy`, `comfortable`.
- **Motion** (`motion`): `none`, `subtle`, `playful`.
- **Reveal on scroll** (`revealOnScroll`): true/false — fade/slide elements in as they appear.
- **Smooth scroll** (`smoothScroll`): true/false — glide to anchor links.

## Applying choices

The single source of truth for choices is `src/studio/studio.config.json`. The CSS
those choices produce lives in `src/styles/theme.generated.css`, built by the pure
function in `src/studio/generateTheme.ts`.

Prefer the automated path:

- **If `npm run dev` is running**, POST the chosen config to the dev plugin and it
  regenerates both files for you:
  ```bash
  curl -s -X POST http://localhost:5173/__studio/save \
    -H 'Content-Type: application/json' \
    -d '{"font":"grotesk","color":"indigo","mode":"dark","radius":0.75,"density":"cozy","motion":"subtle","revealOnScroll":true,"smoothScroll":true}'
  ```
- **If the server is not running**, edit `src/studio/studio.config.json` to match
  their answers, then regenerate `src/styles/theme.generated.css` by following the
  exact mapping in `generateTheme.ts` + `presets.ts` (it's deterministic — same
  inputs, same CSS). Keep the two files consistent.

After applying, briefly confirm what changed in plain English and tell them they can
reopen the visual studio anytime from the wand button. Suggest `npm run dev` so they
can see it live.
