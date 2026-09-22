// <head> tags and schema.org data for each pre-rendered language page.
import { DICT, LANGS } from '../i18n/dict'
import type { Lang } from '../i18n/dict'
import { pathFor } from '../i18n/i18n'
import { SCHEDULE, featured, menuList, site } from '../content'

const OG_LOCALE: Record<Lang, string> = { pl: 'pl_PL', en: 'en_GB', el: 'el_GR' }
const DAY = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export const pageUrl = (lang: Lang) => site.url + pathFor(lang)
export const OG_IMAGE_PATH = '/og.jpg'

/** schema.org Restaurant — address, geo, hours (from SCHEDULE), menu link, socials. */
export function jsonLd(lang: Lang) {
  // group weekdays sharing the same hours
  const groups = new Map<string, string[]>()
  for (let d = 0; d < 7; d++) {
    const h = SCHEDULE[d]
    const k = `${h.open}-${h.close}`
    groups.set(k, [...(groups.get(k) ?? []), DAY[d]])
  }
  const prices = [...featured, ...menuList].map((m) => parseInt(m.price, 10))
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${site.url}/#restaurant`,
    name: site.name,
    slogan: site.slogan,
    description: DICT[lang]['meta.desc'],
    url: pageUrl(lang),
    image: site.url + OG_IMAGE_PATH,
    servesCuisine: ['Greek', 'Street food'],
    priceRange: `${Math.min(...prices)}–${Math.max(...prices)} PLN`,
    acceptsReservations: false,
    hasMenu: site.orderUrl,
    email: site.emailGeneral,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.street,
      postalCode: site.postcode,
      addressLocality: site.city,
      addressCountry: 'PL',
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
    openingHoursSpecification: [...groups].map(([k, days]) => {
      const [opens, closes] = k.split('-')
      return {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: days,
        opens,
        closes: closes === '24:00' ? '23:59' : closes,
      }
    }),
    sameAs: [site.instagram],
  }
}

/** Tags injected into <head> of each language page by scripts/prerender.mjs. */
export function headTags(lang: Lang, fontPreloads: string[] = []) {
  const d = DICT[lang]
  const url = pageUrl(lang)
  const img = site.url + OG_IMAGE_PATH
  const alt = LANGS.filter((l) => l !== lang)
  return [
    `<title>${esc(d['meta.title'])}</title>`,
    `<meta name="description" content="${esc(d['meta.desc'])}" />`,
    `<link rel="canonical" href="${url}" />`,
    ...LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${pageUrl(l)}" />`),
    `<link rel="alternate" hreflang="x-default" href="${pageUrl('pl')}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="YAMAS" />`,
    `<meta property="og:title" content="${esc(d['meta.title'])}" />`,
    `<meta property="og:description" content="${esc(d['meta.desc'])}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:locale" content="${OG_LOCALE[lang]}" />`,
    ...alt.map((l) => `<meta property="og:locale:alternate" content="${OG_LOCALE[l]}" />`),
    `<meta property="og:image" content="${img}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    ...fontPreloads.map((href) => `<link rel="preload" href="${href}" as="font" type="font/woff2" crossorigin />`),
    `<script type="application/ld+json">${JSON.stringify(jsonLd(lang)).replace(/</g, '\\u003c')}</script>`,
  ].join('\n    ')
}

export function sitemap() {
  const alternates = LANGS.map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${pageUrl(l)}"/>`).join('')
  const urls = LANGS.map((l) => `<url><loc>${pageUrl(l)}</loc>${alternates}</url>`).join('\n  ')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${urls}
</urlset>
`
}
