import { Sparkles, Star, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Reveal } from "./primitives/Reveal"

/**
 * A realistic mini-surface that re-styles itself live as choices change —
 * the "mockup" a beginner watches while deciding. Because Studio applies the
 * draft to CSS variables document-wide, this needs no special wiring.
 */
export function PreviewMockup() {
  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
          <Sparkles className="size-3" /> Live preview
        </span>
        <h2 className="font-heading text-2xl font-semibold tracking-tight">
          Build something people love
        </h2>
        <p className="text-sm text-muted-foreground">
          This is how your headings, body text, colors, corners and spacing look
          together. Change a choice and watch it update instantly.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button>
          Get started <ArrowRight className="size-4" />
        </Button>
        <Button variant="outline">Learn more</Button>
        <Button variant="secondary">Secondary</Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Star className="size-4 text-primary" />
            <CardTitle>A sample card</CardTitle>
          </div>
          <CardDescription>
            Cards, inputs and buttons all share your accent and corner style.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <input
            placeholder="Type something…"
            className="h-9 w-full rounded-lg border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"
          />
          <div className="flex flex-wrap gap-2 text-xs">
            {["Design", "Motion", "Accessible", "Fast"].map((t) => (
              <span
                key={t}
                className="rounded-full bg-muted px-2.5 py-1 text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      <Reveal>
        <p className="text-sm text-muted-foreground">
          Body copy uses your chosen reading font. Good typography is mostly
          getting out of the way so the words are easy to read.
        </p>
      </Reveal>
    </div>
  )
}
