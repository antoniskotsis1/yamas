import { useEffect, useState } from 'react'
import { useI18n } from '../i18n/i18n'
import { announcement as a } from '../content'
import { warsawNow } from '../lib/hours'

const STORAGE_KEY = 'yamas-ann'

/**
 * Dismissible bar above the header, configured in content.ts. A tiny inline script in index.html
 * sets <html data-ann-off="…"> before first paint, so a dismissed bar never flashes on reload.
 */
export default function Announcement() {
  const { lang, t } = useI18n()
  const [dismissed, setDismissed] = useState(false)

  // Expiry is checked after mount so the server-rendered and first client render always agree.
  useEffect(() => {
    if (a.until != null && warsawNow(new Date()).date > a.until) setDismissed(true)
  }, [])

  if (!a.enabled || dismissed) return null

  const dismiss = () => {
    setDismissed(true)
    try {
      window.localStorage.setItem(STORAGE_KEY, a.id)
    } catch {
      /* ignore */
    }
  }

  return (
    <>
      {/* raw CSS: React would HTML-escape the quotes inside a <style> text child on the server */}
      <style dangerouslySetInnerHTML={{ __html: `html[data-ann-off=${JSON.stringify(a.id).replace(/</g, '')}] .ann{display:none}` }} />
      <div className="ann" role="region" aria-label={a.text[lang]}>
        <p>
          {a.text[lang]}
          {a.link && (
            <>
              {' '}
              <a href={a.link.href}>{a.link.label[lang]} →</a>
            </>
          )}
        </p>
        <button type="button" className="ann-x" aria-label={t('ann.close')} onClick={dismiss}>
          ×
        </button>
      </div>
    </>
  )
}
