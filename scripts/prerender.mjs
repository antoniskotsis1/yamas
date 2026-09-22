// Build step: render each language to static HTML (/, /en/, /el/), inject SEO <head> tags,
// and write the sitemap + social-share image. Runs after `vite build` and the SSR build.
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const serverDir = path.join(root, 'dist-server')

const { render, headTags, sitemap, LANGS, pathFor, site } = await import(
  path.join(serverDir, 'entry-server.js')
)

const template = await fs.readFile(path.join(dist, 'index.html'), 'utf8')

// Preload the two fonts every page needs first: Figtree 400 (body) and Tinos 700 (headings).
const assets = await fs.readdir(path.join(dist, 'assets'))
const fontPreloads = [/^figtree-latin-400-normal-.*\.woff2$/, /^tinos-latin-700-normal-.*\.woff2$/]
  .map((re) => assets.find((f) => re.test(f)))
  .filter(Boolean)
  .map((f) => `/assets/${f}`)

for (const lang of LANGS) {
  const html = template
    .replace('<html lang="pl">', `<html lang="${lang}">`)
    .replace(/\s*<!-- dev defaults.*?-->/, '')
    .replace(/<title>.*?<\/title>\s*/s, '')
    .replace(/<meta name="description"[^>]*>\s*/, '')
    .replace('<!--head-->', headTags(lang, fontPreloads))
    .replace('<div id="root"></div>', `<div id="root">${render(lang)}</div>`)
  const out = path.join(dist, pathFor(lang), 'index.html')
  await fs.mkdir(path.dirname(out), { recursive: true })
  await fs.writeFile(out, html)
  console.log(`prerendered ${pathFor(lang)} → ${path.relative(root, out)}`)
}

await fs.writeFile(path.join(dist, 'sitemap.xml'), sitemap())
await fs.writeFile(
  path.join(dist, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`,
)

// 1200×630 social-share image cropped from the hero photo
await sharp(path.join(root, 'src/assets/food2.jpg'))
  .resize(1200, 630, { fit: 'cover', position: 'centre' })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(dist, 'og.jpg'))

await fs.rm(serverDir, { recursive: true, force: true })
console.log('sitemap.xml, robots.txt, og.jpg written')
