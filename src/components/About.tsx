import { useI18n } from '../i18n/i18n'
import { images } from '../content'
import Photo from './Photo'

export default function About() {
  const { t, html } = useI18n()
  return (
    <section id="about" className="about">
      <div className="wrap about-grid">
        <div className="photo about-photo has-mn">
          <Photo pic={images.store} alt={t('about.alt')} sizes="(max-width: 900px) 100vw, 580px" />
          <div className="mn" />
        </div>
        <div>
          <div className="kicker">{t('about.k')}</div>
          <h2>{t('about.h')}</h2>
          <p className="lead2">{t('about.lead')}</p>
          <ul>
            <li dangerouslySetInnerHTML={html('about.p1')} />
            <li dangerouslySetInnerHTML={html('about.p2')} />
            <li dangerouslySetInnerHTML={html('about.p3')} />
          </ul>
        </div>
      </div>
    </section>
  )
}
