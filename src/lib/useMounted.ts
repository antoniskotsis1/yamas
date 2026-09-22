import { useEffect, useState } from 'react'

/** False during the server render and hydration, true afterwards — for time/storage-dependent UI. */
export function useMounted() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted
}
