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

export default function ProblemSolutionSection() {
  const section = useScrollReveal(0.08)

  return (
    <section id="problem-solution" className="w-full bg-tokeo-offwhite px-6 py-32 md:px-12 lg:px-24">
      <div
        ref={section.ref}
        className="max-w-[1400px] mx-auto flex flex-col gap-10 lg:flex-row"
      >

        {/* Problem card — slides in from left */}
        <div
          className={`flex-1 bg-white rounded-3xl p-12 md:p-16 relative overflow-hidden shadow-sm transition-[opacity,transform] duration-700 ${
            section.visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}
        >
          <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-tokeo-navy/5" />
          <div className="absolute -bottom-16 -left-10 w-32 h-32 rounded-full bg-tokeo-navy/[0.03]" />

          <div className={`w-16 h-16 rounded-2xl bg-tokeo-navy flex items-center justify-center mb-8 relative z-10 transition-[opacity,transform] duration-500 ${
            section.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`} style={{ transitionDelay: '200ms' }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="#eaa623" strokeWidth="2" />
              <path
                d="M9 9.5c0-1.4 1.2-2.5 3-2.5s3 1 3 2.3c0 1.6-1.5 2-2.4 2.7-.6.5-.6 1-.6 1.5M12 17h.01"
                stroke="#eaa623" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
          </div>

          <p className={`text-tokeo-navy/40 text-xs font-bold tracking-widest uppercase mb-4 relative z-10 transition-[opacity,transform] duration-500 ${
            section.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`} style={{ transitionDelay: '300ms' }}>
            Problem Statement
          </p>
          <h3 className={`text-3xl md:text-4xl font-bold text-tokeo-navy tracking-tight mb-5 leading-tight relative z-10 transition-[opacity,transform] duration-500 ${
            section.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`} style={{ transitionDelay: '380ms' }}>
            Knowledge without execution.
          </h3>
          <p className={`text-tokeo-navy/55 text-lg leading-relaxed relative z-10 transition-[opacity,transform] duration-500 ${
            section.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`} style={{ transitionDelay: '460ms' }}>
            Most people already have the courses finished and the plan
            written. What they lack is the structure that keeps them
            going after the motivation fades, and the accountability
            that notices when they quietly stop.
          </p>
        </div>

        {/* Solution card — slides in from right */}
        <div
          className={`flex-1 bg-white rounded-3xl p-12 md:p-16 relative overflow-hidden shadow-sm transition-[opacity,transform] duration-700 ${
            section.visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}
          style={{ transitionDelay: '150ms' }}
        >
          <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-tokeo-gold/10" />
          <div className="absolute -bottom-16 -left-10 w-32 h-32 rounded-full bg-tokeo-gold/[0.06]" />

          <div className={`w-16 h-16 rounded-2xl bg-tokeo-gold flex items-center justify-center mb-8 relative z-10 transition-[opacity,transform] duration-500 ${
            section.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`} style={{ transitionDelay: '350ms' }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
                stroke="#10112c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
          </div>

          <p className={`text-tokeo-gold text-xs font-bold tracking-widest uppercase mb-4 relative z-10 transition-[opacity,transform] duration-500 ${
            section.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`} style={{ transitionDelay: '450ms' }}>
            Solution
          </p>
          <h3 className={`text-3xl md:text-4xl font-bold text-tokeo-navy tracking-tight mb-5 leading-tight relative z-10 transition-[opacity,transform] duration-500 ${
            section.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`} style={{ transitionDelay: '530ms' }}>
            A system built for follow-through.
          </h3>
          <p className={`text-tokeo-navy/55 text-lg leading-relaxed relative z-10 transition-[opacity,transform] duration-500 ${
            section.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`} style={{ transitionDelay: '610ms' }}>
            Tokeo plans one clear action a day, tracks it honestly, and
            sends nudges before drift becomes a pattern. Execution
            becomes a habit you repeat, not a decision you have to
            remake every morning.
          </p>
        </div>

      </div>
    </section>
  )
}
