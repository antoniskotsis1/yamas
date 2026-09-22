import { useEffect, useState } from 'react'
import { useI18n } from '../i18n/i18n'
import { onConsentSettings, useConsent } from '../lib/consent'

/** Shown until the visitor chooses; reopened from the footer's "Cookie settings". */
export default function ConsentBanner() {
  const { t } = useI18n()
  const { consent, save } = useConsent()
  const [reopened, setReopened] = useState(false)

  useEffect(() => onConsentSettings(() => setReopened(true)), [])

  const visible = consent === null || reopened
  if (consent === undefined || !visible) return null

  const choose = (media: boolean) => {
    save(media)
    setReopened(false)
  }

  return (
    <div className="consent" role="dialog" aria-live="polite" aria-labelledby="consent-title">
      <p className="consent-title" id="consent-title">{t('cc.title')}</p>
      <p className="consent-text">
        {t('cc.text')} <a href="#">{t('f.privacy')}</a>
      </p>
      <div className="consent-actions">
        <button type="button" className="btn" onClick={() => choose(true)}>
          {t('cc.accept')}
        </button>
        <button type="button" className="btn ghost" onClick={() => choose(false)}>
          {t('cc.necessary')}
        </button>
      </div>
    </div>
  )
}
