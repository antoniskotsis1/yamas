import { useI18n } from '../i18n/i18n'
import { team } from '../content'
import Photo from './Photo'

export default function Team() {
  const { t } = useI18n()
  return (
    <section id="team" className="team">
      <div className="wrap">
        <div className="sec-head">
          <div className="kicker">{t('team.k')}</div>
          <h2>{t('team.h')}</h2>
          <p className="lead2">{t('team.lead')}</p>
        </div>
        <div className="team-grid">
          {team.map((m) => (
            <figure key={m.name} className="member">
              <div className="ava">
                <Photo pic={m.img} sizes="200px" />
              </div>
              <figcaption>
                <span className="nm">{m.name}</span>
                <span className="rl">{t(m.role)}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
