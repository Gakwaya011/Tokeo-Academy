import { useEffect, useRef } from 'react'
import Loader from './Loader'
import { useLocation } from 'react-router-dom'

const SEEN_KEY = 'tokeo_intro_seen'
// Preserve the original 2-second display followed by a 650ms fade.
const DURATION_MS = 2650

export default function VisitIntro() {
  const { pathname } = useLocation()
  const firstPath = useRef(pathname)
  const container = useRef<HTMLDivElement>(null)
  const showIntro = useRef<boolean | null>(null)

  useEffect(() => {
    const element = container.current
    if (!element) return
    if (pathname !== firstPath.current) {
      showIntro.current = false
      return
    }

    // Decide once per mount, including React Strict Mode's effect replay.
    // Start hidden so server markup and the initial client render match.
    if (showIntro.current === null) {
      showIntro.current = false
      try {
        const seen = sessionStorage.getItem(SEEN_KEY)
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        sessionStorage.setItem(SEEN_KEY, '1')
        showIntro.current = !seen && !reduceMotion
      } catch {
        // If storage is unavailable, skip rather than repeat on every visit.
      }
    }

    if (!showIntro.current) return
    element.hidden = false
    const timer = window.setTimeout(() => { element.hidden = true }, DURATION_MS)
    return () => {
      window.clearTimeout(timer)
      element.hidden = true
    }
  }, [pathname])

  return (
    <div ref={container} hidden aria-hidden="true" className="visit-intro pointer-events-none">
      <Loader message="Getting everything ready..." />
    </div>
  )
}
