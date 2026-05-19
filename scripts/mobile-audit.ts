/* eslint-disable */
/**
 * Mobile responsiveness audit:
 * - Visits every page in `ROUTES` at iPhone-12 viewport (390x844, devicePixelRatio: 3)
 * - Saves a full-page screenshot for each into ./mobile-audit/
 * - Reports any pages whose document width exceeds the viewport (horizontal-scroll bug)
 */
import puppeteer from 'puppeteer'
import path from 'path'
import fs from 'fs'

const BASE = process.env.AUDIT_BASE_URL || 'http://localhost:3000'

const ROUTES = [
  '/',
  '/about',
  '/proof',
  '/team',
  '/stack',
  '/engineering',
  '/process',
  '/contact',
  '/blog',
  '/thinking',
  '/search?q=react',
  '/privacy',
  '/terms',
  // A specific blog post — slug taken from the migration verification output
  '/blog/ai-infrastructure-gold-rush',
]

const OUTPUT_DIR = path.join(process.cwd(), 'mobile-audit')

;(async () => {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, {recursive: true})

  const browser = await puppeteer.launch({headless: true, args: ['--no-sandbox']})
  const findings: Array<{route: string; viewportWidth: number; docWidth: number; overflows: boolean; status?: number}> = []

  for (const route of ROUTES) {
    const page = await browser.newPage()
    await page.setViewport({width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true})
    await page.setUserAgent(
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
    )
    const url = BASE + route
    let status = 0
    try {
      const resp = await page.goto(url, {waitUntil: 'networkidle0', timeout: 30000})
      status = resp?.status() ?? 0
    } catch (e) {
      console.error(`[${route}] navigation error:`, (e as Error).message)
    }

    // Wait an extra beat for Sanity-driven pages to settle
    await new Promise((r) => setTimeout(r, 800))

    const docWidth = await page.evaluate(() => {
      const html = document.documentElement
      const body = document.body
      return Math.max(html.scrollWidth, html.offsetWidth, body.scrollWidth, body.offsetWidth)
    })

    const overflows = docWidth > 390

    const safeName = route === '/' ? 'home' : route.replace(/^\//, '').replace(/[/?=]/g, '_').replace(/_+/g, '_')
    const file = path.join(OUTPUT_DIR, `${safeName}.png`)
    try {
      await page.screenshot({path: file, fullPage: true, type: 'png'})
    } catch (e) {
      console.error(`[${route}] screenshot error:`, (e as Error).message)
    }

    findings.push({route, viewportWidth: 390, docWidth, overflows, status})
    console.log(`${overflows ? '✗' : '✓'} ${route.padEnd(38)} status=${status} docWidth=${docWidth}px`)
    await page.close()
  }

  await browser.close()

  console.log('\n── Horizontal-overflow report ──')
  const overflowing = findings.filter((f) => f.overflows)
  if (overflowing.length === 0) {
    console.log('No pages overflow horizontally on 390px viewport. ✓')
  } else {
    overflowing.forEach((f) => console.log(`  ✗ ${f.route} → ${f.docWidth}px (overflows by ${f.docWidth - 390}px)`))
  }
})().catch((e) => {
  console.error(e)
  process.exit(1)
})
