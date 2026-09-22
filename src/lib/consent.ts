// Minimal consent store. With self-hosted fonts and a click-to-load map, the site sets no cookies
// by default; the only opt-in category is "external media" (the Google Maps embed).
import { useCallback, useEffect, useState } from 'react'

const KEY = 'yamas-consent'
const CHANGE = 'yamas:consent'
const OPEN = 'yamas:consent-open'

export interface Consent {
  v: 1
  media: boolean
  ts: number
}

function read(): Consent | null {
  try {
    const raw = window.localStorage.getItem(KEY)
    const c = raw ? (JSON.parse(raw) as Consent) : null
    return c && c.v === 1 ? c : null
  } catch {
    return null
  }
}

/**
 * `consent` is `undefined` until mounted (server render / first paint), `null` when the visitor
 * hasn't chosen yet, otherwise the stored choice.
 */
export function useConsent() {
  const [consent, setConsent] = useState<Consent | null | undefined>(undefined)

  useEffect(() => {
    const sync = () => setConsent(read())
    sync()
    window.addEventListener(CHANGE, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(CHANGE, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  const save = useCallback((media: boolean) => {
    const c: Consent = { v: 1, media, ts: Date.now() }
    try {
      window.localStorage.setItem(KEY, JSON.stringify(c))
    } catch {
      /* storage unavailable — keep the choice for this page view only */
    }
    setConsent(c)
    window.dispatchEvent(new Event(CHANGE))
  }, [])

  return { consent, save }
}

/** Reopen the consent banner (footer "Cookie settings"). */
export const openConsentSettings = () => window.dispatchEvent(new Event(OPEN))
export const onConsentSettings = (fn: () => void) => {
  window.addEventListener(OPEN, fn)
  return () => window.removeEventListener(OPEN, fn)
}
