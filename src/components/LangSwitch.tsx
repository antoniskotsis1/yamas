import type { MouseEvent } from 'react'
import { LANGS, pathFor, useI18n } from '../i18n/i18n'
import type { Lang } from '../i18n/i18n'

const LABEL: Record<Lang, { short: string; title: string }> = {
  pl: { short: 'PL', title: 'Polski' },
  en: { short: 'EN', title: 'English' },
  el: { short: 'ΕΛ', title: 'Ελληνικά' },
}

/** Real links to each language's pre-rendered page; keeps the current #section on switch. */
export default function LangSwitch() {
  const { lang, t } = useI18n()
  const go = (l: Lang) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.location.href = pathFor(l) + window.location.hash
  }
  return (
    <div className="lang-switch" role="group" aria-label={t('a.lang')}>
      {LANGS.map((l) => (
        <a
          key={l}
          href={pathFor(l)}
          hrefLang={l}
          lang={l}
          title={LABEL[l].title}
          aria-current={l === lang ? 'true' : undefined}
          onClick={go(l)}
        >
          {LABEL[l].short}
        </a>
      ))}
    </div>
  )
}
