// Light, dependency-free effects (safe to import anywhere — no three.js).
export { LiquidGlass } from "./LiquidGlass"
export type { LiquidGlassProps } from "./LiquidGlass"

// Heavy WebGL effects (three.js / @react-three/fiber) are intentionally NOT
// re-exported here so this barrel never drags three.js into a bundle. Import
// them lazily from "@/components/fx/lazy" instead.
export type { ShaderGradientBackgroundProps } from "./ShaderGradientBackground"
export type { LiquidMetalProps } from "./LiquidMetal"
