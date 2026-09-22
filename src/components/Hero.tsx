import { useI18n } from '../i18n/i18n'
import { images, site } from '../content'
import OpenStatus from './OpenStatus'
import Photo from './Photo'

export default function Hero() {
  const { t, html } = useI18n()
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div>
          <div className="hero-logo">
            <img src={images.logoBlue} alt="YAMAS" width={800} height={149} />
          </div>
          <span className="slogan">{site.slogan}</span>
          <h1 dangerouslySetInnerHTML={html('hero.h1')} />
          <p className="lead">{t('hero.lead')}</p>
          <div className="hero-cta">
            <a className="btn" href={site.orderUrl} target="_blank" rel="noopener" id="heroOrder">
              {t('cta.order')}
            </a>
            <a className="btn ghost" href="#menu">
              {t('hero.menu')}
            </a>
          </div>
          <div className="hero-meta">
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
              <OpenStatus />
            </span>
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21z" />
                <circle cx="12" cy="9.5" r="2.5" />
              </svg>
              <span>
                {site.street}, {t('loc.city')}
              </span>
            </span>
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" />
                <circle cx="7" cy="17.5" r="1.8" />
                <circle cx="17" cy="17.5" r="1.8" />
              </svg>
              <span>{t('hero.pickup')}</span>
            </span>
          </div>
        </div>
        <div className="photo scrim hero-photo">
          <Photo pic={images.food2} alt={t('hero.alt')} sizes="(max-width: 900px) 100vw, 580px" priority />
          <div className="cap">{t('hero.cap')}</div>
        </div>
      </div>
    </section>
  )
}
