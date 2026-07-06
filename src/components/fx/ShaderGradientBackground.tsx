import { ShaderGradient, ShaderGradientCanvas } from "@shadergradient/react"

import { cn } from "@/lib/utils"

export interface ShaderGradientBackgroundProps {
  className?: string
  /** Mesh shape driving the gradient. Default "waterPlane". */
  type?: "plane" | "waterPlane" | "sphere"
  /** Three gradient stops. */
  colors?: [string, string, string]
  /** Animation speed (uSpeed). Default 0.4. */
  speed?: number
  /** Set false to render a static frame. Reduced-motion users always get static. */
  animate?: boolean
}

/**
 * ShaderGradientBackground — animated WebGL gradient backdrop.
 *
 * Thin wrapper over @shadergradient/react (upstream npm, MIT). Heavy: pulls in
 * three.js + @react-three/fiber, so import this LAZILY (see fx/lazy.ts) and
 * render it as an absolutely-positioned background layer. It does not consume
 * Tailwind tokens — treat it as a pure visual layer behind your shadcn UI.
 */
export default function ShaderGradientBackground({
  className,
  type = "waterPlane",
  colors = ["#0b1020", "#7c3aed", "#1e1b4b"],
  speed = 0.4,
  animate = true,
}: ShaderGradientBackgroundProps) {
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  const on = animate && !prefersReduced

  return (
    <div
      className={cn("absolute inset-0 -z-10 overflow-hidden", className)}
      aria-hidden
    >
      <ShaderGradientCanvas
        style={{ width: "100%", height: "100%" }}
        pointerEvents="none"
      >
        <ShaderGradient
          control="props"
          type={type}
          color1={colors[0]}
          color2={colors[1]}
          color3={colors[2]}
          animate={on ? "on" : "off"}
          uSpeed={speed}
          uDensity={1.3}
          uStrength={3.4}
          cDistance={2.8}
          cPolarAngle={120}
          cAzimuthAngle={180}
          lightType="3d"
          brightness={1.1}
          envPreset="city"
          grain="off"
          reflection={0.1}
          positionX={0}
          positionY={0}
          positionZ={0}
          rotationX={0}
          rotationY={0}
          rotationZ={0}
        />
      </ShaderGradientCanvas>
    </div>
  )
}
