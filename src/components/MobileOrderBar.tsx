import { useEffect, useState } from 'react'
import { useI18n } from '../i18n/i18n'
import { site } from '../content'

/** Sticky order bar on small screens; hidden while the hero's own order button is on screen. */
export default function MobileOrderBar() {
  const { t } = useI18n()
  const [hide, setHide] = useState(false)

  useEffect(() => {
    const btn = document.getElementById('heroOrder')
    if (!btn || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([e]) => setHide(e.isIntersecting))
    io.observe(btn)
    return () => io.disconnect()
  }, [])

  return (
    <div className={`mcta${hide ? ' hide' : ''}`}>
      <a className="btn" href={site.orderUrl} target="_blank" rel="noopener">
        {t('cta.order')}
      </a>
    </div>
  )
}
