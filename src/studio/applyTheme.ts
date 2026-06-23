// Browser-only helpers that apply a StudioConfig to the live page and persist
// it. Separated from generateTheme.ts because these touch the DOM and must not
// be imported by the Vite plugin (Node).

import { buildThemeCss } from "./generateTheme"
import { fontById } from "./presets"
import type { StudioConfig } from "./types"

const LIVE_STYLE_ID = "studio-live-theme"
const FONT_LINK_ID = "studio-font-link"

/** Toggle the dark-mode class. */
export function applyMode(mode: StudioConfig["mode"]) {
  document.documentElement.classList.toggle("dark", mode === "dark")
}

/** Load a Google Fonts stylesheet for presets that need one (no-op otherwise). */
export function applyFontLink(config: StudioConfig) {
  const href = fontById(config.font).googleHref
  let link = document.getElementById(FONT_LINK_ID) as HTMLLinkElement | null
  if (!href) {
    link?.remove()
    return
  }
  if (!link) {
    link = document.createElement("link")
    link.id = FONT_LINK_ID
    link.rel = "stylesheet"
    document.head.appendChild(link)
  }
  if (link.href !== href) link.href = href
}

/**
 * Inject the generated CSS into a live <style> tag for instant preview. Placed
 * last in <head> so it wins over the build-time theme.generated.css while the
 * user is experimenting. Remove it (via clearLivePreview) to fall back to saved.
 */
export function applyLivePreview(config: StudioConfig) {
  let style = document.getElementById(LIVE_STYLE_ID) as HTMLStyleElement | null
  if (!style) {
    style = document.createElement("style")
    style.id = LIVE_STYLE_ID
    document.head.appendChild(style)
  }
  style.textContent = buildThemeCss(config)
}

export function clearLivePreview() {
  document.getElementById(LIVE_STYLE_ID)?.remove()
}

/** Apply everything a config implies to the current page. */
export function applyConfig(config: StudioConfig) {
  applyMode(config.mode)
  applyFontLink(config)
  applyLivePreview(config)
}

// --- Persistence -----------------------------------------------------------

const LS_CONFIG = "studio.config"
const LS_DONE = "studio.completed"
const LS_ALWAYS = "studio.alwaysShow"

export function loadSavedConfig(): StudioConfig | null {
  try {
    const raw = localStorage.getItem(LS_CONFIG)
    return raw ? (JSON.parse(raw) as StudioConfig) : null
  } catch {
    return null
  }
}

export function cacheConfig(config: StudioConfig) {
  try {
    localStorage.setItem(LS_CONFIG, JSON.stringify(config))
  } catch {
    /* ignore quota / privacy-mode errors */
  }
}

export const hasCompletedSetup = () => localStorage.getItem(LS_DONE) === "1"
export const markSetupComplete = () => localStorage.setItem(LS_DONE, "1")
export const getAlwaysShow = () => localStorage.getItem(LS_ALWAYS) === "1"
export const setAlwaysShow = (on: boolean) =>
  localStorage.setItem(LS_ALWAYS, on ? "1" : "0")

/**
 * Persist choices to real project files via the dev-only Studio plugin.
 * Returns true on success. In `npm run build`/preview the endpoint is absent,
 * so this resolves false and the caller falls back to localStorage only.
 */
export async function saveToProject(config: StudioConfig): Promise<boolean> {
  try {
    const res = await fetch("/__studio/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    })
    return res.ok
  } catch {
    return false
  }
}
