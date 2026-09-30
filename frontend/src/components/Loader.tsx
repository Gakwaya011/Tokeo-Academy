import logoGold from '../assets/logo-gold.png'

export default function Loader({ message = 'Checking your session...' }: { message?: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-200 bg-tokeo-offwhite flex flex-col items-center justify-center gap-9"
    >
      <img src={logoGold} alt="Tokeo Academy" className="h-9 w-auto" />

      {/* Bouncing dots */}
      <div className="flex items-center gap-[10px]">
        {[
          { bg: 'bg-tokeo-navy/30',  delay: '0ms',    size: 'w-2 h-2'   },
          { bg: 'bg-tokeo-gold',     delay: '180ms',  size: 'w-2.5 h-2.5' },
          { bg: 'bg-tokeo-navy/50',  delay: '360ms',  size: 'w-2 h-2'   },
        ].map((dot, i) => (
          <span
            key={i}
            className={`block ${dot.size} ${dot.bg} rounded-full animate-bounce motion-reduce:animate-none`}
            style={{ animationDelay: dot.delay, animationDuration: '900ms' }}
          />
        ))}
      </div>

      <p className="text-tokeo-navy/30 text-sm tracking-wide">
        {message}
      </p>
    </div>
  )
}
