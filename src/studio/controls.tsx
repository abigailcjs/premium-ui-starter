import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

/** A row of mutually-exclusive pill buttons. */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { id: T; label: string }[]
  value: T
  onChange: (id: T) => void
}) {
  return (
    <div className="inline-flex rounded-lg bg-muted p-1 text-sm">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => onChange(o.id)}
          aria-pressed={value === o.id}
          className={cn(
            "rounded-md px-3 py-1.5 font-medium transition-colors",
            value === o.id
              ? "bg-background text-foreground shadow-sm ring-1 ring-foreground/10"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

/** A large, tappable choice card with a title, blurb and selected state. */
export function OptionCard({
  selected,
  onClick,
  title,
  blurb,
  children,
}: {
  selected: boolean
  onClick: () => void
  title: React.ReactNode
  blurb?: string
  children?: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "relative flex w-full flex-col items-start gap-1 rounded-xl border bg-card p-4 text-left transition-all hover:border-foreground/30",
        selected ? "border-primary ring-2 ring-primary/30" : "border-border"
      )}
    >
      {selected && (
        <span className="absolute top-3 right-3 grid size-5 place-items-center rounded-full bg-primary text-primary-foreground">
          <Check className="size-3" />
        </span>
      )}
      <div className="text-base font-medium">{title}</div>
      {blurb && <p className="text-sm text-muted-foreground">{blurb}</p>}
      {children}
    </button>
  )
}

/** Color swatch button. */
export function SwatchButton({
  color,
  label,
  selected,
  onClick,
}: {
  color: string
  label: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      title={label}
      className={cn(
        "flex flex-col items-center gap-1.5 rounded-lg p-2 transition-transform hover:-translate-y-0.5"
      )}
    >
      <span
        className={cn(
          "grid size-10 place-items-center rounded-full ring-1 ring-foreground/10 transition-all",
          selected && "ring-2 ring-foreground ring-offset-2 ring-offset-background"
        )}
        style={{ background: color }}
      >
        {selected && <Check className="size-4 text-white drop-shadow" />}
      </span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </button>
  )
}

/** Labeled range slider. */
export function Slider({
  value,
  min,
  max,
  step,
  onChange,
}: {
  value: number
  min: number
  max: number
  step: number
  onChange: (v: number) => void
}) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary"
    />
  )
}

/** Switch with label + description. */
export function Toggle({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
  description?: string
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border bg-card p-4">
      <span className="space-y-0.5">
        <span className="block text-sm font-medium">{label}</span>
        {description && (
          <span className="block text-sm text-muted-foreground">{description}</span>
        )}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors",
          checked ? "bg-primary" : "bg-muted-foreground/30"
        )}
      >
        <span
          className={cn(
            "inline-block size-5 transform rounded-full bg-background shadow transition-transform",
            checked ? "translate-x-5" : "translate-x-0.5"
          )}
        />
      </button>
    </label>
  )
}
