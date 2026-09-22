import { useI18n } from '../i18n/i18n'
import { featured, menuList, site } from '../content'
import Tags from './Tags'
import Photo from './Photo'

export default function Menu() {
  const { t, html } = useI18n()
  return (
    <section id="menu">
      <div className="wrap">
        <div className="menu-head">
          <div>
            <div className="kicker">{t('menu.k')}</div>
            <h2>{t('menu.h')}</h2>
          </div>
          <a className="btn ghost" href={site.orderUrl} target="_blank" rel="noopener">
            {t('menu.full')}
          </a>
        </div>

        <div className="feat-grid">
          {featured.map((f) => (
            <article key={f.name} className="feat">
              <div className="photo">
                <Photo pic={f.img} alt={t(f.alt)} sizes="(max-width: 900px) 100vw, 580px" pos={f.pos} />
                <span className="badge">{t(f.badge)}</span>
              </div>
              <div className="body">
                <div className="dish-top">
                  <h3>{t(f.name)}</h3>
                  <span className="price">{f.price}</span>
                </div>
                <p className="desc">{t(f.desc)}</p>
                <Tags tags={f.tags} />
              </div>
            </article>
          ))}
        </div>

        <div className="menu-list">
          {menuList.map((m) => (
            <div key={m.name} className="mi">
              <h3>
                {m.veg ? (
                  <>
                    <span>{t(m.name)}</span>
                    <abbr className="veg" title={t('m.veg')}>
                      (v)
                    </abbr>
                  </>
                ) : (
                  t(m.name)
                )}
              </h3>
              <span className="price">{m.price}</span>
              <p className="desc">{t(m.desc)}</p>
              <Tags tags={m.tags} />
            </div>
          ))}
        </div>

        <p className="legend" dangerouslySetInnerHTML={html('menu.legend')} />
      </div>
    </section>
  )
}
