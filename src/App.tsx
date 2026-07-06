import { lazy, Suspense } from "react"
import { motion } from "motion/react"
import { MousePointerClick, Orbit } from "lucide-react"

import { LiquidGlass } from "@/components/fx"

const HeroScene = lazy(() => import("@/components/three/HeroScene"))

function App() {
  return (
    <div className="dark relative isolate min-h-svh overflow-hidden bg-[#0b1020] text-foreground">
      {/* Full-bleed interactive 3D scene — lazy so three.js stays code-split. */}
      <div className="absolute inset-0">
        <Suspense
          fallback={
            <div className="grid min-h-svh place-items-center text-sm text-white/50">
              Loading scene…
            </div>
          }
        >
          <HeroScene />
        </Suspense>
      </div>

      {/* Caption overlay */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
        >
          <LiquidGlass radius={16} className="pointer-events-auto px-4 py-2.5">
            <div className="flex items-center gap-4 text-sm text-white/85">
              <span className="flex items-center gap-1.5">
                <Orbit className="size-4 text-violet-300" />
                Drag to orbit
              </span>
              <span className="h-3.5 w-px bg-white/20" />
              <span className="flex items-center gap-1.5">
                <MousePointerClick className="size-4 text-violet-300" />
                Click the knot to morph
              </span>
            </div>
          </LiquidGlass>
        </motion.div>
      </div>
    </div>
  )
}

export default App
