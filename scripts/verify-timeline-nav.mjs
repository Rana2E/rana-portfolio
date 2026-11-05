import { chromium } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '..', 'tmp-hero-verify')
const base = process.env.VERIFY_URL || 'http://127.0.0.1:5173'
const widths = [1920, 1440, 1280, 768, 390]

await mkdir(outDir, { recursive: true })
const browser = await chromium.launch()
const report = { timelines: [], spySamples: [] }

for (const width of widths) {
  const page = await browser.newPage({
    viewport: { width, height: width < 800 ? 844 : 900 },
  })
  await page.goto(base, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  await page.evaluate(() => {
    document.getElementById('experience')?.scrollIntoView({ block: 'center' })
  })
  await page.waitForTimeout(700)

  const timeline = await page.evaluate(() => {
    const timelineEl = document.querySelector('.timeline')
    const markers = [...document.querySelectorAll('.timeline-marker')]
    if (!timelineEl || !markers.length) return { error: 'missing timeline' }

    const t = timelineEl.getBoundingClientRect()
    const before = getComputedStyle(timelineEl, '::before')
    const left = parseFloat(before.left)
    const widthPx = parseFloat(before.width)
    const tx = before.transform && before.transform !== 'none'
      ? new DOMMatrixReadOnly(before.transform).m41
      : 0
    // Line is either a 1px box centered via translate, or a full-rail box
    // with a 1px background stroke centered via background-position.
    const lineCenterX = t.left + left + tx + widthPx / 2

    const deltas = markers.map((m) => {
      const r = m.getBoundingClientRect()
      return Math.abs(r.left + r.width / 2 - lineCenterX)
    })

    return {
      lineCenterX: Math.round(lineCenterX * 10) / 10,
      maxDeltaX: Math.max(...deltas),
      markerCount: markers.length,
    }
  })

  await page.screenshot({
    path: path.join(outDir, `timeline-${width}.png`),
    fullPage: false,
  })
  report.timelines.push({ width, ...timeline })
  await page.close()
}

// Nav spy on desktop
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto(base, { waitUntil: 'networkidle' })
await page.waitForTimeout(1200)

for (const id of ['about', 'projects', 'skills', 'experience', 'contact']) {
  await page.evaluate((sectionId) => {
    const el = document.getElementById(sectionId)
    if (!el) return
    if (sectionId === 'contact') {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' })
      return
    }
    const top = el.getBoundingClientRect().top + window.scrollY - 96
    window.scrollTo({ top, behavior: 'instant' })
  }, id)
  await page.waitForTimeout(600)
  const active = await page.evaluate(() => {
    const current = document.querySelector('nav a[aria-current="location"]')
    return current ? current.getAttribute('href') : null
  })
  report.spySamples.push({ scrolledTo: id, activeHref: active })
}

await page.screenshot({ path: path.join(outDir, 'nav-spy-contact.png'), fullPage: false })
await browser.close()
await writeFile(path.join(outDir, 'timeline-nav-report.json'), JSON.stringify(report, null, 2))
console.log(JSON.stringify(report, null, 2))

const timelineOk = report.timelines.every((t) => !t.error && t.maxDeltaX <= 0.75)
const spyOk = report.spySamples.every((s) => s.activeHref === `#${s.scrolledTo}`)
if (!timelineOk || !spyOk) {
  console.error('VERIFICATION FAILED', { timelineOk, spyOk })
  process.exit(1)
}
console.log('VERIFICATION PASSED')
