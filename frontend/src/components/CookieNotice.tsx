import { useEffect, useState } from 'react'
import { getConsent, setConsent } from '../lib/analytics'

// Opt-in analytics: nothing loads until the visitor accepts. The banner
// only appears once no choice has been recorded, and only after mount so
// the server-rendered HTML and the first client paint agree.
export default function CookieNotice() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (getConsent() === null) setVisible(true)
  }, [])

  if (!visible) return null

  const choose = (value: 'granted' | 'denied') => {
    setConsent(value)
    setVisible(false)
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6">
      <div className="max-w-3xl mx-auto bg-tokeo-navy text-tokeo-cream border border-white/10 rounded-2xl shadow-xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <p className="text-sm leading-relaxed text-tokeo-cream/70 flex-1">
          We use analytics cookies to understand how the site is used. No
          tracking runs until you accept.{' '}
          <a href="/privacy-policy" className="text-tokeo-gold underline underline-offset-2">
            Privacy Policy
          </a>
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={() => choose('denied')}
            className="px-4 py-2 text-sm font-semibold rounded-lg border border-white/15 text-tokeo-cream/80 hover:bg-white/5 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={() => choose('granted')}
            className="px-4 py-2 text-sm font-semibold rounded-lg bg-tokeo-gold text-tokeo-navy hover:opacity-90 transition-opacity"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
