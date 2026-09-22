import { useI18n } from '../i18n/i18n'
import { hourRows, images, nav, site } from '../content'
import { openConsentSettings } from '../lib/consent'

export default function Footer() {
  const { t } = useI18n()
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <img src={images.logoBeige} alt="YAMAS" width={140} height={26} />
            <p>{t('f.tag')}</p>
            <span className="slg">{site.slogan}</span>
          </div>
          <div>
            <h4>{t('f.visit')}</h4>
            <address>
              {site.street}
              <br />
              {site.postcode} {t('loc.city')}
            </address>
            <ul style={{ marginTop: 14 }}>
              {hourRows.map((r) => (
                <li key={r.label}>
                  {t(r.label)} {r.short}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>{t('f.explore')}</h4>
            <ul>
              {nav.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`}>{t(item.label)}</a>
                </li>
              ))}
              <li>
                <a href={site.orderUrl} target="_blank" rel="noopener">{t('cta.order')}</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>{t('f.follow')}</h4>
            <ul>
              <li><a href={site.instagram} target="_blank" rel="noopener">Instagram</a></li>
              <li><a href={site.facebook}>Facebook</a></li>
              <li><a href={site.tiktok}>TikTok</a></li>
              <li style={{ marginTop: 8 }}>
                <a href={`mailto:${site.emailGeneral}`}>{site.emailGeneral}</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="foot-mn" />
        <div className="foot-legal">
          <div suppressHydrationWarning>
            © {new Date().getFullYear()} YAMAS. {t('f.rights')}
          </div>
          <nav>
            <a href="#">{t('f.privacy')}</a>
            <button type="button" className="linklike" onClick={openConsentSettings}>
              {t('cc.settings')}
            </button>
            <a href="#top">{t('f.top')}</a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
