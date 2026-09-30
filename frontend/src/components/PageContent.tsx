import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

export default function PageContent({ children, animate }: { children: ReactNode; animate: boolean }) {
  const main = useRef<HTMLElement>(null)
  const { pathname, hash } = useLocation()
  const previousPath = useRef(pathname)

  useEffect(() => {
    const changedPage = previousPath.current !== pathname
    previousPath.current = pathname

    if (hash) {
      try {
        document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ behavior: 'instant' })
      } catch {
        // Malformed URL fragments should not interrupt navigation.
      }
    } else if (changedPage) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }

    // Do not animate the initial/SSR render, hash jumps or protected routes.
    // New content is already mounted and interactive; there is no exit delay.
    if (!changedPage || !animate || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const element = main.current
    if (!element?.animate) return
    const animation = element.animate([
      { opacity: 0.85, transform: 'translateY(6px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ], { duration: 180, easing: 'ease-out' })
    return () => animation.cancel()
  }, [pathname, hash, animate])

  return <main ref={main}>{children}</main>
}
