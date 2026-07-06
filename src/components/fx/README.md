# fx — visual effect components

Audited add-ons to the premium-ui stack. Three were installed from npm; two were
"extracted safe element" vendors because the upstream repos had blockers.

| Component | Source | License | Notes |
|---|---|---|---|
| `ShaderGradientBackground` | `@shadergradient/react` (upstream npm) | MIT | Animated WebGL gradient. Heavy (three.js). Lazy-import. |
| `LiquidMetal` | **Original GLSL** on `@react-three/fiber` | MIT (ours) | Flowing metal effect. **Not** copied from paper-design/liquid-logo. |
| `LiquidGlass` | Technique from `rdev/liquid-glass-react`, rewritten | MIT | Apple-glass surface. No deps. Chromium-refraction + blur fallback. |

## Why the two vendors instead of the npm packages

- **paper-design/liquid-logo** ships under **PolyForm Shield** — a non-permissive,
  noncompete, source-available license. Copying its shader source into this
  redistributable starter would inherit that license. `LiquidMetal` is original
  code that recreates the *effect* with a clean MIT license. If you ever want the
  exact paper-design look on a first-party (non-redistributed) app, you may
  `npm i @paper-design/shaders-react` — but mind the PolyForm noncompete clause.
- **rdev/liquid-glass-react** is MIT but unmaintained (~12 months stale) and the
  refraction is Chromium-only. We vendored a trimmed, self-contained version
  (`LiquidGlass.tsx`) with an automatic blur fallback rather than depend on a
  dead package.

## Usage

```tsx
// Light — import directly, no three.js cost:
import { LiquidGlass } from "@/components/fx"

// Heavy (three.js) — lazy + Suspense keeps it out of the main bundle:
import { Suspense } from "react"
import { ShaderGradientBackground, LiquidMetal } from "@/components/fx/lazy"

<Suspense fallback={null}>
  <ShaderGradientBackground colors={["#0b1020", "#7c3aed", "#1e1b4b"]} />
</Suspense>
```

## Also installed

`@react-spring/three` (MIT) is installed for spring-physics animation of R3F
scenes (meshes, cameras). It is **not** used for DOM animation — the stack
already uses `motion` (Framer) for that. Reach for it only inside a `<Canvas>`,
e.g. `useSpring`/`animated` from `@react-spring/three` to animate a mesh.
