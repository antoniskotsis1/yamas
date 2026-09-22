import { useI18n } from '../i18n/i18n'
import { site } from '../content'

const icon = { width: 15, height: 15 }

export default function Contact() {
  const { t } = useI18n()
  return (
    <section id="contact" className="contact">
      <div className="wrap">
        <div className="kicker">{t('con.k')}</div>
        <h2>{t('con.h')}</h2>
        <div className="contact-grid">
          <div className="ccard">
            <h3>{t('con.g.h')}</h3>
            <p>{t('con.g.p')}</p>
            <a className="line" href={`mailto:${site.emailGeneral}`}>{site.emailGeneral}</a>
            <a className="line" href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a>
            <div className="socials">
              <a href={site.instagram} target="_blank" rel="noopener">
                <svg {...icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
                Instagram
              </a>
              <a href={site.facebook}>
                <svg {...icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v7h4v-7h3l1-4h-4V8z" />
                </svg>
                Facebook
              </a>
              <a href={site.tiktok}>
                <svg {...icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5M14 3c.5 3 2.5 5 5.5 5" />
                </svg>
                TikTok
              </a>
            </div>
          </div>
          <div className="ccard">
            <h3>{t('con.b.h')}</h3>
            <p>{t('con.b.p')}</p>
            <a className="line" href={`mailto:${site.emailBusiness}`}>{site.emailBusiness}</a>
            <div className="spacer" />
            <a className="btn" href={`mailto:${site.emailBusiness}`}>{t('con.b.btn')}</a>
          </div>
        </div>
      </div>
    </section>
  )
}
