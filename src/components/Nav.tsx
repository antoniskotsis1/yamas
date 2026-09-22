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
  // while a clicked link's smooth scroll is running, the spy stays quiet
  const lockRef = useRef<{ timer: number } | null>(null)

  // header border/shadow + scroll-spy, computed once per frame.
  // The spy picks the last section whose top has passed ~35% of the viewport, so exactly one
  // link is active at a time (the old IntersectionObserver band flipped between neighbours).
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      setScrolled(window.scrollY > 8)
      if (lockRef.current) return
      const line = window.innerHeight * 0.35
      let current = ''
      for (const { id } of nav) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }
      // at the very bottom the last (short) section may never reach the line
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      if (atBottom && current) current = nav[nav.length - 1].id
      setActive(current)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    const unlock = () => {
      if (!lockRef.current) return
      clearTimeout(lockRef.current.timer)
      lockRef.current = null
      onScroll()
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    window.addEventListener('scrollend', unlock)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('scrollend', unlock)
      if (lockRef.current) clearTimeout(lockRef.current.timer)
    }
  }, [])

  const goTo = (id: string) => {
    setOpen(false)
    setActive(id)
    if (lockRef.current) clearTimeout(lockRef.current.timer)
    // fallback for browsers without `scrollend` (Safari < 18) or when no scroll happens
    const timer = window.setTimeout(() => {
      lockRef.current = null
      window.dispatchEvent(new Event('scroll'))
    }, 1200)
    lockRef.current = { timer }
  }

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
              onClick={() => goTo(item.id)}
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
