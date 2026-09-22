// Static business facts, images and data lists. All translatable copy lives in src/i18n/dict.ts.
import type { Key } from './i18n/dict'

// Photos are processed at build time by vite-imagetools into responsive WebP + JPEG sets
// (AVIF was tried: at comparable quality it came out larger than WebP for these photos).
// Widths never exceed the source image (food1 978px, food2 703px, store 773px, staff 640px).
import food1 from './assets/food1.jpg?w=480;960&format=webp;jpg&quality=72&as=picture'
import food2 from './assets/food2.jpg?w=480;700&format=webp;jpg&quality=72&as=picture'
import store from './assets/store.jpg?w=480;770&format=webp;jpg&quality=72&as=picture'
import staff1 from './assets/staff1.jpg?w=200;400&format=webp;jpg&quality=72&as=picture'
import staff2 from './assets/staff2.jpg?w=200;400&format=webp;jpg&quality=72&as=picture'
import staff3 from './assets/staff3.jpg?w=200;400&format=webp;jpg&quality=72&as=picture'
import staff4 from './assets/staff4.jpg?w=200;400&format=webp;jpg&quality=72&as=picture'
import logoBlue from './assets/logo-blue.png'
import logoBeige from './assets/logo-beige.png'
import type { Lang } from './i18n/dict'

/** Output of an `?as=picture` image import. */
export interface Pic {
  sources: Record<string, string>
  img: { src: string; w: number; h: number }
}

export const images = { food1, food2, store, logoBlue, logoBeige }

/** Prices, the street name and the slogan are the same in every language on purpose. */
export const site = {
  /** Production origin — used for canonical URLs, hreflang, sitemap and og:image. TODO: confirm. */
  url: 'https://gyrosyamas.pl',
  name: 'YAMAS',
  slogan: 'Greek Food • Better Mood',
  orderUrl: 'https://yamas.goorder.pl/',
  instagram: 'https://www.instagram.com/yamas.warsaw/',
  facebook: '#', // placeholder — client to confirm
  tiktok: '#', // placeholder — client to confirm
  emailGeneral: 'hello@gyrosyamas.pl',
  emailBusiness: 'wspolpraca@gyrosyamas.pl',
  phone: '+48 000 000 000', // placeholder — client to confirm
  street: 'Świętokrzyska 30',
  postcode: '00-116',
  city: 'Warszawa',
  geo: { lat: 52.2350313, lng: 21.0063074 },
  mapEmbed: (lang: string) =>
    `https://maps.google.com/maps?q=52.2350313,21.0063074&z=16&hl=${lang}&output=embed`,
  mapDirections:
    'https://www.google.com/maps/dir/?api=1&destination=Yamas+%C5%9Awi%C4%99tokrzyska+30+Warszawa',
}

export const nav: { id: string; label: Key }[] = [
  { id: 'menu', label: 'nav.menu' },
  { id: 'about', label: 'nav.about' },
  { id: 'history', label: 'nav.history' },
  { id: 'team', label: 'nav.team' },
  { id: 'location', label: 'nav.loc' },
  { id: 'contact', label: 'nav.contact' },
]

/** Regular opening hours in Warsaw time, indexed by JS weekday (0 = Sunday). '24:00' = midnight. */
export interface DayHours { open: string; close: string }
export const SCHEDULE: Record<number, DayHours> = {
  0: { open: '12:00', close: '22:00' },
  1: { open: '11:00', close: '22:00' },
  2: { open: '11:00', close: '22:00' },
  3: { open: '11:00', close: '22:00' },
  4: { open: '11:00', close: '22:00' },
  5: { open: '11:00', close: '24:00' },
  6: { open: '11:00', close: '24:00' },
}

/** One-off changes (holidays): close for the day, or override open/close. Dates in Warsaw time. */
export type Exception = { date: string; closed: true } | { date: string; open?: string; close?: string }
export const EXCEPTIONS: Exception[] = [
  // { date: '2026-12-24', close: '15:00' },
  // { date: '2026-12-25', closed: true },
]

/** How the weekly hours are grouped for display (Location + footer). */
const hourGroups: { label: Key; days: number[] }[] = [
  { label: 'd.mt', days: [1, 2, 3, 4] },
  { label: 'd.fs', days: [5, 6] },
  { label: 'd.su', days: [0] },
]
export const hourRows = hourGroups.map((g) => {
  const h = SCHEDULE[g.days[0]]
  return {
    ...g,
    hours: `${h.open}–${h.close}`,
    short: `${h.open.replace(':00', '')}–${h.close.replace(':00', '')}`,
  }
})

/**
 * Slim dismissible bar above the header. Set `enabled: true` and give each new message a new `id`
 * (a dismissed id stays hidden for that visitor; a new id shows again). Hidden after `until`.
 */
export interface Announcement {
  id: string
  enabled: boolean
  until?: string // YYYY-MM-DD, inclusive, Warsaw time
  text: Record<Lang, string>
  link?: { href: string; label: Record<Lang, string> }
}
export const announcement: Announcement = {
  id: 'example-2026-10',
  enabled: false,
  until: '2026-10-31',
  text: {
    pl: 'Nowość: souvlaki z halloumi — tylko w październiku!',
    en: 'New: halloumi souvlaki — October only!',
    el: 'Νέο: σουβλάκι χαλούμι — μόνο τον Οκτώβριο!',
  },
  link: { href: '#menu', label: { pl: 'Zobacz menu', en: 'See the menu', el: 'Δες το μενού' } },
}

export type Allergen = 'G' | 'M' | 'O'
export const allergenKey: Record<Allergen, Key> = { G: 'al.G', M: 'al.M', O: 'al.O' }

export interface Featured {
  name: Key; desc: Key; badge: Key; alt: Key; price: string; tags: Allergen[]; img: Pic; pos?: string
}
export const featured: Featured[] = [
  { name: 'm.gyros.n', desc: 'm.gyros.d', badge: 'menu.badge1', alt: 'hero.alt', price: '26 zł', tags: ['G', 'M'], img: food2, pos: 'center 38%' },
  { name: 'm.souv.n', desc: 'm.souv.d', badge: 'menu.badge2', alt: 'm.souv.alt', price: '29 zł', tags: ['G', 'M'], img: food1 },
]

export interface ListItem { name: Key; desc: Key; price: string; tags: Allergen[]; veg?: boolean }
export const menuList: ListItem[] = [
  { name: 'm.chick.n', desc: 'm.chick.d', price: '27 zł', tags: ['G', 'M'] },
  { name: 'm.hal.n', desc: 'm.hal.d', price: '25 zł', tags: ['G', 'M'], veg: true },
  { name: 'm.fries.n', desc: 'm.fries.d', price: '15 zł', tags: ['M'], veg: true },
  { name: 'm.bak.n', desc: 'm.bak.d', price: '12 zł', tags: ['G', 'O'], veg: true },
]

export const timeline: { y: Key; t: Key }[] = [
  { y: 'tl1.y', t: 'tl1.t' }, { y: 'tl2.y', t: 'tl2.t' }, { y: 'tl3.y', t: 'tl3.t' },
  { y: 'tl4.y', t: 'tl4.t' }, { y: 'tl5.y', t: 'tl5.t' },
]

export const dishes: { n: Key; o: Key; what: Key; how: Key }[] = [
  { n: 'sv.n', o: 'sv.o', what: 'sv.what', how: 'sv.how' },
  { n: 'gy.n', o: 'gy.o', what: 'gy.what', how: 'gy.how' },
  { n: 'pt.n', o: 'pt.o', what: 'pt.what', how: 'pt.how' },
]

/** Greek words stay in Greek in every language; transliteration hides itself when empty. */
export const glossary: { w: string; tr: Key; me: Key }[] = [
  { w: 'Απ’ όλα', tr: 'g1.t', me: 'g1.m' },
  { w: 'Τυλιχτό', tr: 'g2.t', me: 'g2.m' },
  { w: 'Μερίδα', tr: 'g3.t', me: 'g3.m' },
  { w: 'Καλαμάκι', tr: 'g4.t', me: 'g4.m' },
  { w: 'Γεια μας!', tr: 'g5.t', me: 'g5.m' },
]

export const team: { name: string; role: Key; img: Pic }[] = [
  { name: 'Dimitris', role: 'r1', img: staff1 },
  { name: 'Marek', role: 'r2', img: staff2 },
  { name: 'Kasia', role: 'r3', img: staff3 },
  { name: 'Ola', role: 'r4', img: staff4 },
]
