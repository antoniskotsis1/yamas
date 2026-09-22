import { useEffect, useState } from 'react'
import { useI18n } from '../i18n/i18n'
import { hourRows, site } from '../content'
import { useConsent } from '../lib/consent'
import { warsawNow } from '../lib/hours'

export default function Location() {
  const { t, lang } = useI18n()
  const { consent, save } = useConsent()
  // "today" is decided in Warsaw time, after mount (the page is pre-rendered at build time)
  const [dow, setDow] = useState<number | null>(null)
  useEffect(() => setDow(warsawNow(new Date()).dow), [])
  // Google Maps only loads with "external media" consent (given here or in the banner)
  const showMap = consent?.media === true
  return (
    <section id="location" className="location">
      <div className="wrap">
        <div className="sec-head">
          <div className="kicker">{t('loc.k')}</div>
          <h2>{t('loc.h')}</h2>
        </div>
        <div className="loc-grid">
          <div className="loc-map">
            <div className="map-fb">
              <span className="map-fb-pin" aria-hidden="true" />
              <span className="map-fb-adr">
                {site.street} · {t('loc.city')}
              </span>
              {!showMap && (
                <>
                  <button type="button" className="btn ghost map-fb-btn" onClick={() => save(true)}>
                    {t('map.show')}
                  </button>
                  <span className="map-fb-note">
                    {t('map.note')}{' '}
                    <a href={site.mapDirections} target="_blank" rel="noopener">
                      {t('map.open')}
                    </a>
                  </span>
                </>
              )}
            </div>
            {showMap && (
              <iframe
                title={t('loc.map')}
                src={site.mapEmbed(lang)}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            )}
          </div>
          <div className="loc-info">
            <div className="row">
              <div className="k">{t('loc.addr.k')}</div>
              <address className="v" style={{ fontStyle: 'normal' }}>
                {t('loc.addr')}
              </address>
            </div>
            <div className="row">
              <div className="k">{t('loc.hours.k')}</div>
              <dl className="hours">
                {hourRows.map((r) => {
                  const cls = dow != null && r.days.includes(dow) ? 'today' : undefined
                  return [
                    <dt key={`${r.label}-dt`} className={cls}>{t(r.label)}</dt>,
                    <dd key={`${r.label}-dd`} className={cls}>{r.hours}</dd>,
                  ]
                })}
              </dl>
            </div>
            <div className="row">
              <div className="k">{t('loc.to.k')}</div>
              <div className="v">{t('loc.to')}</div>
            </div>
            <p className="soon">{t('loc.soon')}</p>
            <a className="btn" href={site.mapDirections} target="_blank" rel="noopener">
              {t('loc.nav')}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
