import { useEffect, useRef, useState } from 'react'
import Button from '../ui/Button'

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

export default function CTASection() {
  const section = useScrollReveal(0.1)

  const item = (_delay: number, extra = '') =>
    `transition-[opacity,transform] duration-600 ${extra} ${
      section.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
    }`

  return (
    <section id="cta" className="w-full bg-tokeo-offwhite px-6 py-28 md:px-12 lg:px-24">
      <div
        ref={section.ref}
        className="max-w-4xl mx-auto flex flex-col items-start gap-8 text-left"
      >

        <span
          className={item(0)}
          style={{ transitionDelay: '0ms' }}
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-tokeo-gold">
            Get Started
          </span>
        </span>

        <h2
          className={`text-4xl md:text-6xl font-bold text-tokeo-navy leading-[1.05] transition-[opacity,transform] duration-700 ${
            section.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '120ms' }}
        >
          Stop planning to start.<br />Start today.
        </h2>

        <p
          className={`text-tokeo-navy/55 text-lg leading-relaxed max-w-xl transition-[opacity,transform] duration-600 ${
            section.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '260ms' }}
        >
          The pilot cohort is opening soon, with limited spots to keep the
          accountability structure tight. Join the waitlist to be first in
          line, or reach out if you want to partner with us.
        </p>

        <div
          className={`flex flex-col sm:flex-row gap-4 mt-4 transition-[opacity,transform] duration-600 ${
            section.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <Button href="/contact" size="lg">Join the Waitlist</Button>
          <Button href="/contact" variant="secondary" size="lg">Partner With Us</Button>
        </div>

      </div>
    </section>
  )
}
