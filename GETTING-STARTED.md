# Getting started (for new coders) 👋

Welcome! This is a **starter pack** — a ready-made project for building good‑looking
web apps. You don't need to know much to begin. The big idea: you make the
look‑and‑feel decisions by **clicking**, and the project wires them up for you.

## 1. Run it (two commands)

Open a terminal in this folder and type these, one at a time:

```bash
npm install      # downloads the building blocks — only needed once
npm run dev      # starts your app
```

Then open the link it prints (usually **http://localhost:5173**) in your browser.

## 2. Design your UI in Setup Studio ✨

The first time you open the app, a friendly walkthrough called **Setup Studio**
pops up. (You can reopen it anytime with the **✨ wand button** in the bottom‑right
corner.) It walks you through the decisions every builder has to make:

| Step | What you choose |
|---|---|
| **Fonts** | The personality of your text (headings + body). |
| **Color** | An accent color, plus light or dark. |
| **Corners & spacing** | Sharp or round corners, tight or airy spacing. |
| **Motion & scroll** | How lively animations feel, reveal‑on‑scroll, smooth scroll. |

Every change previews **live** as you click. When you're happy, press **Save my
choices** and it writes them into the project for you. That's it — you designed
your app's look without touching code.

> Want it to greet you every time instead of just the first time? There's a
> checkbox for that on the last step.

## 3. Prefer to decide in chat?

If you're using **Claude Code**, you can run these instead of clicking:

- `/setup` — Claude walks you through the same choices and applies them.
- `/new-coder` — a gentle, no‑jargon orientation if this is all new.

## 4. Make your first change

Open `src/App.tsx` and change the big heading text to anything you like. Save the
file and watch the browser update instantly. 🎉 You just edited an app.

## Where things live

```
src/
  App.tsx            ← the page you edit
  components/ui/     ← prebuilt pieces (buttons, cards, inputs)
  studio/            ← powers the Setup Studio walkthrough
  styles/
    theme.generated.css   ← your saved choices, as CSS (auto‑written)
  studio/studio.config.json ← your saved choices, as data (auto‑written)
```

You never have to edit the two "saved choices" files by hand — Setup Studio (or
`/setup`) keeps them in sync. But you *can* peek to see what your clicks produced.

Have fun building. There's no wrong way to start. 💛
