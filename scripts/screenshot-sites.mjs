import puppeteer from 'puppeteer'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_DIR = path.join(__dirname, '..', 'public', 'portfolio')

const sites = [
  { id: 'polarace', url: 'https://www.polarace.gg',  waitUntil: 'domcontentloaded' },
  { id: 'trend',    url: 'https://trend.io',          waitUntil: 'domcontentloaded', timeout: 60000 },
]

async function screenshot(browser, site) {
  const { id, url } = site
  const page = await browser.newPage()
  try {
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 })
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
    )

    console.log(`  → ${url}`)
    await page.goto(url, { waitUntil: site.waitUntil || 'networkidle2', timeout: site.timeout || 30000 })

    // Dismiss cookie banners / overlays if any
    await page.evaluate(() => {
      const selectors = [
        '[id*="cookie"]', '[class*="cookie"]',
        '[id*="consent"]', '[class*="consent"]',
        '[id*="banner"]', '[class*="banner"]',
        '[id*="overlay"]', '[class*="overlay"]',
        '[aria-label*="cookie"]',
      ]
      selectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => el.remove())
      })
    })

    // Short wait for animations to settle
    await new Promise(r => setTimeout(r, 1500))

    const outPath = path.join(OUT_DIR, `${id}.jpg`)
    await page.screenshot({
      path: outPath,
      type: 'jpeg',
      quality: 88,
      clip: { x: 0, y: 0, width: 1440, height: 900 },
    })
    console.log(`  ✓ saved ${id}.jpg`)
  } catch (err) {
    console.error(`  ✗ ${id}: ${err.message}`)
  } finally {
    await page.close()
  }
}

const browser = await puppeteer.launch({
  headless: true,
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-blink-features=AutomationControlled',
  ],
})

console.log('Taking screenshots...\n')
for (const site of sites) {
  await screenshot(browser, site)
}


await browser.close()
console.log('\nDone.')
