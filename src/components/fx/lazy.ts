import { lazy } from "react"

/**
 * Code-split entry points for the heavy WebGL effects. Each dynamic import puts
 * three.js / @react-three/fiber in its own chunk, so apps that don't use 3D pay
 * nothing. Render these inside a <Suspense fallback={...}> boundary.
 *
 *   import { Suspense } from "react"
 *   import { ShaderGradientBackground } from "@/components/fx/lazy"
 *
 *   <Suspense fallback={null}>
 *     <ShaderGradientBackground />
 *   </Suspense>
 */
export const ShaderGradientBackground = lazy(
  () => import("./ShaderGradientBackground")
)
export const LiquidMetal = lazy(() => import("./LiquidMetal"))
