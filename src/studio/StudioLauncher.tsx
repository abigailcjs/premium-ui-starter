import { Wand2 } from "lucide-react"

import { SetupStudio } from "./SetupStudio"
import { useStudio } from "./studio-context"

/**
 * Always-available way back into Setup Studio, plus the Studio overlay itself.
 * Drop <StudioLauncher /> once near the root of your app.
 */
export function StudioLauncher() {
  const { open, openStudio } = useStudio()

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={openStudio}
          className="group fixed right-4 bottom-4 z-40 flex items-center gap-2 rounded-full bg-primary py-2.5 pr-4 pl-3 text-sm font-medium text-primary-foreground shadow-lg ring-1 ring-foreground/10 transition-transform hover:-translate-y-0.5"
          aria-label="Open Setup Studio"
        >
          <Wand2 className="size-4" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-[8rem] group-hover:opacity-100">
            Setup Studio
          </span>
        </button>
      )}
      <SetupStudio />
    </>
  )
}
