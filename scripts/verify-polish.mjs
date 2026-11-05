import { chromium } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '..', 'tmp-hero-verify')
const base = process.env.VERIFY_URL || 'http://127.0.0.1:5173'

await mkdir(outDir, { recursive: true })
const browser = await chromium.launch()
const report = { hero: [], nav: {}, projectsPerf: {} }

// --- Hero balance + one-line name ---
for (const width of [1920, 1440, 1280, 390]) {
  const page = await browser.newPage({
    viewport: { width, height: width < 800 ? 844 : 900 },
  })
  await page.goto(base, { waitUntil: 'networkidle' })
  await page.waitForTimeout(700)

  const hero = await page.evaluate(() => {
    const h1 = document.querySelector('.hero-name')
    const mono = document.querySelector('.monogram')
    const grid = h1?.closest('.max-w-7xl')
    const caption = document.querySelector('.monogram__caption-svg')
    const frame = document.querySelector('.monogram__mark rect')
    if (!h1 || !mono || !grid) return { error: 'missing hero parts' }

    const h1r = h1.getBoundingClientRect()
    const mr = mono.getBoundingClientRect()
    const gr = grid.getBoundingClientRect()
    const given = h1.querySelector('.hero-name__given')
    const family = h1.querySelector('.hero-name__family')
    // Spans on one line share the same top; getClientRects() is misleading for multi-span nodes.
    const sameLine =
      given && family
        ? Math.abs(given.getBoundingClientRect().top - family.getBoundingClientRect().top) < 2
        : false

    let captionInside = null
    if (caption && frame) {
      const cy = Number(caption.getAttribute('y'))
      const fy = Number(frame.getAttribute('y'))
      const fh = Number(frame.getAttribute('height'))
      captionInside = cy > fy && cy < fy + fh
    }

    return {
      sameLine,
      gapPx: Math.round(mr.left - h1r.right),
      gridWidth: Math.round(gr.width),
      nameFontSize: getComputedStyle(h1).fontSize,
      whiteSpace: getComputedStyle(h1).whiteSpace,
      captionInside,
      navMax: document.querySelector('nav .max-w-7xl')?.getBoundingClientRect().width ?? null,
    }
  })

  await page.screenshot({ path: path.join(outDir, `hero-polish-${width}.png`) })
  report.hero.push({ width, ...hero })
  await page.close()
}

// --- Nav: top has no active; sections track ---
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto(base, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1200)
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(400)

  const atTop = await page.evaluate(
    () => document.querySelector('nav a[aria-current="location"]')?.getAttribute('href') ?? null
  )

  const samples = []
  for (const id of ['about', 'projects', 'skills', 'experience', 'contact']) {
    await page.evaluate((sectionId) => {
      if (sectionId === 'contact') {
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' })
        return
      }
      const el = document.getElementById(sectionId)
      if (!el) return
      const top = el.getBoundingClientRect().top + window.scrollY - 96
      window.scrollTo({ top, behavior: 'instant' })
    }, id)
    await page.waitForTimeout(550)
    const active = await page.evaluate(
      () => document.querySelector('nav a[aria-current="location"]')?.getAttribute('href') ?? null
    )
    samples.push({ scrolledTo: id, activeHref: active })
  }

  // Click RE logo clears active
  await page.locator('nav button[aria-label="Scroll to top"]').click()
  await page.waitForTimeout(1000)
  const afterLogo = await page.evaluate(
    () => document.querySelector('nav a[aria-current="location"]')?.getAttribute('href') ?? null
  )

  report.nav = { atTop, samples, afterLogo }
  await page.close()
}

// --- Projects: measure image bytes + long-task-ish scroll timing on preview if available ---
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  const imageBytes = []
  page.on('response', async (res) => {
    try {
      const url = res.url()
      if (!/\.(webp|svg|png|jpe?g)(\?|$)/i.test(url)) return
      if (!/assets\/(rewaq|unitok|borikat|esnad)/i.test(url) && !/assets\/(Rewaq|UniTok|Borikat|Esnad)/i.test(url)) {
        // Vite hashed names — match by path containing project stems after build/dev
        if (!/(rewaq|unitok|borikat|esnad)/i.test(url)) return
      }
      const buf = await res.body()
      imageBytes.push({ url: url.split('/').pop(), bytes: buf.length })
    } catch {
      /* ignore */
    }
  })

  await page.goto(base, { waitUntil: 'networkidle' })
  await page.waitForTimeout(800)

  // Drive projects into view so deferred images actually fetch
  await page.evaluate(() => {
    document.getElementById('projects')?.scrollIntoView({ block: 'start' })
  })
  await page.waitForTimeout(1200)
  await page.evaluate(() => {
    window.scrollBy(0, 600)
  })
  await page.waitForTimeout(800)

  const scrollMetrics = await page.evaluate(async () => {
    const projects = document.getElementById('projects')
    if (!projects) return { error: 'no projects' }
    const startTop = projects.getBoundingClientRect().top + window.scrollY - window.innerHeight
    const endTop = projects.getBoundingClientRect().top + window.scrollY + projects.offsetHeight
    const t0 = performance.now()
    let frames = 0
    let longestGap = 0
    let last = performance.now()

    await new Promise((resolve) => {
      let y = Math.max(0, startTop)
      const step = () => {
        const now = performance.now()
        longestGap = Math.max(longestGap, now - last)
        last = now
        frames += 1
        y += 48
        window.scrollTo(0, y)
        if (y < endTop) requestAnimationFrame(step)
        else resolve()
      }
      requestAnimationFrame(step)
    })

    return {
      durationMs: Math.round(performance.now() - t0),
      frames,
      longestFrameGapMs: Math.round(longestGap),
    }
  })

  report.projectsPerf = {
    imageBytes,
    totalImageKB: Math.round(imageBytes.reduce((s, i) => s + i.bytes, 0) / 1024),
    priorSvgApproxKB: Math.round((13.7 + 9.24 + 0.83 + 0.32) * 1024),
    scrollMetrics,
  }
  await page.close()
}

await browser.close()
await writeFile(path.join(outDir, 'polish-report.json'), JSON.stringify(report, null, 2))
console.log(JSON.stringify(report, null, 2))

const heroOk = report.hero.every((h) => {
  if (h.error) return false
  if (h.width >= 1280 && !h.sameLine) return false
  if (h.captionInside === false) return false
  return true
})
const navOk =
  report.nav.atTop === null &&
  report.nav.afterLogo === null &&
  report.nav.samples.every((s) => s.activeHref === `#${s.scrolledTo}`)

if (!heroOk || !navOk) {
  console.error('VERIFICATION FAILED', { heroOk, navOk })
  process.exit(1)
}
console.log('POLISH VERIFICATION PASSED')
