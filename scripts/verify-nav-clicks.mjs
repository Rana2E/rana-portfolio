import { chromium } from 'playwright'

const base = process.env.VERIFY_URL || 'http://127.0.0.1:5173'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto(base, { waitUntil: 'networkidle' })
await page.waitForTimeout(1500)

const clickResults = []
for (const href of ['#about', '#projects', '#skills', '#experience', '#contact']) {
  await page.locator(`nav a[href="${href}"]`).click()
  await page.waitForTimeout(1000)
  const active = await page.evaluate(
    () => document.querySelector('nav a[aria-current="location"]')?.getAttribute('href') ?? null
  )
  clickResults.push({ clicked: href, active })
}

await page.evaluate(() => window.scrollTo(0, 0))
await page.waitForTimeout(400)

const samples = []
const maxY = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight)
for (let y = 0; y <= maxY; y += 350) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y)
  await page.waitForTimeout(90)
  const sample = await page.evaluate(() => {
    const active = document.querySelector('nav a[aria-current="location"]')?.getAttribute('href')
    const ref = window.scrollY + 116
    const ids = ['about', 'projects', 'skills', 'experience', 'contact']
    let expected = 'about'
    for (const id of ids) {
      const el = document.getElementById(id)
      if (!el) continue
      if (el.getBoundingClientRect().top + window.scrollY <= ref) expected = id
    }
    const atBottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 64
    if (atBottom) expected = 'contact'
    return { y: Math.round(window.scrollY), active, expected: `#${expected}` }
  })
  samples.push(sample)
}

const mismatches = samples.filter((s) => s.active !== s.expected)
const clicksOk = clickResults.every((r) => r.clicked === r.active)
console.log(JSON.stringify({ clickResults, clicksOk, mismatchCount: mismatches.length, sampleCount: samples.length, mismatches }, null, 2))
await browser.close()
if (!clicksOk || mismatches.length) process.exit(1)
console.log('NAV CLICK + SCROLL SPY PASSED')
