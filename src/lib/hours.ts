// Opening-hours logic, always in Warsaw time — independent of the visitor's own timezone.
import { EXCEPTIONS, SCHEDULE } from '../content'
import type { DayHours, Exception } from '../content'

export const TZ = 'Europe/Warsaw'
const DOW: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }

const fmt = new Intl.DateTimeFormat('en-GB', {
  timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit',
  weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
})

/** Warsaw calendar date (YYYY-MM-DD), weekday and minutes since midnight for an instant. */
export function warsawNow(now: Date) {
  const p = Object.fromEntries(fmt.formatToParts(now).map((x) => [x.type, x.value]))
  return {
    date: `${p.year}-${p.month}-${p.day}`,
    dow: DOW[p.weekday],
    minutes: Number(p.hour) * 60 + Number(p.minute),
  }
}

const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

/** Adds whole days to a YYYY-MM-DD date string. */
const addDays = (date: string, n: number) => {
  const d = new Date(`${date}T00:00:00Z`)
  d.setUTCDate(d.getUTCDate() + n)
  return d.toISOString().slice(0, 10)
}

/** Hours for a given Warsaw date, applying holiday exceptions; null = closed all day. */
export function hoursOn(date: string, dow: number, exceptions: Exception[] = EXCEPTIONS): DayHours | null {
  const base = SCHEDULE[dow]
  const ex = exceptions.find((e) => e.date === date)
  if (!ex) return base
  if ('closed' in ex) return null
  return { open: ex.open ?? base.open, close: ex.close ?? base.close }
}

export type Status =
  | { open: true; closesAt: string }
  | { open: false; opensAt: string; inDays: number; dow: number }
  | { open: false; opensAt: null }

export function getStatus(now: Date, exceptions: Exception[] = EXCEPTIONS): Status {
  const w = warsawNow(now)
  const today = hoursOn(w.date, w.dow, exceptions)
  if (today) {
    if (w.minutes >= toMin(today.open) && w.minutes < toMin(today.close)) {
      return { open: true, closesAt: today.close }
    }
    if (w.minutes < toMin(today.open)) return { open: false, opensAt: today.open, inDays: 0, dow: w.dow }
  }
  for (let d = 1; d <= 14; d++) {
    const dow = (w.dow + d) % 7
    const h = hoursOn(addDays(w.date, d), dow, exceptions)
    if (h) return { open: false, opensAt: h.open, inDays: d, dow }
  }
  return { open: false, opensAt: null }
}
