import { useEffect, useRef, useState } from 'react'

function useScrollReveal(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

/* ── Custom illustrated icons ───────────────────────────────────── */

function IconLearn() {
  return (
    <svg viewBox="0 0 44 44" width="48" height="48" fill="none">
      {/* Drop shadow */}
      <rect x="11" y="11" width="22" height="27" rx="3" fill="#10112c" opacity="0.10" />
      {/* Book cover (navy) */}
      <rect x="9" y="8"  width="22" height="27" rx="3" fill="#10112c" />
      {/* Gold spine */}
      <rect x="9" y="8"  width="6"  height="27" rx="3" fill="#eaa623" />
      {/* Inner page (white) */}
      <rect x="15" y="11" width="13" height="21" rx="1.5" fill="white" opacity="0.95" />
      {/* Text lines */}
      <rect x="17" y="16" width="7"  height="1.5" rx="1" fill="#10112c" opacity="0.25" />
      <rect x="17" y="20" width="9"  height="1.5" rx="1" fill="#10112c" opacity="0.18" />
      <rect x="17" y="24" width="5"  height="1.5" rx="1" fill="#10112c" opacity="0.18" />
      {/* Gold bookmark ribbon */}
      <path d="M24 9.5 L24 17.5 L27.5 15 L27.5 9.5 Z" fill="#eaa623" opacity="0.90" />
    </svg>
  )
}

function IconPlan() {
  return (
    <svg viewBox="0 0 44 44" width="48" height="48" fill="none">
      {/* Outer ring */}
      <circle cx="22" cy="22" r="17" stroke="#10112c" strokeWidth="1.5" opacity="0.10" />
      {/* Mid ring */}
      <circle cx="22" cy="22" r="11" stroke="#10112c" strokeWidth="1.5" opacity="0.14" />
      {/* Gold inner ring */}
      <circle cx="22" cy="22" r="6"  stroke="#eaa623" strokeWidth="2"   opacity="0.70" />
      {/* Center gold dot */}
      <circle cx="22" cy="22" r="3"  fill="#eaa623" />
      <circle cx="22" cy="22" r="1.2" fill="white"   opacity="0.90" />
      {/* Crosshair ticks */}
      <line x1="22" y1="3"  x2="22" y2="8"  stroke="#10112c" strokeWidth="1.5" strokeLinecap="round" opacity="0.25" />
      <line x1="22" y1="36" x2="22" y2="41" stroke="#10112c" strokeWidth="1.5" strokeLinecap="round" opacity="0.25" />
      <line x1="3"  y1="22" x2="8"  y2="22" stroke="#10112c" strokeWidth="1.5" strokeLinecap="round" opacity="0.25" />
      <line x1="36" y1="22" x2="41" y2="22" stroke="#10112c" strokeWidth="1.5" strokeLinecap="round" opacity="0.25" />
    </svg>
  )
}

function IconAct() {
  return (
    <svg viewBox="0 0 44 44" width="48" height="48" fill="none">
      {/* Soft glow circle */}
      <circle cx="22" cy="22" r="17" fill="#eaa623" opacity="0.10" />
      {/* Lightning bolt navy shadow (offset) */}
      <path d="M25 5 L11 24 h10 L18 40 L34 20 H23 Z" fill="#10112c" opacity="0.12" transform="translate(1.5,1.5)" />
      {/* Lightning bolt gold */}
      <path d="M25 5 L11 24 h10 L18 40 L34 20 H23 Z" fill="#eaa623" />
      {/* Highlight on bolt */}
      <path d="M25 5 L23 15 h6 Z" fill="white" opacity="0.25" />
      {/* Spark dots */}
      <circle cx="7"  cy="14" r="1.8" fill="#eaa623" opacity="0.55" />
      <circle cx="37" cy="30" r="1.3" fill="#eaa623" opacity="0.45" />
      <circle cx="38" cy="13" r="1.5" fill="#eaa623" opacity="0.35" />
    </svg>
  )
}

function IconTrack() {
  return (
    <svg viewBox="0 0 44 44" width="48" height="48" fill="none">
      {/* Chart bg card */}
      <rect x="3" y="5" width="38" height="32" rx="4" fill="#10112c" opacity="0.06" />
      {/* Bars — gold = done, muted = pending */}
      <rect x="7"  y="18" width="5" height="17" rx="1.5" fill="#eaa623" opacity="0.85" />
      <rect x="14" y="12" width="5" height="23" rx="1.5" fill="#eaa623" opacity="0.85" />
      <rect x="21" y="21" width="5" height="14" rx="1.5" fill="#eaa623" opacity="0.85" />
      <rect x="28" y="24" width="5" height="11" rx="1.5" fill="#10112c" opacity="0.12" />
      <rect x="35" y="27" width="5" height="8"  rx="1.5" fill="#10112c" opacity="0.09" />
      {/* Base line */}
      <line x1="3" y1="37" x2="41" y2="37" stroke="#10112c" strokeWidth="1" opacity="0.12" />
      {/* Trend line overlay */}
      <path d="M9.5 20 L16.5 14 L23.5 23 L30.5 26" stroke="#eaa623" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" opacity="0.35" strokeDasharray="2 2" />
      {/* Live indicator */}
      <circle cx="38" cy="9" r="3" fill="#eaa623" opacity="0.85" />
      <circle cx="38" cy="9" r="1.2" fill="white" />
    </svg>
  )
}

function IconImprove() {
  return (
    <svg viewBox="0 0 44 44" width="48" height="48" fill="none">
      {/* Card bg */}
      <rect x="3" y="6" width="38" height="32" rx="4" fill="#10112c" opacity="0.06" />
      {/* Grid lines */}
      <line x1="3" y1="27" x2="41" y2="27" stroke="#10112c" strokeWidth="0.75" opacity="0.10" />
      <line x1="3" y1="18" x2="41" y2="18" stroke="#10112c" strokeWidth="0.75" opacity="0.10" />
      {/* Area fill under trend */}
      <path d="M6 34 Q14 30 20 24 T34 11 L34 38 L6 38 Z" fill="#eaa623" opacity="0.08" />
      {/* Rising trend line */}
      <path d="M6 34 Q14 30 20 24 T34 11"
        fill="none" stroke="#eaa623" strokeWidth="2.5" strokeLinecap="round" />
      {/* Data points */}
      <circle cx="6"  cy="34" r="2.2" fill="#eaa623" opacity="0.45" />
      <circle cx="20" cy="24" r="2.2" fill="#eaa623" opacity="0.65" />
      <circle cx="34" cy="11" r="3.5" fill="#eaa623" />
      <circle cx="34" cy="11" r="1.5" fill="white" opacity="0.90" />
      {/* Arrow */}
      <path d="M30 8 L34 11 L30 14" fill="none" stroke="#eaa623"
        strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ── Step data ──────────────────────────────────────────────────── */

const steps = [
  { Icon: IconLearn,   title: 'Learn',   body: 'Absorb only what you need — just enough to act, not enough to stall.'       },
  { Icon: IconPlan,    title: 'Plan',    body: 'Turn what you learned into one clear, specific action for the day ahead.'    },
  { Icon: IconAct,     title: 'Act',     body: 'Do the real, imperfect version of the thing. Not tomorrow — today.'         },
  { Icon: IconTrack,   title: 'Track',   body: 'Log what actually happened. No streaks to fake, no excuses to hide behind.' },
  { Icon: IconImprove, title: 'Improve', body: 'Adjust based on what the data shows, not on how you feel about it.'         },
]

/* ── Section ────────────────────────────────────────────────────── */

export default function HowItWorks() {
  const header = useScrollReveal()
  const cards  = useScrollReveal(0.06)

  return (
    <section id="how-it-works" className="bg-tokeo-offwhite">

      {/* ── Dark header band ─────────────────────────────── */}
      <div className="bg-tokeo-navy px-6 pt-24 pb-36 md:px-12 lg:px-24">
        <div
          ref={header.ref}
          className={`max-w-6xl mx-auto flex flex-col items-center text-center gap-5 transition-[opacity,transform] duration-700 ${
            header.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-tokeo-gold border border-tokeo-gold/30 bg-tokeo-gold/[0.07] px-4 py-1.5 rounded-full">
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-tokeo-cream leading-[1.05] tracking-tight">
            How <span className="text-tokeo-gold italic">Tokeo</span> Works
          </h2>
          <p className="text-tokeo-cream/45 text-base leading-relaxed max-w-md">
            Five steps. The same loop, every day, until execution stops being a decision and becomes automatic.
          </p>
        </div>
      </div>

      {/* ── Cards (overlap the dark band) ────────────────── */}
      <div className="-mt-20 px-6 pb-28 md:px-12 lg:px-24">
        <div
          ref={cards.ref}
          className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6"
        >
          {steps.map(({ Icon, title, body }, i) => (
            <div
              key={title}
              className={`
                pt-12 lg:col-span-2
                ${i === 3 ? 'lg:col-start-2' : ''}
                ${i === 4 ? 'lg:col-start-4' : ''}
                transition-[opacity,transform]
                ${cards.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
              `}
              style={{
                transitionDelay: `${i * 100}ms`,
                transitionDuration: '650ms',
                transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
            >
              <div className="group relative bg-white rounded-3xl border border-black/[0.06] shadow-sm hover:shadow-xl hover:shadow-black/[0.07] hover:-translate-y-2 transition-all duration-300 cursor-default h-full flex flex-col items-center text-center px-8 pt-16 pb-9 gap-4">

                {/* Floating illustrated icon circle */}
                <div className="absolute -top-11 left-1/2 -translate-x-1/2 w-[88px] h-[88px] rounded-full bg-white border-2 border-tokeo-gold/25 shadow-lg group-hover:border-tokeo-gold/60 group-hover:shadow-xl group-hover:shadow-tokeo-gold/15 transition-all duration-300 flex items-center justify-center">
                  <Icon />
                </div>

                {/* Title */}
                <h3 className="text-tokeo-navy font-bold text-xl tracking-tight leading-snug">
                  {title}
                </h3>

                {/* Divider */}
                <div className="w-8 h-[2px] bg-tokeo-gold/30 group-hover:w-14 group-hover:bg-tokeo-gold/60 transition-all duration-400" />

                {/* Body */}
                <p className="text-tokeo-navy/50 text-sm leading-relaxed">
                  {body}
                </p>

              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
