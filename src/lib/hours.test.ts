import { describe, expect, it, vi } from 'vitest'
import { getStatus, warsawNow } from './hours'

// 2026-09-21 is a Monday. Warsaw is UTC+2 in September (CEST), UTC+1 in December (CET).
const at = (iso: string) => new Date(iso)

describe('warsawNow', () => {
  it('uses Warsaw time, not the runtime timezone', () => {
    // 23:30 UTC on Friday = 01:30 Saturday in Warsaw
    expect(warsawNow(at('2026-09-25T23:30:00Z'))).toMatchObject({ date: '2026-09-26', dow: 6, minutes: 90 })
  })
})

describe('getStatus', () => {
  it('is closed before opening and opens today', () => {
    expect(getStatus(at('2026-09-21T08:00:00Z'))).toEqual({ open: false, opensAt: '11:00', inDays: 0, dow: 1 })
  })
  it('is open during the day', () => {
    expect(getStatus(at('2026-09-21T12:00:00Z'))).toEqual({ open: true, closesAt: '22:00' })
  })
  it('is closed after closing and opens tomorrow', () => {
    expect(getStatus(at('2026-09-21T20:30:00Z'))).toEqual({ open: false, opensAt: '11:00', inDays: 1, dow: 2 })
  })
  it('stays open until midnight on Friday', () => {
    expect(getStatus(at('2026-09-25T21:30:00Z'))).toEqual({ open: true, closesAt: '24:00' }) // 23:30 Warsaw
  })
  it('is closed just after midnight Saturday, opens Saturday 11:00', () => {
    expect(getStatus(at('2026-09-25T22:10:00Z'))).toEqual({ open: false, opensAt: '11:00', inDays: 0, dow: 6 })
  })
  it('Sunday opens at 12:00', () => {
    expect(getStatus(at('2026-09-27T09:30:00Z'))).toEqual({ open: false, opensAt: '12:00', inDays: 0, dow: 0 })
  })
  it('respects a holiday closure and skips to the next open day', () => {
    const ex = [{ date: '2026-12-25', closed: true as const }]
    // Thu 24 Dec 22:30 Warsaw (CET) -> Fri 25 closed -> opens Sat 26
    expect(getStatus(at('2026-12-24T21:30:00Z'), ex)).toEqual({ open: false, opensAt: '11:00', inDays: 2, dow: 6 })
  })
  it('respects shortened hours', () => {
    const ex = [{ date: '2026-12-24', close: '15:00' }]
    expect(getStatus(at('2026-12-24T14:30:00Z'), ex)).toMatchObject({ open: false, inDays: 1 }) // 15:30 Warsaw
  })
  it('gives the same answer for a visitor in New York', () => {
    vi.stubEnv('TZ', 'America/New_York') // Node applies TZ changes immediately
    expect(new Date('2026-09-21T12:00:00Z').getHours()).toBe(8) // sanity: runtime really is in New York
    expect(getStatus(at('2026-09-21T12:00:00Z'))).toEqual({ open: true, closesAt: '22:00' })
    vi.unstubAllEnvs()
  })
})
