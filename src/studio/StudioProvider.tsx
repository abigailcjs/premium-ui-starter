import * as React from "react"

import { applyConfig, cacheConfig, getAlwaysShow, hasCompletedSetup, loadSavedConfig, markSetupComplete, saveToProject } from "./applyTheme"
import { StudioContext, type StudioContextValue } from "./studio-context"
import savedJson from "./studio.config.json"
import { defaultConfig, type StudioConfig } from "./types"

const fileConfig: StudioConfig = { ...defaultConfig, ...(savedJson as Partial<StudioConfig>) }

export function StudioProvider({ children }: { children: React.ReactNode }) {
  // Effective config = newest of (localStorage) or (committed project file).
  const [config, setConfig] = React.useState<StudioConfig>(
    () => loadSavedConfig() ?? fileConfig
  )
  // Greet on first run, or every run if the user opted into "always show".
  const [open, setOpen] = React.useState(
    () => !hasCompletedSetup() || getAlwaysShow()
  )

  // Apply on first paint and whenever the committed config changes.
  React.useEffect(() => {
    applyConfig(config)
  }, [config])

  const commit = React.useCallback(async (next: StudioConfig) => {
    setConfig(next)
    cacheConfig(next)
    markSetupComplete()
    const savedToProject = await saveToProject(next)
    return { savedToProject }
  }, [])

  const value = React.useMemo<StudioContextValue>(
    () => ({
      config,
      open,
      openStudio: () => setOpen(true),
      closeStudio: () => setOpen(false),
      commit,
    }),
    [config, open, commit]
  )

  return <StudioContext.Provider value={value}>{children}</StudioContext.Provider>
}
