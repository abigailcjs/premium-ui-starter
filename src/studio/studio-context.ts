import { createContext, useContext } from "react"

import type { StudioConfig } from "./types"

export interface StudioContextValue {
  /** The currently applied choices. */
  config: StudioConfig
  /** Whether the walkthrough is open. */
  open: boolean
  openStudio: () => void
  closeStudio: () => void
  /** Commit choices: apply, cache, and try to write to project files. */
  commit: (next: StudioConfig) => Promise<{ savedToProject: boolean }>
}

export const StudioContext = createContext<StudioContextValue | null>(null)

export function useStudio() {
  const ctx = useContext(StudioContext)
  if (!ctx) throw new Error("useStudio must be used within <StudioProvider>")
  return ctx
}
