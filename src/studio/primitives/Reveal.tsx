import * as React from "react"
import { motion, useReducedMotion } from "motion/react"

import { motionById } from "../presets"
import { useStudio } from "../studio-context"

type RevealProps = React.ComponentProps<typeof motion.div> & {
  /** Stagger this element's reveal (seconds). */
  delay?: number
}

/**
 * Drop-in wrapper that fades + slides its children in as they scroll into view,
 * using the motion personality chosen in Setup Studio. Honors the user's
 * "reveal on scroll" toggle and the OS "reduce motion" setting automatically.
 *
 *   <Reveal><Card>…</Card></Reveal>
 */
export function Reveal({ delay = 0, children, ...props }: RevealProps) {
  const { config } = useStudio()
  const reduceMotion = useReducedMotion()
  const m = motionById(config.motion)

  const animate = config.revealOnScroll && config.motion !== "none" && !reduceMotion

  if (!animate) return <motion.div {...props}>{children}</motion.div>

  return (
    <motion.div
      initial={{ opacity: 0, y: m.distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: m.duration / 1000, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
