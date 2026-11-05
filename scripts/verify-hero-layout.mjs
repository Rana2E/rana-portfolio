/**
 * Visual + computed-style verification for Hero name + monogram caption.
 */
import { chromium } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '..', 'tmp-hero-verify')
const base = process.env.HERO_VERIFY_URL || 'http://127.0.0.1:5173'

const viewports = [
  { name: '1920', width: 1920, height: 1080 },
  { name: '1440', width: 1440, height: 900 },
  { name: '1280', width: 1280, height: 800 },
  { name: '390', width: 390, height: 844 },
]

await mkdir(outDir, { recursive: true })

const browser = await chromium.launch()
const results = []

for (const vp of viewports) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } })
  await page.goto(base, { waitUntil: 'networkidle' })
  await page.evaluate(async () => {
    await document.fonts.ready
    await document.fonts.load('italic 48px "Instrument Serif"')
  })
  await page.waitForTimeout(600)

  const metrics = await page.evaluate(() => {
    const h1 = document.querySelector('h1.hero-name')
    const given = document.querySelector('.hero-name__given')
    const family = document.querySelector('.hero-name__family')
    const caption = document.querySelector('.monogram__caption-svg')
    const circle = document.querySelector('.monogram__mark circle')
    if (!h1 || !given || !family || !caption || !circle) {
      return { error: 'Missing nodes' }
    }

    const h1Style = getComputedStyle(h1)
    const h1Rect = h1.getBoundingClientRect()
    const givenRect = given.getBoundingClientRect()
    const familyRect = family.getBoundingClientRect()
    const sameLine = Math.abs(givenRect.top - familyRect.top) < 4

    const captionRect = caption.getBoundingClientRect()
    const circleRect = circle.getBoundingClientRect()
    const captionCenter = captionRect.left + captionRect.width / 2
    const circleCenter = circleRect.left + circleRect.width / 2

    return {
      whiteSpace: h1Style.whiteSpace,
      fontSize: h1Style.fontSize,
      h1Text: h1.textContent.trim().replace(/\s+/g, ' '),
      sameLine,
      givenTop: Math.round(givenRect.top),
      familyTop: Math.round(familyRect.top),
      verticalDelta: Math.round(Math.abs(givenRect.top - familyRect.top)),
      overflowX: Math.ceil(h1.scrollWidth - h1.clientWidth),
      captionCenter: Math.round(captionCenter),
      circleCenter: Math.round(circleCenter),
      captionVsCircleDelta: Math.round(Math.abs(captionCenter - circleCenter)),
      h1Height: Math.round(h1Rect.height),
    }
  })

  const shotPath = path.join(outDir, `hero-${vp.name}.png`)
  await page.screenshot({ path: shotPath, fullPage: false })
  results.push({ viewport: vp.name, ...metrics, shot: shotPath })
  await page.close()
}

await browser.close()
await writeFile(path.join(outDir, 'report.json'), JSON.stringify(results, null, 2))

const failures = results.filter((r) => {
  if (r.error) return true
  const desktop = Number(r.viewport) >= 1280
  if (desktop && (!r.sameLine || r.whiteSpace !== 'nowrap' || r.overflowX > 0)) return true
  if (r.captionVsCircleDelta > 4) return true
  return false
})

console.log(JSON.stringify(results, null, 2))
if (failures.length) {
  console.error('VERIFICATION FAILED', failures.map((f) => f.viewport))
  process.exit(1)
}
console.log('VERIFICATION PASSED')
