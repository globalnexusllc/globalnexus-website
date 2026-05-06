import puppeteer from 'puppeteer'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_DIR = path.join(__dirname, '..', 'public', 'portfolio')

// Retry with looser waitUntil and longer timeout
const sites = [
  // polarace - try alternate URLs
  { id: 'polarace', url: 'https://www.polarace.gg' },
  // trend.io - use domcontentloaded instead of networkidle2
  { id: 'trend',    url: 'https://trend.io', waitUntil: 'domcontentloaded' },
]

const browser = await puppeteer.launch({
  headless: true,
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})

for (const { id, url, waitUntil = 'networkidle2' } of sites) {
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 })
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36')
  try {
    console.log(`  → ${url}`)
    await page.goto(url, { waitUntil, timeout: 60000 })
    await new Promise(r => setTimeout(r, 2000))
    const outPath = path.join(OUT_DIR, `${id}.jpg`)
    await page.screenshot({ path: outPath, type: 'jpeg', quality: 88, clip: { x: 0, y: 0, width: 1440, height: 900 } })
    console.log(`  ✓ ${id}.jpg`)
  } catch (err) {
    console.error(`  ✗ ${id}: ${err.message}`)
  }
  await page.close()
}

await browser.close()
