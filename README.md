# YAMAS — website

Greek street food, Warsaw. The approved **Direction B (“Appetite”)** homepage, built as a
**Vite + React + TypeScript** app with a PL / EN / ΕΛ language switch. It renders 1:1 with the
approved mockup `YAMAS_koncepcja-B_appetite.html`.

## Run

```bash
yarn install
yarn dev      # local dev server (http://localhost:5173)
yarn build    # type-check, build, then pre-render /, /en/, /el/ + sitemap, robots.txt, og.jpg -> dist/
yarn preview  # preview the production build
yarn test     # unit tests (opening-hours logic)
```

Node 18+ recommended.

## Stack

- **Vite 5** + **React 18** + **TypeScript** (strict)
- **Styling:** `src/index.css` is the mockup's stylesheet, ported verbatim (plain CSS classes and
  CSS custom properties for the brand tokens). Tailwind's preflight is deliberately not loaded so the
  app matches the mockup; `@tailwind utilities` is still available for small tweaks, and
  `tailwind.config.ts` mirrors the same colour tokens.
- Fonts: **Tinos** (serif) + **Figtree** (sans) + **Commissioner** (Greek fallback), **self-hosted** via
  `@fontsource/*` (imported in `src/main.tsx`; no requests to Google Fonts).
- Photos: `vite-imagetools` turns each photo into responsive WebP + JPEG sets at build time
  (see the imports at the top of `src/content.ts`); `<Photo>` renders them, lazy-loaded except the hero.

## Structure

```
src/
├── main.tsx                 app entry (wraps <App/> in <I18nProvider/>)
├── App.tsx                  section composition + skip link
├── index.css                the mockup's stylesheet
├── content.ts               static data: prices, hours, menu/timeline/team lists, images, links
├── i18n/dict.ts             ALL copy, per language (pl / en / el)  ← edit text here
├── i18n/i18n.tsx            language context: useI18n() → t(key), tf(key, vars), html(key)
├── entry-server.tsx         build-time render entry used by scripts/prerender.mjs
├── lib/hours.ts             open/closed logic in Warsaw time (+ hours.test.ts)
├── lib/consent.ts           cookie / external-media consent store
├── lib/seo.ts               <head> tags, schema.org Restaurant JSON-LD, sitemap
├── assets/                  photos, staff avatars, logos
└── components/              Nav, LangSwitch, Hero, About, Menu, Tags, Culture, History, Team,
                             Location, Contact, Footer, MobileOrderBar, Photo, OpenStatus,
                             Announcement, ConsentBanner
scripts/prerender.mjs        writes dist/index.html, dist/en/, dist/el/, sitemap.xml, robots.txt, og.jpg
```

## Internationalisation & pages

Each language is its own **pre-rendered static page**: `/` (Polish), `/en/`, `/el/`. Each has
its own `<html lang>`, title, description, canonical, `hreflang` alternates, Open Graph tags and
schema.org `Restaurant` data. The language switch links between them and keeps the current `#section`.
Old `?lang=en` links redirect to `/en/`. Any static host works; it just has to serve `en/index.html`
for `/en/`.

Every string lives in `src/i18n/dict.ts` under a key. The PL table defines the keys, and TypeScript
makes EN and EL provide every one of them. Components use `t(key)`, `tf(key, {time})` for
placeholders, and `dangerouslySetInnerHTML={html(key)}` for the few strings with inline markup.

## Running the site

- **Opening hours:** edit `SCHEDULE` in `src/content.ts`. Holidays go in `EXCEPTIONS`, e.g.
  `{ date: '2026-12-25', closed: true }` or `{ date: '2026-12-24', close: '15:00' }`. The hero
  shows a live "Open now · until 22:00" / "Closed · opens tomorrow at 11:00" status in
  **Warsaw time**, whatever the visitor's own timezone. The footer, Location hours and the
  structured data all come from the same schedule.
- **Announcement bar:** edit `announcement` in `src/content.ts`. Set `enabled: true`, write the
  three texts and give it a **new `id`**. Visitors who dismissed an earlier one will see the new
  one. It hides itself after `until`.
- **Privacy / cookies:** fonts are self-hosted and the Google map only loads after consent (the
  banner, or the "Show map" button), so the site makes no requests to Google by default. Visitors can
  reopen the choice from "Cookie settings" in the footer.
- **Domain:** `site.url` in `src/content.ts` (currently `https://gyrosyamas.pl`) feeds canonical
  URLs, `hreflang`, the sitemap and `og:image`. Change it if the production domain differs.

## Notes for the client

- The **live map** only renders in a real browser (not in some preview sandboxes).
- Still placeholders to replace: the **privacy policy** (footer + consent banner link to `#`), the
  **phone number**, the **Facebook/TikTok** links, the **staff
  avatars** (swap the images in `src/assets/staffN.jpg`), and the sample **menu prices**.
- Photos are the real YAMAS shots you provided; add more dish/interior photos in `src/assets/` and
  point to them in `src/content.ts` to remove any repeats.
- Ordering points at `https://yamas.goorder.pl/` (nav, hero, menu, footer and the sticky mobile bar).
