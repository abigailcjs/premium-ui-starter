// Shared types for Setup Studio — the beginner-friendly UI decision walkthrough.
// Kept dependency-free so it can be imported from both the browser and the
// Vite dev plugin (Node) without pulling in React or DOM types.

export type FontPresetId = "geist-inter" | "inter" | "editorial" | "grotesk" | "system"
export type ColorPresetId = "neutral" | "indigo" | "violet" | "emerald" | "rose" | "amber" | "sky"
export type Mode = "light" | "dark"
export type Density = "compact" | "cozy" | "comfortable"
export type MotionFeel = "none" | "subtle" | "playful"

export interface StudioConfig {
  /** Heading + body font pairing. */
  font: FontPresetId
  /** Accent color used for buttons, links, focus rings. */
  color: ColorPresetId
  /** Default light or dark appearance. */
  mode: Mode
  /** Corner roundness in rem (0 = sharp, ~1.25 = very round). */
  radius: number
  /** How tight or airy spacing feels. */
  density: Density
  /** Overall animation personality. */
  motion: MotionFeel
  /** Fade/slide elements in as they scroll into view. */
  revealOnScroll: boolean
  /** Smoothly animate jump-to-anchor scrolling. */
  smoothScroll: boolean
}

export const defaultConfig: StudioConfig = {
  font: "geist-inter",
  color: "neutral",
  mode: "light",
  radius: 0.625,
  density: "cozy",
  motion: "subtle",
  revealOnScroll: true,
  smoothScroll: true,
}
