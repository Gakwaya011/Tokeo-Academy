// Google Analytics 4 — stays completely inert until VITE_GA_ID is set at
// build time (format: G-XXXXXXXXXX), so local/dev builds send nothing.
// SPA navigations are tracked manually (config sends no automatic page_view).

const GA_ID = import.meta.env.VITE_GA_ID as string | undefined

type GtagParams = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

const CONSENT_KEY = 'tokeo_analytics_consent'

export type Consent = 'granted' | 'denied'

export function getConsent(): Consent | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY)
    return v === 'granted' || v === 'denied' ? v : null
  } catch {
    return null
  }
}

export function setConsent(value: Consent) {
  try {
    localStorage.setItem(CONSENT_KEY, value)
  } catch {
    /* private mode / storage disabled — honour the choice for this page only */
  }
  if (value === 'granted') initAnalytics()
}

let started = false

export function initAnalytics() {
  if (started || !GA_ID || typeof window === 'undefined') return
  if (getConsent() !== 'granted') return
  started = true

  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(s)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', GA_ID, { send_page_view: false })
}

export function trackPageView(path: string) {
  if (!GA_ID || typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  })
}

export function trackEvent(name: string, params: GtagParams = {}) {
  if (!GA_ID || typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', name, { transport_type: 'beacon', ...params })
}

// Fires scroll_depth once per threshold per page. Call the returned function
// to tear the listener down (e.g. on route change), then set it up again.
const THRESHOLDS = [25, 50, 75, 100]

export function initScrollDepth() {
  if (!GA_ID || typeof window === 'undefined') return () => {}
  const seen = new Set<number>()

  const onScroll = () => {
    const doc = document.documentElement
    const scrollable = doc.scrollHeight - window.innerHeight
    if (scrollable <= 0) return
    const pct = (window.scrollY / scrollable) * 100
    for (const t of THRESHOLDS) {
      if (pct >= t && !seen.has(t)) {
        seen.add(t)
        trackEvent('scroll_depth', { percent: t })
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  return () => window.removeEventListener('scroll', onScroll)
}
