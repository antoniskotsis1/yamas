import { createContext, useContext, useEffect, useMemo } from 'react'
import type { ReactNode } from 'react'
import { DICT, LANGS } from './dict'
import type { Key, Lang } from './dict'

export { LANGS }
export type { Key, Lang }

/** Each language is its own pre-rendered page: / (pl), /en/, /el/. */
export const pathFor = (l: Lang) => (l === 'pl' ? '/' : `/${l}/`)

export const isLang = (v: string | null | undefined): v is Lang =>
  v != null && (LANGS as readonly string[]).includes(v)

export function langFromPath(pathname: string): Lang {
  const seg = pathname.split('/').filter(Boolean)[0]
  return isLang(seg) ? seg : 'pl'
}

interface I18nValue {
  lang: Lang
  /** Plain string for the active language. */
  t: (key: Key) => string
  /** String with {placeholders} filled in, e.g. tf('st.until', { time: '22:00' }). */
  tf: (key: Key, vars: Record<string, string>) => string
  /** For copy that carries inline markup (<b>, <em>, <br>) — spread into dangerouslySetInnerHTML. */
  html: (key: Key) => { __html: string }
}

const I18nContext = createContext<I18nValue | null>(null)

export function I18nProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  // Pre-rendered pages already carry the right <html lang>, title and description;
  // this keeps the dev server (no pre-render) in sync too.
  useEffect(() => {
    document.documentElement.lang = lang
    document.title = DICT[lang]['meta.title']
  }, [lang])

  const value = useMemo<I18nValue>(() => {
    const d = DICT[lang]
    return {
      lang,
      t: (key) => d[key],
      tf: (key, vars) => d[key].replace(/\{(\w+)\}/g, (_, k: string) => vars[k] ?? ''),
      html: (key) => ({ __html: d[key] }),
    }
  }, [lang])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within <I18nProvider>')
  return ctx
}
