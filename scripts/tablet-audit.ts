/* eslint-disable */
/**
 * Tablet/narrow-desktop audit for the ReadMore accordion.
 *
 * Reproduces the original bug report: at viewport widths > 640px (sm+) the
 * team grid switches to 2 columns, making cards narrow enough that bios still
 * overflow visually — but the old viewport-based ReadMore wouldn't show its
 * toggle. The new content-driven ReadMore should show the toggle at every
 * width where text actually overflows.
 */
import puppeteer from 'puppeteer'
import path from 'path'
import fs from 'fs'

const BASE = process.env.AUDIT_BASE_URL || 'http://localhost:3000'
const OUTPUT_DIR = path.join(process.cwd(), 'mobile-audit')

const VIEWPORTS = [
  {name: 'narrow-desktop-720', width: 720, height: 900},
  {name: 'tablet-portrait-768', width: 768, height: 1024},
]

const ROUTES = ['/team', '/proof']

;(async () => {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, {recursive: true})

  const browser = await puppeteer.launch({headless: true, args: ['--no-sandbox']})

  for (const vp of VIEWPORTS) {
    for (const route of ROUTES) {
      const page = await browser.newPage()
      await page.setViewport({width: vp.width, height: vp.height, deviceScaleFactor: 1})
      await page.goto(BASE + route, {waitUntil: 'networkidle0', timeout: 30000})
      await new Promise((r) => setTimeout(r, 800))

      // Count visible "Read more" toggles in the document.
      const toggleCount = await page.evaluate(() => {
        return document.querySelectorAll('button[aria-expanded]').length
      })

      const safe = route.replace(/^\//, '').replace(/\//g, '_')
      const file = path.join(OUTPUT_DIR, `${vp.name}_${safe}.png`)
      await page.screenshot({path: file, fullPage: true, type: 'png'})
      console.log(`✓ ${vp.name} ${route.padEnd(8)} → ${toggleCount} Read-more toggles → ${file}`)
      await page.close()
    }
  }

  await browser.close()
})().catch((e) => {
  console.error(e)
  process.exit(1)
})
