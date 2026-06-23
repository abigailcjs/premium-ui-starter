import { writeFile } from "node:fs/promises"
import path from "node:path"
import type { Plugin } from "vite"

import { buildThemeCss } from "./src/studio/generateTheme"
import { defaultConfig, type StudioConfig } from "./src/studio/types"

/**
 * Dev-only endpoint that lets the in-browser Setup Studio persist a user's
 * choices to real project files:
 *   - src/studio/studio.config.json   (the saved decisions)
 *   - src/styles/theme.generated.css  (the CSS those decisions produce)
 *
 * Only mounted during `vite dev`; it does nothing in production builds, so the
 * shipped app has no write endpoint.
 */
export function studioPlugin(): Plugin {
  const root = process.cwd()
  const configPath = path.join(root, "src/studio/studio.config.json")
  const cssPath = path.join(root, "src/styles/theme.generated.css")

  return {
    name: "setup-studio",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use("/__studio/save", (req, res) => {
        if (req.method !== "POST") {
          res.statusCode = 405
          return res.end("Method Not Allowed")
        }
        let body = ""
        req.on("data", (chunk) => {
          body += chunk
          if (body.length > 1e5) req.destroy() // guard against runaway payloads
        })
        req.on("end", async () => {
          try {
            const incoming = JSON.parse(body) as Partial<StudioConfig>
            const config: StudioConfig = { ...defaultConfig, ...incoming }
            await writeFile(configPath, JSON.stringify(config, null, 2) + "\n", "utf8")
            await writeFile(cssPath, buildThemeCss(config), "utf8")
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify({ ok: true }))
            server.config.logger.info("[setup-studio] saved your UI choices ✨")
          } catch (err) {
            res.statusCode = 400
            res.end(JSON.stringify({ ok: false, error: String(err) }))
          }
        })
      })
    },
  }
}
