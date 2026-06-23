import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  Palette,
  Rocket,
  RotateCcw,
  Shapes,
  Sparkles,
  Type,
  Wand2,
  X,
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { applyConfig, setAlwaysShow as persistAlwaysShow, getAlwaysShow } from "./applyTheme"
import { OptionCard, Segmented, Slider, SwatchButton, Toggle } from "./controls"
import { PreviewMockup } from "./PreviewMockup"
import { ScrollDemo } from "./ScrollDemo"
import { buildThemeCss } from "./generateTheme"
import { colorPresets, densityPresets, fontPresets, motionPresets } from "./presets"
import { useStudio } from "./studio-context"
import { defaultConfig, type StudioConfig } from "./types"

const steps = [
  { id: "welcome", label: "Welcome", icon: Sparkles },
  { id: "fonts", label: "Fonts", icon: Type },
  { id: "color", label: "Color", icon: Palette },
  { id: "shape", label: "Corners", icon: Shapes },
  { id: "motion", label: "Motion", icon: Zap },
  { id: "finish", label: "Finish", icon: Rocket },
] as const

export function SetupStudio() {
  const { open, config, commit, closeStudio } = useStudio()
  const [step, setStep] = React.useState(0)
  const [draft, setDraft] = React.useState<StudioConfig>(config)
  const [always, setAlways] = React.useState(getAlwaysShow)
  const [saving, setSaving] = React.useState(false)
  const [savedToFiles, setSavedToFiles] = React.useState<boolean | null>(null)

  // Re-seed from the committed config each time the walkthrough (re)opens.
  // Adjusting state during render is the recommended pattern over an effect.
  const [wasOpen, setWasOpen] = React.useState(open)
  if (open !== wasOpen) {
    setWasOpen(open)
    if (open) {
      setDraft(config)
      setStep(0)
      setAlways(getAlwaysShow())
      setSavedToFiles(null)
    }
  }

  // Live preview: apply the draft to the whole document while editing.
  React.useEffect(() => {
    if (open) applyConfig(draft)
  }, [open, draft])

  const set = <K extends keyof StudioConfig>(key: K, value: StudioConfig[K]) =>
    setDraft((d) => ({ ...d, [key]: value }))

  const handleClose = () => {
    applyConfig(config) // revert any unsaved preview
    closeStudio()
  }

  const handleSave = async () => {
    setSaving(true)
    persistAlwaysShow(always)
    const { savedToProject } = await commit(draft)
    setSavedToFiles(savedToProject)
    setSaving(false)
    setStep(steps.length - 1)
  }

  if (!open) return null

  const StepIcon = steps[step].icon
  const isWide = steps[step].id === "welcome" || steps[step].id === "finish"

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        role="dialog"
        aria-modal="true"
        aria-label="Setup Studio"
      >
        <motion.div
          className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border bg-background shadow-2xl"
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b px-5 py-3.5">
            <div className="flex items-center gap-2.5">
              <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
                <StepIcon className="size-4" />
              </span>
              <div>
                <p className="text-sm font-semibold">Setup Studio</p>
                <p className="text-xs text-muted-foreground">
                  Step {step + 1} of {steps.length} · {steps[step].label}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setDraft(defaultConfig)}
                title="Reset all choices to the defaults"
                className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <RotateCcw className="size-3.5" /> Reset
              </button>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close"
                className="grid size-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>

          {/* Progress */}
          <div className="flex gap-1.5 px-5 pt-3">
            {steps.map((s, i) => (
              <span
                key={s.id}
                className={cn(
                  "h-1 flex-1 rounded-full transition-colors",
                  i <= step ? "bg-primary" : "bg-muted"
                )}
              />
            ))}
          </div>

          {/* Body */}
          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
            <div className={cn("grid gap-6", !isWide && "md:grid-cols-2")}>
              <div className="space-y-4">
                <StepContent step={steps[step].id} draft={draft} set={set} />
              </div>
              {!isWide && (
                <div className="md:sticky md:top-0">
                  {steps[step].id === "motion" ? <ScrollDemo /> : <PreviewMockup />}
                </div>
              )}
            </div>

            {steps[step].id === "finish" && (
              <FinishExtras
                draft={draft}
                always={always}
                setAlways={setAlways}
                savedToFiles={savedToFiles}
              />
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t bg-muted/30 px-5 py-3.5">
            <Button
              variant="ghost"
              onClick={() => (step === 0 ? handleClose() : setStep((s) => s - 1))}
            >
              {step === 0 ? (
                "Maybe later"
              ) : (
                <>
                  <ArrowLeft className="size-4" /> Back
                </>
              )}
            </Button>

            {step < steps.length - 2 ? (
              <Button onClick={() => setStep((s) => s + 1)}>
                Next <ArrowRight className="size-4" />
              </Button>
            ) : step === steps.length - 2 ? (
              <Button onClick={handleSave} disabled={saving}>
                {saving ? (
                  "Saving…"
                ) : (
                  <>
                    <Check className="size-4" /> Save my choices
                  </>
                )}
              </Button>
            ) : (
              <Button onClick={handleClose}>
                <Rocket className="size-4" /> Start building
              </Button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// --- Per-step content ------------------------------------------------------

function StepContent({
  step,
  draft,
  set,
}: {
  step: (typeof steps)[number]["id"]
  draft: StudioConfig
  set: <K extends keyof StudioConfig>(key: K, value: StudioConfig[K]) => void
}) {
  switch (step) {
    case "welcome":
      return <WelcomeStep />
    case "fonts":
      return (
        <Section
          title="Pick your fonts"
          hint="Fonts set the whole personality. Headings can differ from body text."
        >
          <div className="space-y-2">
            {fontPresets.map((f) => (
              <OptionCard
                key={f.id}
                selected={draft.font === f.id}
                onClick={() => set("font", f.id)}
                title={<span style={{ fontFamily: f.heading }}>{f.name}</span>}
                blurb={f.blurb}
              />
            ))}
          </div>
        </Section>
      )
    case "color":
      return (
        <Section
          title="Choose an accent"
          hint="Your accent colors buttons, links and focus rings. Pick a base mode too."
        >
          <div className="flex flex-wrap gap-1">
            {colorPresets.map((c) => (
              <SwatchButton
                key={c.id}
                color={c.swatch}
                label={c.name}
                selected={draft.color === c.id}
                onClick={() => set("color", c.id)}
              />
            ))}
          </div>
          <div className="space-y-2 pt-2">
            <p className="text-sm font-medium">Default appearance</p>
            <Segmented
              value={draft.mode}
              onChange={(m) => set("mode", m)}
              options={[
                { id: "light", label: "☀ Light" },
                { id: "dark", label: "☾ Dark" },
              ]}
            />
          </div>
        </Section>
      )
    case "shape":
      return (
        <Section
          title="Corners & spacing"
          hint="Sharp corners feel serious; round feels friendly. Spacing sets how airy it is."
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Corner roundness</span>
              <span className="text-muted-foreground">{draft.radius.toFixed(3)}rem</span>
            </div>
            <Slider
              value={draft.radius}
              min={0}
              max={1.5}
              step={0.025}
              onChange={(v) => set("radius", v)}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Sharp</span>
              <span>Round</span>
            </div>
          </div>
          <div className="space-y-2 pt-2">
            <p className="text-sm font-medium">Spacing density</p>
            <Segmented
              value={draft.density}
              onChange={(d) => set("density", d)}
              options={densityPresets.map((d) => ({ id: d.id, label: d.name }))}
            />
            <p className="text-sm text-muted-foreground">
              {densityPresets.find((d) => d.id === draft.density)?.blurb}
            </p>
          </div>
        </Section>
      )
    case "motion":
      return (
        <Section
          title="Motion & scroll"
          hint="How lively should things feel? Watch the window on the right react."
        >
          <div className="space-y-2">
            <p className="text-sm font-medium">Animation feel</p>
            <Segmented
              value={draft.motion}
              onChange={(m) => set("motion", m)}
              options={motionPresets.map((m) => ({ id: m.id, label: m.name }))}
            />
            <p className="text-sm text-muted-foreground">
              {motionPresets.find((m) => m.id === draft.motion)?.blurb}
            </p>
          </div>
          <div className="space-y-2 pt-1">
            <Toggle
              label="Reveal on scroll"
              description="Fade and slide elements in as they appear."
              checked={draft.revealOnScroll}
              onChange={(v) => set("revealOnScroll", v)}
            />
            <Toggle
              label="Smooth scrolling"
              description="Glide to anchor links instead of jumping."
              checked={draft.smoothScroll}
              onChange={(v) => set("smoothScroll", v)}
            />
          </div>
        </Section>
      )
    case "finish":
      return (
        <div className="space-y-3 text-center">
          <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Wand2 className="size-6" />
          </span>
          <h2 className="font-heading text-2xl font-semibold">Your UI is set 🎉</h2>
          <p className="mx-auto max-w-md text-sm text-muted-foreground">
            These choices are now your project's defaults. You can reopen Setup
            Studio any time from the button in the corner — nothing is permanent.
          </p>
        </div>
      )
  }
}

function WelcomeStep() {
  const points = [
    { icon: Type, text: "Pick fonts that match your vibe" },
    { icon: Palette, text: "Choose an accent color and light/dark" },
    { icon: Shapes, text: "Set corner roundness and spacing" },
    { icon: Zap, text: "Decide how motion and scrolling feel" },
  ]
  return (
    <div className="space-y-4 text-center">
      <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
        <Sparkles className="size-6" />
      </span>
      <div className="space-y-1.5">
        <h2 className="font-heading text-2xl font-semibold">Let's design your UI</h2>
        <p className="mx-auto max-w-md text-sm text-muted-foreground">
          No experience needed. Answer a few visual questions and we'll wire your
          choices into the project. You'll see every change live as you go.
        </p>
      </div>
      <div className="mx-auto grid max-w-md gap-2 text-left sm:grid-cols-2">
        {points.map((p) => (
          <div
            key={p.text}
            className="flex items-center gap-2.5 rounded-lg border bg-card p-3 text-sm"
          >
            <p.icon className="size-4 shrink-0 text-primary" />
            {p.text}
          </div>
        ))}
      </div>
    </div>
  )
}

function FinishExtras({
  draft,
  always,
  setAlways,
  savedToFiles,
}: {
  draft: StudioConfig
  always: boolean
  setAlways: (v: boolean) => void
  savedToFiles: boolean | null
}) {
  const summary: [string, string][] = [
    ["Fonts", fontPresets.find((f) => f.id === draft.font)!.name],
    ["Accent", colorPresets.find((c) => c.id === draft.color)!.name],
    ["Mode", draft.mode === "dark" ? "Dark" : "Light"],
    ["Corners", `${draft.radius.toFixed(3)}rem`],
    ["Density", densityPresets.find((d) => d.id === draft.density)!.name],
    ["Motion", motionPresets.find((m) => m.id === draft.motion)!.name],
  ]
  return (
    <div className="mx-auto mt-5 max-w-md space-y-4">
      <div className="grid grid-cols-2 gap-2 rounded-xl border bg-card p-4 text-sm sm:grid-cols-3">
        {summary.map(([k, v]) => (
          <div key={k}>
            <p className="text-xs text-muted-foreground">{k}</p>
            <p className="font-medium">{v}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <CopyButton label="Copy theme CSS" value={buildThemeCss(draft)} />
        <CopyButton label="Copy config JSON" value={JSON.stringify(draft, null, 2)} />
      </div>

      <p className="text-center text-xs text-muted-foreground">
        {savedToFiles === null
          ? null
          : savedToFiles
            ? "Saved to src/studio/studio.config.json + src/styles/theme.generated.css ✓"
            : "Saved in this browser. Run the dev server (npm run dev) to write it into your project files."}
      </p>

      <label className="flex cursor-pointer items-center justify-center gap-2 text-sm text-muted-foreground">
        <input
          type="checkbox"
          checked={always}
          onChange={(e) => setAlways(e.target.checked)}
          className="size-4 accent-primary"
        />
        Show Setup Studio every time the app starts
      </label>
    </div>
  )
}

function CopyButton({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = React.useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard blocked — ignore */
    }
  }
  return (
    <Button variant="outline" size="sm" onClick={copy}>
      {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      {copied ? "Copied!" : label}
    </Button>
  )
}

// --- Small layout helper ---------------------------------------------------

function Section({
  title,
  hint,
  children,
}: {
  title: string
  hint: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <h3 className="font-heading text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{hint}</p>
      </div>
      {children}
    </div>
  )
}
