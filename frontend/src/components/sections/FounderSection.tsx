import { useEffect, useRef, useState } from 'react'

function useScrollReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

export default function FounderSection() {
  const section = useScrollReveal(0.08)

  return (
    <section id="founder" className="w-full bg-tokeo-navy px-6 py-28 md:px-12 lg:px-24">
      <div
        ref={section.ref}
        className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center"
      >

        {/* Photo — slides in from left */}
        <div
          className={`w-full lg:w-2/5 shrink-0 transition-[opacity,transform] duration-700 ${
            section.visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
          }`}
        >
          <div className="aspect-[4/5] w-full bg-tokeo-offwhite/5 border border-white/10 relative overflow-hidden">
            <svg
              viewBox="0 0 200 250"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="xMidYMax slice"
            >
              <circle cx="100" cy="90" r="42" fill="#eaa62322" />
              <path d="M 40 250 Q 40 150 100 150 Q 160 150 160 250 Z" fill="#eaa62315" />
            </svg>
            <div className="absolute bottom-6 left-6">
              <p className="text-tokeo-gold text-xs font-semibold tracking-widest uppercase">Founder</p>
              <p className="text-tokeo-cream/40 text-xs mt-1">Photo coming soon</p>
            </div>
          </div>
        </div>

        {/* Text — cascades in from right */}
        <div className="flex-1 flex flex-col gap-6">

          <span
            className={`text-xs font-semibold tracking-widest uppercase text-tokeo-gold transition-[opacity,transform] duration-500 ${
              section.visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
            style={{ transitionDelay: '150ms' }}
          >
            Why Tokeo Exists
          </span>

          <h2
            className={`text-3xl md:text-4xl font-bold text-tokeo-cream leading-tight tracking-tight transition-[opacity,transform] duration-600 ${
              section.visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
            style={{ transitionDelay: '250ms' }}
          >
            Built by someone who lived the gap.
          </h2>

          <p
            className={`text-tokeo-cream text-xl leading-relaxed font-medium transition-[opacity,transform] duration-600 ${
              section.visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
            style={{ transitionDelay: '370ms' }}
          >
            I spent years collecting knowledge I never used. Courses
            finished and forgotten, plans written and abandoned by the
            second week.
          </p>

          <p
            className={`text-tokeo-cream/55 text-lg leading-relaxed transition-[opacity,transform] duration-600 ${
              section.visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
            style={{ transitionDelay: '480ms' }}
          >
            The problem was never information. What I lacked was a
            structure that held me accountable when motivation
            inevitably ran out. Tokeo is that structure — a system built
            around one premise: execution is a skill you build through
            repetition, not an attitude you summon through inspiration.
          </p>

        </div>
      </div>
    </section>
  )
}
