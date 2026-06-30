import { useState, useEffect } from 'react'
import logoGold from '../assets/logo-gold.png'

export default function Loader({ onDone }: { onDone: () => void }) {
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setExiting(true), 2000)
    const t2 = setTimeout(onDone, 2650)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onDone])

  return (
    <div
      className={`fixed inset-0 z-200 bg-tokeo-offwhite flex flex-col items-center justify-center gap-9 transition-all duration-600 ease-in-out ${
        exiting ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
      }`}
    >
      {/* Logo */}
      <img
        src={logoGold}
        alt="Tokeo Academy"
        className={`h-9 w-auto transition-all duration-700 ${
          exiting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
      />

      {/* Bouncing dots */}
      <div className="flex items-center gap-[10px]">
        {[
          { bg: 'bg-tokeo-navy/30',  delay: '0ms',    size: 'w-2 h-2'   },
          { bg: 'bg-tokeo-gold',     delay: '180ms',  size: 'w-2.5 h-2.5' },
          { bg: 'bg-tokeo-navy/50',  delay: '360ms',  size: 'w-2 h-2'   },
        ].map((dot, i) => (
          <span
            key={i}
            className={`block ${dot.size} ${dot.bg} rounded-full animate-bounce`}
            style={{ animationDelay: dot.delay, animationDuration: '900ms' }}
          />
        ))}
      </div>

      {/* Caption */}
      <p className="text-tokeo-navy/30 text-sm tracking-wide">
        Getting everything ready...
      </p>
    </div>
  )
}
