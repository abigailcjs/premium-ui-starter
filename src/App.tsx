import { motion } from "motion/react"
import { Rocket, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"

const stack = [
  "Vite 8 (Rolldown)",
  "React 19 + TypeScript",
  "Tailwind v4",
  "shadcn/ui (Nova)",
  "Lucide · Motion · GSAP",
]

function App() {
  return (
    <div className="min-h-svh flex items-center justify-center bg-background text-foreground p-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Rocket className="size-5 text-primary" />
              <CardTitle>Foundation ready</CardTitle>
            </div>
            <CardDescription>
              Premium UI stack scaffolded and wired.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-sm">
              {stack.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="size-4 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <Button className="w-full">Looks good</Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default App
