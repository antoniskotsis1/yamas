import { useI18n } from '../i18n/i18n'
import { dishes, glossary, timeline } from '../content'

export default function History() {
  const { t, html } = useI18n()
  return (
    <section id="history" className="history">
      <div className="wrap">
        <div className="sec-head">
          <div className="kicker">{t('his.k')}</div>
          <h2 dangerouslySetInnerHTML={html('his.h')} />
          <p className="lead2">{t('his.lead')}</p>
        </div>

        <ol className="timeline" aria-label={t('tl.aria')}>
          {timeline.map((s) => (
            <li key={s.y}>
              <div className="y">{t(s.y)}</div>
              <p className="t">{t(s.t)}</p>
            </li>
          ))}
        </ol>

        <div className="dishes">
          {dishes.map((d) => (
            <article key={d.n} className="dish">
              <h3>{t(d.n)}</h3>
              <p className="origin">{t(d.o)}</p>
              <dl>
                <dt>{t('d.what')}</dt>
                <dd>{t(d.what)}</dd>
                <dt>{t('d.how')}</dt>
                <dd dangerouslySetInnerHTML={html(d.how)} />
              </dl>
            </article>
          ))}
        </div>

        <div className="gloss">
          <div>
            <h3>{t('gl.h')}</h3>
            <p className="sub">{t('gl.sub')}</p>
          </div>
          <ul>
            {glossary.map((g) => (
              <li key={g.w}>
                <div className="w" lang="el">
                  {g.w}
                </div>
                <span className="tr">{t(g.tr)}</span>
                <p className="me">{t(g.me)}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
