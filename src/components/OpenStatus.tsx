import { useEffect, useState } from 'react'
import { useI18n } from '../i18n/i18n'
import { getStatus } from '../lib/hours'
import type { Status } from '../lib/hours'
import { useMounted } from '../lib/useMounted'

const weekday = (lang: string, dow: number) =>
  // 2026-01-04 is a Sunday
  new Intl.DateTimeFormat(lang, { weekday: 'long', timeZone: 'UTC' }).format(new Date(Date.UTC(2026, 0, 4 + dow)))

/** "Open now · until 22:00" / "Closed · opens tomorrow at 11:00", in Warsaw time, refreshed every 30 s. */
export default function OpenStatus() {
  const { t, tf, lang } = useI18n()
  const mounted = useMounted()
  const [status, setStatus] = useState<Status | null>(null)

  useEffect(() => {
    const tick = () => setStatus(getStatus(new Date()))
    tick()
    const id = window.setInterval(tick, 30_000)
    return () => window.clearInterval(id)
  }, [])

  // Server render: invisible placeholder of similar length, so nothing shifts when it fills in.
  if (!mounted || !status) {
    return (
      <span className="status" style={{ visibility: 'hidden' }} aria-hidden="true">
        <b>{t('st.open')}</b> · {tf('st.until', { time: '22:00' })}
      </span>
    )
  }

  let rest = ''
  if (status.open) rest = tf('st.until', { time: status.closesAt })
  else if (status.opensAt && status.inDays === 0) rest = tf('st.today', { time: status.opensAt })
  else if (status.opensAt && status.inDays === 1) rest = tf('st.tomorrow', { time: status.opensAt })
  else if (status.opensAt) rest = tf('st.day', { day: weekday(lang, status.dow), time: status.opensAt })

  return (
    <span className={`status ${status.open ? 'is-open' : 'is-closed'}`}>
      <b>{t(status.open ? 'st.open' : 'st.closed')}</b>
      {rest && <> · {rest}</>}
    </span>
  )
}
