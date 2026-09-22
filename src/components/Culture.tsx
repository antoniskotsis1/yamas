import { useI18n } from '../i18n/i18n'
import { images } from '../content'
import Photo from './Photo'

export default function Culture() {
  const { t, html } = useI18n()
  return (
    <section id="culture" className="culture">
      <div className="wrap culture-grid">
        <div>
          <div className="kicker">{t('cul.k')}</div>
          <h2>{t('cul.h')}</h2>
          <p className="lead2" dangerouslySetInnerHTML={html('cul.lead')} />
          <div className="culture-facts">
            <div className="fact">
              <div className="n">{t('cul.f1n')}</div>
              <div className="l">{t('cul.f1l')}</div>
            </div>
            <div className="fact">
              <div className="n">{t('cul.f2n')}</div>
              <div className="l">{t('cul.f2l')}</div>
            </div>
          </div>
        </div>
        <div className="photo scrim culture-photo has-mn">
          <Photo pic={images.food1} alt={t('m.souv.alt')} sizes="(max-width: 900px) 100vw, 580px" />
          <div className="cap">{t('cul.cap')}</div>
          <div className="mn" />
        </div>
      </div>
    </section>
  )
}
