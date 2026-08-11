import { motion } from "motion/react"
import { ArrowRight, Palette, Rocket, Shapes, Type, Wand2, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Reveal } from "@/studio/primitives/Reveal"
import { StudioLauncher } from "@/studio/StudioLauncher"
import { useStudio } from "@/studio/studio-context"

const decisions = [
  { icon: Type, title: "Fonts & type", body: "Pick a heading + body pairing that fits your vibe." },
  { icon: Palette, title: "Color & theme", body: "Choose an accent and a light or dark base." },
  { icon: Shapes, title: "Corners & spacing", body: "Dial in roundness and how airy things feel." },
  { icon: Zap, title: "Motion & scroll", body: "Set the animation feel and reveal-on-scroll." },
]

function App() {
  const { openStudio } = useStudio()

  return (
    <div className="min-h-svh bg-background text-foreground">
      <main className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-5 text-center"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Rocket className="size-3" /> Starter pack for new coders
          </span>
          <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
            Design your app before you write a line
          </h1>
          <p className="mx-auto max-w-xl text-balance text-muted-foreground">
            A premium React + Tailwind starter with a friendly walkthrough. Make
            the visual decisions a builder normally agonizes over — fonts, color,
            corners, motion — by clicking, not configuring.
          </p>
          <div className="flex flex-wrap justify-center gap-2 pt-1">
            <Button size="lg" onClick={openStudio}>
              <Wand2 className="size-4" /> Open Setup Studio
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() =>
                document.getElementById("decisions")?.scrollIntoView({ block: "start" })
              }
            >
              See what you'll choose <ArrowRight className="size-4" />
            </Button>
          </div>
        </motion.div>

        <div id="decisions" className="mt-20 grid gap-3 sm:grid-cols-2">
          {decisions.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.06}>
              <Card>
                <CardContent className="flex items-start gap-3 py-4">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <d.icon className="size-5" />
                  </span>
                  <div className="space-y-0.5">
                    <p className="font-heading font-medium">{d.title}</p>
                    <p className="text-sm text-muted-foreground">{d.body}</p>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12 rounded-2xl border bg-card p-6 text-center">
            <p className="font-heading text-lg font-medium">Ready when you are</p>
            <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
              Your picks are saved into the project, so the whole app updates to
              match. Change your mind anytime — reopen Studio from the corner.
            </p>
            <Button className="mt-4" onClick={openStudio}>
              Start the walkthrough <ArrowRight className="size-4" />
            </Button>
          </div>
        </Reveal>
      </main>

      <StudioLauncher />
    </div>
  )
}

export default App
