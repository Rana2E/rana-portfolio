/**
 * Renders the exact RE monogram SVG to a 1600×1600 PNG
 * using Chromium + Instrument Serif (same font as the Hero).
 */
import { chromium } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const outDir = path.join(root, 'public', 'branding')
const outPng = path.join(outDir, 'rana-re-linkedin.png')
const size = 1600

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
  <style>
    html, body {
      margin: 0;
      width: ${size}px;
      height: ${size}px;
      overflow: hidden;
      background: #090B12;
    }
    svg { display: block; width: ${size}px; height: ${size}px; }
  </style>
</head>
<body>
  <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 1000 1000" role="img" aria-label="RE monogram">
    <rect width="1000" height="1000" fill="#090B12"/>
    <g transform="translate(500 500) scale(2.72) translate(-204 -217)">
      <text
        x="118" y="276"
        fill="#F0EFF4"
        font-family="Instrument Serif, Georgia, serif"
        font-size="188"
        font-style="italic"
        letter-spacing="-14"
      >R</text>
      <text
        x="176" y="286"
        fill="#BFA0EC"
        fill-opacity="0.94"
        font-family="Instrument Serif, Georgia, serif"
        font-size="188"
        font-style="italic"
        letter-spacing="-14"
      >E</text>
    </g>
  </svg>
</body>
</html>`

await mkdir(outDir, { recursive: true })

const browser = await chromium.launch()
const page = await browser.newPage({
  viewport: { width: size, height: size },
  deviceScaleFactor: 1,
})

await page.setContent(html, { waitUntil: 'networkidle' })
await page.evaluate(async () => {
  await document.fonts.ready
  // Ensure italic Instrument Serif is actually available
  await document.fonts.load('italic 188px "Instrument Serif"')
})
// Brief settle after font swap
await page.waitForTimeout(400)

const buffer = await page.screenshot({
  type: 'png',
  omitBackground: false,
  clip: { x: 0, y: 0, width: size, height: size },
})

await writeFile(outPng, buffer)
await browser.close()

console.log(`Wrote ${outPng} (${buffer.length} bytes)`)
