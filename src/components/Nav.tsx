import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n/i18n'
import { images, nav, site } from '../content'
import LangSwitch from './LangSwitch'

export default function Nav() {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const navRef = useRef<HTMLElement>(null)
  const burgerRef = useRef<HTMLButtonElement>(null)

  // header border/shadow once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // scroll-spy: underline the section currently in view
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => en.isIntersecting && setActive(en.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    nav.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  // close the mobile menu on Escape or a click outside it
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        burgerRef.current?.focus()
      }
    }
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node
      if (!navRef.current?.contains(target) && !burgerRef.current?.contains(target)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('click', onClick)
    }
  }, [open])

  return (
    <header className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className="wrap nav-in">
        <a className="nav-logo" href="#top" aria-label={t('a.home')}>
          <img src={images.logoBlue} alt="YAMAS" width={118} height={22} />
        </a>
        <nav ref={navRef} className={`nav-links${open ? ' open' : ''}`} id="menuNav" aria-label="Main">
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={active === item.id ? 'true' : undefined}
              onClick={() => setOpen(false)}
            >
              {t(item.label)}
            </a>
          ))}
          <a className="btn m-order" href={site.orderUrl} target="_blank" rel="noopener" onClick={() => setOpen(false)}>
            {t('cta.order')}
          </a>
        </nav>
        <div className="nav-tools">
          <LangSwitch />
          <a className="btn" href={site.orderUrl} target="_blank" rel="noopener">
            {t('cta.order')}
          </a>
          <button
            ref={burgerRef}
            className="burger"
            type="button"
            aria-label={t('a.burger')}
            aria-expanded={open}
            aria-controls="menuNav"
            onClick={() => setOpen((o) => !o)}
          >
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}
