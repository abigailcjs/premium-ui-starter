import * as React from "react"

import { cn } from "@/lib/utils"

export interface LiquidGlassProps extends React.ComponentProps<"div"> {
  /** Refraction strength of the glass distortion (Chromium only). Default 6. */
  displace?: number
  /** Backdrop blur radius in px (the cross-browser fallback). Default 3. */
  blur?: number
  /** Corner radius in px. Default 24. */
  radius?: number
}

/**
 * LiquidGlass — Apple-style translucent "liquid glass" surface.
 *
 * Provenance: technique extracted and rewritten from rdev/liquid-glass-react
 * (MIT). The original package is unmaintained and Chromium-only, so we vendor a
 * trimmed, self-contained version here instead of depending on it. An SVG
 * feTurbulence → feDisplacementMap drives a refractive `backdrop-filter`; the
 * displacement is a CHROMIUM-ONLY progressive enhancement. Safari/Firefox (no
 * SVG-backed backdrop-filter support) fall back to a clean blur automatically.
 *
 * Put readable content inside; the surface is decorative chrome.
 */
export function LiquidGlass({
  className,
  children,
  displace = 6,
  blur = 3,
  radius = 24,
  style,
  ...props
}: LiquidGlassProps) {
  // useId() can contain ":" which is invalid in a CSS url(#id) reference.
  const filterId = `liquid-glass-${React.useId().replace(/:/g, "")}`
  const [refractive, setRefractive] = React.useState(false)

  React.useEffect(() => {
    const ua = navigator.userAgent
    const isChromium = /Chrome|Chromium|Edg/.test(ua) && !/Firefox/.test(ua)
    const canBackdrop =
      typeof CSS !== "undefined" &&
      (CSS.supports("backdrop-filter", "blur(1px)") ||
        CSS.supports("-webkit-backdrop-filter", "blur(1px)"))
    setRefractive(isChromium && canBackdrop)
  }, [])

  return (
    <div
      data-slot="liquid-glass"
      className={cn(
        "relative isolate overflow-hidden border border-white/20 bg-white/10 shadow-lg shadow-black/10",
        "dark:border-white/10 dark:bg-white/5",
        className
      )}
      style={{
        borderRadius: radius,
        backdropFilter: refractive
          ? `url(#${filterId}) blur(${blur}px)`
          : `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        ...style,
      }}
      {...props}
    >
      {refractive && (
        <svg aria-hidden className="pointer-events-none absolute size-0">
          <filter
            id={filterId}
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.008 0.008"
              numOctaves={2}
              seed={7}
              result="noise"
            />
            <feGaussianBlur in="noise" stdDeviation={2} result="blurred" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="blurred"
              scale={displace}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </svg>
      )}
      {children}
    </div>
  )
}
