import { useState, useEffect, useRef } from 'react'
import { Phone, Mail, Clock, Send } from 'lucide-react'
import Button from '../ui/Button'

function useScrollReveal(threshold = 0.1) {
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

type FormData = {
  name: string
  email: string
  phone: string
  message: string
}

const initialForm: FormData = { name: '', email: '', phone: '', message: '' }

const contactItems = [
  {
    icon: Phone,
    label: 'WhatsApp',
    value: '+250 000 000 000',
  },
  {
    icon: Mail,
    label: 'Email Us',
    value: 'hello@tokeo.academy',
  },
  {
    icon: Clock,
    label: 'Response Time',
    value: 'Within 48 hours',
  },
]

export default function ContactSection() {
  const [form, setForm] = useState<FormData>(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const section = useScrollReveal()

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Quick contact submitted:', form)
    setSubmitted(true)
  }

  const inputClass =
    'w-full bg-white/[0.06] border border-white/10 rounded-xl text-tokeo-cream placeholder:text-tokeo-cream/25 px-4 py-3.5 text-base focus:outline-none focus:border-tokeo-gold/50 transition-colors duration-200'

  const labelClass =
    'block text-[0.65rem] font-bold tracking-[0.15em] uppercase text-tokeo-gold mb-2'

  return (
    <section id="contact" className="w-full bg-tokeo-offwhite px-6 py-24 md:px-12 lg:px-24">

      {/* ── Section header ───────────────────────────────────── */}
      <div className="flex flex-col items-center gap-4 text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-tokeo-navy tracking-tight">
          Get In Touch
        </h2>
        <div className="w-10 h-[3px] bg-tokeo-gold" />
        <p className="text-tokeo-navy/50 text-lg max-w-md">
          Have a question about Tokeo or want to apply? We are here to help.
        </p>
      </div>

      {/* ── Card ─────────────────────────────────────────────── */}
      <div
        ref={section.ref}
        className={`max-w-5xl mx-auto bg-tokeo-navy rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-5 transition-[opacity,transform] duration-700 ${
          section.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Left — contact info */}
        <div className="lg:col-span-2 relative p-10 md:p-12 flex flex-col gap-10 border-b lg:border-b-0 lg:border-r border-white/[0.07] overflow-hidden">

          {/* Decorative circles */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-tokeo-gold/[0.05] pointer-events-none" />
          <div className="absolute -bottom-8 -right-8 w-36 h-36 rounded-full bg-tokeo-gold/[0.07] pointer-events-none" />

          <div className="relative z-10 flex flex-col gap-3">
            <h3 className="text-tokeo-cream text-xl font-bold tracking-tight">
              Contact Information
            </h3>
            <p className="text-tokeo-cream/40 text-sm leading-relaxed">
              Fill out the form and we will get back to you within 48 hours.
            </p>
          </div>

          <div className="relative z-10 flex flex-col gap-7">
            {contactItems.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/[0.07] border border-white/[0.09] flex items-center justify-center shrink-0">
                  <Icon size={16} strokeWidth={1.5} className="text-tokeo-gold" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[0.65rem] font-bold tracking-[0.15em] uppercase text-tokeo-gold">
                    {label}
                  </span>
                  <span className="text-tokeo-cream/75 text-sm font-medium">
                    {value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <div className="lg:col-span-3 p-10 md:p-12">
          {submitted ? (
            <div className="h-full flex flex-col justify-center gap-4 py-8">
              <h3 className="text-tokeo-cream text-2xl font-bold tracking-tight">
                Message sent.
              </h3>
              <p className="text-tokeo-cream/50 leading-relaxed max-w-sm">
                Thanks for reaching out — we will reply soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Your Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Full name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Your Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="you@email.com"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Phone Number</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="+250..."
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  placeholder="Tell us what you are looking for..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div className="pt-2">
                <Button type="submit" size="lg" className="flex items-center gap-2.5">
                  Send Message
                  <Send size={16} strokeWidth={1.5} />
                </Button>
              </div>

            </form>
          )}
        </div>
      </div>

    </section>
  )
}
