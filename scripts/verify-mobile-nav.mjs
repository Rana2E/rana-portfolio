import { chromium } from 'playwright'

const browser = await chromium.launch()
const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  hasTouch: true,
  isMobile: true,
})
await page.goto('http://127.0.0.1:5173', { waitUntil: 'networkidle' })
await page.waitForTimeout(1500)

await page.getByRole('button', { name: 'Open menu' }).click()
await page.waitForTimeout(400)

const before = await page.evaluate(() => window.scrollY)
await page.locator('#mobile-nav a[href="#projects"]').click()
await page.waitForTimeout(1200)

const afterProjects = await page.evaluate(() => ({
  y: Math.round(window.scrollY),
  menuOpen: !!document.querySelector('#mobile-nav'),
  projectsTop: Math.round(document.getElementById('projects')?.getBoundingClientRect().top ?? 999),
}))

await page.getByRole('button', { name: 'Open menu' }).click()
await page.waitForTimeout(350)
await page.locator('#mobile-nav a[href="#contact"]').click()
await page.waitForTimeout(1200)

const afterContact = await page.evaluate(() => ({
  y: Math.round(window.scrollY),
  contactTop: Math.round(document.getElementById('contact')?.getBoundingClientRect().top ?? 999),
}))

console.log(JSON.stringify({ before, afterProjects, afterContact }, null, 2))

const ok =
  afterProjects.y > 200 &&
  Math.abs(afterProjects.projectsTop) < 160 &&
  afterContact.y > afterProjects.y

await browser.close()
if (!ok) {
  console.error('MOBILE NAV FAILED')
  process.exit(1)
}
console.log('MOBILE NAV PASSED')
