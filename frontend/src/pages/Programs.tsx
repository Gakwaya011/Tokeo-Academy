import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Compass, ShieldCheck, Sunrise, CalendarCheck, ClipboardCheck, Radar,
  NotebookPen, Zap, Moon, RotateCcw, ArrowRight, ArrowDown, MessageCircle, Loader2,
} from 'lucide-react'
import Button from '../components/ui/Button'
import { useAuth } from '../context/AuthContext'
import { apiRequest } from '../lib/api'

const pillars = [
  {
    id: 'overview',
    icon: Compass,
    title: 'Platform Overview',
    blurb: 'What you get, and how it works.',
  },
  {
    id: 'accountability',
    icon: ShieldCheck,
    title: 'Accountability Structure',
    blurb: 'How we keep you honest, structurally.',
  },
  {
    id: 'daily-rhythm',
    icon: Sunrise,
    title: 'Daily Rhythm',
    blurb: 'The planning and nudge loop, every day.',
  },
]

const accountabilityItems = [
  {
    icon: CalendarCheck,
    title: 'Daily check-ins',
    body: 'A short daily log of what you planned versus what you actually did. No streaks to game, just honest tracking.',
  },
  {
    icon: ClipboardCheck,
    title: 'Consistency trail',
    body: 'Every planned action and logged outcome builds a visible track record, so drift shows up immediately, not weeks later.',
  },
  {
    icon: Radar,
    title: 'Drift alerts',
    body: 'When you start skipping days, the system flags it early, before two missed days quietly become twenty.',
  },
]

const rhythmSteps = [
  { icon: Sunrise, label: 'Morning nudge' },
  { icon: NotebookPen, label: 'Plan the day' },
  { icon: Zap, label: 'Execute' },
  { icon: Moon, label: 'Evening log' },
  { icon: RotateCcw, label: 'Reflect' },
]

export default function Programs() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [price, setPrice] = useState<{ amount: number; currency: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    apiRequest<{ amount: number; currency: string }>('/api/payments/price')
      .then(setPrice)
      .catch(() => {})
  }, [])

  async function handleGetAccess() {
    if (!user) {
      navigate('/login')
      return
    }
    setError('')
    setLoading(true)
    try {
      const { link } = await apiRequest<{ link: string }>('/api/payments/initialize', { method: 'POST' })
      window.location.href = link
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <>
      {/* Hero — page intro */}
      <section className="w-full bg-tokeo-navy px-6 py-32 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto flex flex-col gap-7">
          <span className="text-xs font-semibold tracking-widest uppercase text-tokeo-gold">
            The Execution Platform
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-tokeo-cream leading-[1.02] tracking-tight">
            A structured system built to make execution automatic.
          </h1>
          <p className="text-tokeo-cream/50 text-xl leading-relaxed max-w-2xl">
            This isn't a course, and there's no waiting list. It's a daily
            operating system for execution — the same 5-step framework,
            structure, and accountability, available the moment you join.
          </p>
        </div>
      </section>

      {/* Program at a glance */}
      <section className="w-full bg-tokeo-offwhite px-6 py-20 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          {pillars.map(({ id, icon: Icon, title, blurb }) => (
            <a
              key={id}
              href={`#${id}`}
              className="group flex flex-col gap-4 bg-white border border-tokeo-navy/10 rounded-2xl p-7 hover:border-tokeo-gold/50 hover:shadow-lg hover:shadow-tokeo-navy/5 transition-all"
            >
              <span className="w-11 h-11 rounded-xl bg-tokeo-navy flex items-center justify-center shrink-0">
                <Icon size={20} className="text-tokeo-gold" />
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-tokeo-navy font-bold text-lg tracking-tight">{title}</h3>
                <p className="text-tokeo-navy/55 text-sm leading-relaxed">{blurb}</p>
              </div>
              <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase text-tokeo-navy/40 group-hover:text-tokeo-gold transition-colors">
                Learn more <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Overview */}
      <section id="overview" className="w-full bg-tokeo-offwhite px-6 pt-4 pb-32 md:px-12 lg:px-24 scroll-mt-28">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">

          <div className="lg:col-span-4">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-tokeo-gold">
              <Compass size={14} /> Overview
            </span>
            <h2 className="text-4xl font-bold text-tokeo-navy leading-tight mt-5 tracking-tight">
              What the platform actually is.
            </h2>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-7">
            <p className="text-tokeo-navy text-2xl leading-relaxed font-medium tracking-tight">
              An execution system you can start using today — no cohort, no
              start date, no waiting list. Just the 5-step framework and
              daily structure, from the moment you get access.
            </p>
            <p className="text-tokeo-navy/55 text-lg leading-relaxed">
              You will not sit through generic lessons. You will plan
              daily actions, log what you actually did, and have a
              structure around you that notices the moment you start
              slipping — before it becomes a pattern.
            </p>
            <p className="text-tokeo-navy/55 text-lg leading-relaxed">
              The goal is simple: give you a system that produces
              consistent execution for real people, in real conditions,
              not just in theory.
            </p>
          </div>

        </div>
      </section>

      {/* Accountability structure */}
      <section id="accountability" className="w-full bg-tokeo-navy px-6 py-32 md:px-12 lg:px-24 scroll-mt-20">
        <div className="max-w-6xl mx-auto flex flex-col gap-16">

          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-tokeo-gold">
              <ShieldCheck size={14} /> Accountability Structure
            </span>
            <h2 className="text-4xl font-bold text-tokeo-cream leading-tight mt-5 tracking-tight">
              How we keep you honest.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {accountabilityItems.map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex flex-col gap-4">
                <span className="w-11 h-11 rounded-xl bg-white/6 border border-white/10 flex items-center justify-center shrink-0">
                  <Icon size={19} className="text-tokeo-gold" />
                </span>
                <h3 className="text-tokeo-cream text-xl font-bold">{title}</h3>
                <p className="text-tokeo-cream/55 text-base leading-relaxed">{body}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Daily planning & nudges */}
      <section id="daily-rhythm" className="w-full bg-tokeo-offwhite px-6 py-32 md:px-12 lg:px-24 scroll-mt-20">
        <div className="max-w-6xl mx-auto flex flex-col gap-16">

          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-tokeo-gold">
              <Sunrise size={14} /> Daily Rhythm
            </span>
            <h2 className="text-4xl font-bold text-tokeo-navy leading-tight mt-5 tracking-tight">
              Planning and nudges, built in.
            </h2>
          </div>

          {/* Loop visual */}
          <div className="flex flex-wrap items-center gap-y-8">
            {rhythmSteps.map(({ icon: Icon, label }, i) => (
              <div key={label} className="flex items-center">
                <div className="flex flex-col items-center gap-3 w-28 sm:w-32">
                  <span className="w-14 h-14 rounded-full bg-white border border-tokeo-navy/15 flex items-center justify-center shadow-sm">
                    <Icon size={20} className="text-tokeo-navy" />
                  </span>
                  <span className="text-tokeo-navy/70 text-sm font-semibold text-center leading-snug">{label}</span>
                </div>
                {i < rhythmSteps.length - 1 && (
                  <ArrowRight size={16} className="text-tokeo-navy/25 mx-1 sm:mx-2 shrink-0 hidden sm:block" />
                )}
                {i < rhythmSteps.length - 1 && (
                  <ArrowDown size={16} className="text-tokeo-navy/25 mx-1 shrink-0 sm:hidden" />
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4" />
            <div className="lg:col-span-8 flex flex-col gap-7">
              <p className="text-tokeo-navy text-2xl leading-relaxed font-medium tracking-tight">
                Every day opens with a short planning prompt and closes
                with a short reflection. That is the entire loop.
              </p>
              <p className="text-tokeo-navy/55 text-lg leading-relaxed">
                You receive a nudge in the morning to set your single
                action for the day, and a nudge in the evening to log
                whether it happened. No complicated dashboards, no
                twenty-minute planning sessions — just enough structure
                to keep momentum without becoming a burden itself.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Pricing */}
      <section className="w-full bg-tokeo-offwhite px-6 pb-32 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto flex flex-col gap-10">

          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-tokeo-gold">
              Investment
            </span>
            <h2 className="text-4xl font-bold text-tokeo-navy leading-tight mt-5 tracking-tight">
              One price. Full access.
            </h2>
          </div>

          <div className="border border-tokeo-navy/15 p-10 md:p-12 flex flex-col gap-8">
            <div className="flex items-start gap-4">
              <span className="w-11 h-11 rounded-xl bg-tokeo-navy flex items-center justify-center shrink-0">
                <MessageCircle size={19} className="text-tokeo-gold" />
              </span>
              <div className="flex flex-col gap-2">
                <p className="text-tokeo-navy text-xl font-bold tracking-tight">
                  {price ? `${price.currency} ${price.amount.toLocaleString()}` : 'Full platform access.'}
                </p>
                <p className="text-tokeo-navy/55 leading-relaxed">
                  One payment gives you the complete 5-step execution
                  system, daily planning and accountability structure,
                  and direct support — no cohort to wait for, no
                  application to be accepted into.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 pt-6 border-t border-tokeo-navy/10">
              <p className="text-tokeo-navy/70 leading-relaxed">
                Courses and additional programs are coming in a future
                phase. This gives you full access to the core execution
                platform today.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Get access CTA */}
      <section className="w-full bg-tokeo-navy px-6 py-32 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto flex flex-col items-start gap-8">

          <span className="text-xs font-semibold tracking-widest uppercase text-tokeo-gold">
            Get Started
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-tokeo-cream leading-[1.05] tracking-tight">
            Start executing today.
          </h2>

          <p className="text-tokeo-cream/55 text-lg leading-relaxed max-w-xl">
            No cohort to wait for and no application to submit. Pay once,
            get instant access to the full execution platform, and start
            your first day immediately.
          </p>

          {error && (
            <div className="text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Button onClick={handleGetAccess} size="lg" disabled={loading} className="gap-2">
              {loading && <Loader2 size={16} className="animate-spin" />}
              Get Access
            </Button>
            <Button href="/contact" variant="secondary" size="lg">Ask a Question</Button>
          </div>

        </div>
      </section>
    </>
  )
}
