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

const audiences = [
  {
    who: 'Young professionals',
    line: 'You have the training and the ambition. You want a way to turn it into visible results, not just a longer CV.',
  },
  {
    who: 'Entrepreneurs',
    line: 'You are not short on ideas. What you need is the discipline and the system to move one of them forward every week.',
  },
  {
    who: 'Managers & team leads',
    line: 'The plan is sound. You need the team to execute it consistently, without you chasing every step.',
  },
  {
    who: 'Organizations & institutions',
    line: 'You are developing people. You want execution capability that shows up in the work — measurable and repeatable.',
  },
]

export default function WhoItsFor() {
  const section = useScrollReveal(0.08)

  return (
    <section id="who-its-for" className="w-full bg-tokeo-offwhite px-6 py-28 md:px-12 lg:px-24">
      <div
        ref={section.ref}
        className={`max-w-5xl mx-auto transition-[opacity,transform] duration-700 ${
          section.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="flex flex-col gap-4 max-w-xl">
          <span className="text-xs font-semibold tracking-widest uppercase text-tokeo-gold">
            Who It's For
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-tokeo-navy leading-tight tracking-tight">
            If any of these sound like you, you're in the right place.
          </h2>
        </div>

        <div className="mt-14 flex flex-col">
          {audiences.map(({ who, line }, i) => (
            <div
              key={who}
              className={`grid grid-cols-1 md:grid-cols-[220px_1fr] gap-2 md:gap-10 py-7 ${
                i > 0 ? 'border-t border-tokeo-navy/10' : ''
              }`}
            >
              <h3 className="text-tokeo-navy font-bold text-lg tracking-tight">{who}</h3>
              <p className="text-tokeo-navy/55 text-lg leading-relaxed">{line}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
