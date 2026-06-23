// Curated, plain-English presets for each decision in the Setup Studio.
// Pure data only (no DOM / React) so the Vite plugin can import it too.

import type {
  ColorPresetId,
  Density,
  FontPresetId,
  MotionFeel,
} from "./types"

export interface FontPreset {
  id: FontPresetId
  name: string
  blurb: string
  /** CSS font-family stack for headings. */
  heading: string
  /** CSS font-family stack for body text. */
  body: string
  /** Google Fonts stylesheet to load on demand (omit for installed/system fonts). */
  googleHref?: string
}

export const fontPresets: FontPreset[] = [
  {
    id: "geist-inter",
    name: "Geist + Inter",
    blurb: "Clean, modern, slightly technical. The default.",
    heading: "'Geist Variable', system-ui, sans-serif",
    body: "'Inter Variable', system-ui, sans-serif",
  },
  {
    id: "inter",
    name: "Inter only",
    blurb: "One friendly typeface everywhere. Calm and consistent.",
    heading: "'Inter Variable', system-ui, sans-serif",
    body: "'Inter Variable', system-ui, sans-serif",
  },
  {
    id: "editorial",
    name: "Playfair + Inter",
    blurb: "Elegant serif headlines over clean body text. Magazine feel.",
    heading: "'Playfair Display', Georgia, serif",
    body: "'Inter Variable', system-ui, sans-serif",
    googleHref:
      "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&display=swap",
  },
  {
    id: "grotesk",
    name: "Space Grotesk + Inter",
    blurb: "Geometric, playful headings. Great for products and startups.",
    heading: "'Space Grotesk', system-ui, sans-serif",
    body: "'Inter Variable', system-ui, sans-serif",
    googleHref:
      "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&display=swap",
  },
  {
    id: "system",
    name: "System native",
    blurb: "Uses the visitor's OS font. Fastest, zero downloads.",
    heading:
      "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    body:
      "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  },
]

export interface ColorPreset {
  id: ColorPresetId
  name: string
  blurb: string
  /** Swatch shown in the picker (any CSS color). */
  swatch: string
  light: { primary: string; primaryForeground: string; ring: string }
  dark: { primary: string; primaryForeground: string; ring: string }
}

const WHITE = "oklch(0.985 0 0)"
const INK = "oklch(0.205 0 0)"

export const colorPresets: ColorPreset[] = [
  {
    id: "neutral",
    name: "Neutral",
    blurb: "Timeless grayscale. Lets your content lead.",
    swatch: "oklch(0.3 0 0)",
    light: { primary: INK, primaryForeground: WHITE, ring: "oklch(0.708 0 0)" },
    dark: { primary: "oklch(0.922 0 0)", primaryForeground: INK, ring: "oklch(0.556 0 0)" },
  },
  {
    id: "indigo",
    name: "Indigo",
    blurb: "Trustworthy, classic SaaS blue-violet.",
    swatch: "oklch(0.51 0.23 277)",
    light: { primary: "oklch(0.51 0.23 277)", primaryForeground: WHITE, ring: "oklch(0.51 0.23 277)" },
    dark: { primary: "oklch(0.64 0.19 277)", primaryForeground: WHITE, ring: "oklch(0.64 0.19 277)" },
  },
  {
    id: "violet",
    name: "Violet",
    blurb: "Creative and bold. Good for launches.",
    swatch: "oklch(0.54 0.25 300)",
    light: { primary: "oklch(0.54 0.25 300)", primaryForeground: WHITE, ring: "oklch(0.54 0.25 300)" },
    dark: { primary: "oklch(0.66 0.21 300)", primaryForeground: WHITE, ring: "oklch(0.66 0.21 300)" },
  },
  {
    id: "emerald",
    name: "Emerald",
    blurb: "Fresh, calm, growth. Fintech and health.",
    swatch: "oklch(0.6 0.13 163)",
    light: { primary: "oklch(0.6 0.13 163)", primaryForeground: WHITE, ring: "oklch(0.6 0.13 163)" },
    dark: { primary: "oklch(0.72 0.14 163)", primaryForeground: INK, ring: "oklch(0.72 0.14 163)" },
  },
  {
    id: "rose",
    name: "Rose",
    blurb: "Warm and human. Consumer and lifestyle.",
    swatch: "oklch(0.59 0.22 12)",
    light: { primary: "oklch(0.59 0.22 12)", primaryForeground: WHITE, ring: "oklch(0.59 0.22 12)" },
    dark: { primary: "oklch(0.69 0.19 12)", primaryForeground: WHITE, ring: "oklch(0.69 0.19 12)" },
  },
  {
    id: "amber",
    name: "Amber",
    blurb: "Energetic and friendly. Great for CTAs.",
    swatch: "oklch(0.74 0.16 75)",
    light: { primary: "oklch(0.74 0.16 75)", primaryForeground: INK, ring: "oklch(0.74 0.16 75)" },
    dark: { primary: "oklch(0.81 0.15 75)", primaryForeground: INK, ring: "oklch(0.81 0.15 75)" },
  },
  {
    id: "sky",
    name: "Sky",
    blurb: "Light, open, approachable blue.",
    swatch: "oklch(0.6 0.13 235)",
    light: { primary: "oklch(0.6 0.13 235)", primaryForeground: WHITE, ring: "oklch(0.6 0.13 235)" },
    dark: { primary: "oklch(0.72 0.13 235)", primaryForeground: INK, ring: "oklch(0.72 0.13 235)" },
  },
]

export interface DensityPreset {
  id: Density
  name: string
  blurb: string
  /** Base spacing unit in rem (Tailwind's --spacing). */
  spacing: number
}

export const densityPresets: DensityPreset[] = [
  { id: "compact", name: "Compact", blurb: "Tighter. Fits more on screen.", spacing: 0.22 },
  { id: "cozy", name: "Cozy", blurb: "Balanced. A safe default.", spacing: 0.25 },
  { id: "comfortable", name: "Comfortable", blurb: "Airy. Relaxed and premium.", spacing: 0.29 },
]

export interface MotionPreset {
  id: MotionFeel
  name: string
  blurb: string
  /** Transition/animation duration in ms. */
  duration: number
  /** How far elements travel when revealing, in px. */
  distance: number
  /** CSS easing. */
  ease: string
}

export const motionPresets: MotionPreset[] = [
  { id: "none", name: "None", blurb: "No animation. Instant and accessible.", duration: 0, distance: 0, ease: "linear" },
  { id: "subtle", name: "Subtle", blurb: "Gentle fades and slides. Tasteful.", duration: 350, distance: 16, ease: "cubic-bezier(0.22, 1, 0.36, 1)" },
  { id: "playful", name: "Playful", blurb: "Bigger, bouncier movement. Lively.", duration: 600, distance: 28, ease: "cubic-bezier(0.34, 1.56, 0.64, 1)" },
]

// Convenience lookups -------------------------------------------------------

export const fontById = (id: FontPresetId) =>
  fontPresets.find((p) => p.id === id) ?? fontPresets[0]
export const colorById = (id: ColorPresetId) =>
  colorPresets.find((p) => p.id === id) ?? colorPresets[0]
export const densityById = (id: Density) =>
  densityPresets.find((p) => p.id === id) ?? densityPresets[1]
export const motionById = (id: MotionFeel) =>
  motionPresets.find((p) => p.id === id) ?? motionPresets[1]
