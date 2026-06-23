import { ArrowDown } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Reveal } from "./primitives/Reveal"

const blocks = [
  { title: "Scroll inside this window", body: "Each block below fades and slides in as it enters view — that's your motion personality." },
  { title: "Reveal on scroll", body: "Turn it off and content just appears. Turn it on for a more crafted, premium feel." },
  { title: "Smooth scroll", body: "When on, jump-to-section links glide instead of snapping." },
  { title: "Respectful by default", body: "If a visitor's device asks to reduce motion, animations quietly switch off." },
  { title: "That's the idea", body: "Pick the feel you like — you can always change it later." },
]

/**
 * A self-contained scrolling window used in the Motion step so beginners can
 * literally see reveal-on-scroll and the chosen motion feel in action.
 */
export function ScrollDemo() {
  return (
    <div className="overflow-hidden rounded-xl border bg-muted/30">
      <div className="flex items-center justify-between border-b bg-background/60 px-3 py-2 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <ArrowDown className="size-3" /> Scroll me
        </span>
        <span className="flex gap-1">
          <span className="size-2 rounded-full bg-destructive/60" />
          <span className="size-2 rounded-full bg-amber-400/70" />
          <span className="size-2 rounded-full bg-emerald-400/70" />
        </span>
      </div>
      <div className="h-64 space-y-4 overflow-y-auto p-4">
        {blocks.map((b, i) => (
          <Reveal key={b.title} delay={i * 0.04}>
            <Card>
              <CardContent className="space-y-1 py-3">
                <p className="font-heading text-sm font-semibold">{b.title}</p>
                <p className="text-sm text-muted-foreground">{b.body}</p>
              </CardContent>
            </Card>
          </Reveal>
        ))}
        <div className="pt-2 text-center text-xs text-muted-foreground">
          You reached the end ✨
        </div>
      </div>
    </div>
  )
}
