import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import Button from '../components/ui/Button'
import { ProgramsDataContext } from '../context/ProgramsDataContext'
import { API_URL } from '../lib/api'
import type { Program } from '../types/program'

const plans = [
  { label: 'Monthly', price: '$5', period: '/ month' },
  { label: 'Yearly', price: '$48', period: '/ year' },
]

const entryPoints = [
  'Myself', 'The Problem', 'The Path', 'The Team',
  'Stakeholders', 'Priorities', 'Performance', 'Risk',
]

const appliedPrograms = [
  'Entrepreneurship', 'Logistics & Transport', 'Public Procurement',
  'Healthcare Operations', 'Construction', 'Higher Education',
]

export default function Programs() {
  const ssrPrograms = useContext(ProgramsDataContext)
  const [programs, setPrograms] = useState<Program[]>(ssrPrograms ?? [])

  useEffect(() => {
    fetch(`${API_URL}/api/programs`)
      .then((res) => res.json())
      .then(({ programs }) => setPrograms(programs))
      .catch(() => {})
  }, [])

  return (
    <>
      {/* Hero */}
      <section className="w-full bg-tokeo-navy px-6 py-32 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto flex flex-col gap-7">
          <span className="text-xs font-semibold tracking-widest uppercase text-tokeo-gold">
            Programs
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-tokeo-cream leading-[1.02] tracking-tight">
            Turn good intentions into <span className="text-tokeo-gold italic">results</span>.
          </h1>
          <p className="text-tokeo-cream/50 text-xl leading-relaxed max-w-xl">
            Most of us are taught what to know. Far fewer are taught how to
            execute. Tokeo teaches the second one.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-2 items-start sm:items-center">
            <Button href="/contact" size="lg">Join the Waitlist</Button>
            <a
              href="#foundations"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-tokeo-cream/60 hover:text-tokeo-cream transition-colors px-2 py-2"
            >
              See the modules
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Start with your challenge */}
      <section className="w-full bg-tokeo-offwhite px-6 py-24 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">

          <div className="lg:col-span-5">
            <span className="text-xs font-semibold tracking-widest uppercase text-tokeo-gold">
              Not a rigid sequence
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-tokeo-navy leading-tight mt-4 tracking-tight">
              Start with your challenge. Not Chapter One.
            </h2>
            <p className="text-tokeo-navy/55 text-lg leading-relaxed mt-5">
              Execution isn't linear. Enter wherever you need it most, and
              circle back when a different capability becomes the constraint.
            </p>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center gap-4">
            <span className="text-xs font-bold tracking-widest uppercase text-tokeo-navy/40">
              What's getting in the way right now?
            </span>
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2.5">
              {entryPoints.map((point, i) => (
                <span key={point} className="flex items-center gap-2.5">
                  <span className="text-sm font-semibold text-tokeo-navy bg-white border border-tokeo-navy/10 rounded-full px-4 py-2">
                    {point}
                  </span>
                  {i < entryPoints.length - 1 && (
                    <span className="w-1 h-1 rounded-full bg-tokeo-navy/20" />
                  )}
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Execution Foundations — browsable module cards */}
      <section id="foundations" className="w-full bg-tokeo-navy px-6 py-28 md:px-12 lg:px-24 scroll-mt-20">
        <div className="max-w-6xl mx-auto flex flex-col gap-14">

          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-tokeo-gold">
              Execution Foundations
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-tokeo-cream leading-tight mt-4 tracking-tight">
              Eight capabilities. One system.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map(({ number, slug, title, tagline, imageUrl }) => (
              <Link
                key={slug}
                to={`/programs/${slug}`}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20 transition-all"
              >
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-tokeo-navy to-[#1a1c42]">
                  {imageUrl && (
                    <>
                      <img
                        src={imageUrl}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-tokeo-navy via-tokeo-navy/50 to-tokeo-navy/10" />
                    </>
                  )}
                  <span className="absolute -right-3 -bottom-6 text-8xl font-bold text-white/10 tabular-nums">
                    {number}
                  </span>
                  <span className="absolute left-6 bottom-5 text-[0.65rem] font-bold tracking-widest uppercase text-tokeo-gold">
                    Module {number}
                  </span>
                </div>
                <div className="flex flex-col gap-3 p-7">
                  <h3 className="text-tokeo-navy text-xl font-bold tracking-tight leading-snug">
                    {title}
                  </h3>
                  <p className="text-tokeo-navy/55 text-base leading-relaxed">{tagline}</p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-tokeo-gold mt-1 group-hover:gap-2.5 transition-all">
                    Read more <ArrowRight size={13} />
                  </span>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* How it becomes real — Lab + Applied Programs */}
      <section className="w-full bg-tokeo-offwhite px-6 py-28 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto flex flex-col gap-20">

          {/* Virtual Execution Lab */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <span className="text-xs font-semibold tracking-widest uppercase text-tokeo-gold">
                Learning that ends in action
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-tokeo-navy leading-tight mt-4 tracking-tight">
                Don't just learn it. Use it.
              </h2>
            </div>
            <div className="lg:col-span-7 flex flex-col justify-center">
              <p className="text-tokeo-navy/60 text-lg leading-relaxed">
                Every module connects to a Virtual Execution Lab — bring a
                real challenge, leave with a decision, a plan, or a tool
                you can actually use. Not just notes.
              </p>
            </div>
          </div>

          {/* Applied Programs */}
          <div className="flex flex-col gap-8">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-tokeo-gold">
                Applied Programs
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-tokeo-navy leading-tight mt-4 tracking-tight">
                Same disciplines. Different industries.
              </h2>
            </div>

            <div className="bg-tokeo-navy rounded-3xl p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
              <span className="inline-flex items-center gap-2 w-fit text-[0.65rem] font-bold tracking-widest uppercase text-tokeo-navy bg-tokeo-gold px-3 py-1.5 rounded-full shrink-0">
                <Sparkles size={12} /> Flagship
              </span>
              <div>
                <h3 className="text-tokeo-cream text-xl font-bold tracking-tight">
                  Execution for the Creator Economy
                </h3>
                <p className="text-tokeo-cream/50 text-base leading-relaxed mt-2 max-w-lg">
                  Don't just post. Build something people come back for.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {appliedPrograms.map((title) => (
                <span
                  key={title}
                  className="text-sm font-medium text-tokeo-navy/60 bg-white border border-tokeo-navy/10 rounded-full px-4 py-2"
                >
                  {title} <span className="text-tokeo-navy/30">· soon</span>
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Get started — assessment + pricing + CTA */}
      <section className="w-full bg-tokeo-navy px-6 py-28 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto flex flex-col gap-10">

          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-tokeo-gold">
              Get Started
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-tokeo-cream leading-[1.05] tracking-tight mt-4">
              Your path is personal.
            </h2>
            <p className="text-tokeo-cream/50 text-lg leading-relaxed mt-5 max-w-xl">
              An Execution Assessment finds your highest-leverage starting
              point across all eight capabilities — then tracks how you
              improve.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {plans.map(({ label, price, period }) => (
              <div key={label} className="bg-white/[0.04] border border-white/10 rounded-2xl p-8 flex flex-col gap-3">
                <span className="text-xs font-bold tracking-[0.15em] uppercase text-tokeo-gold">
                  {label}
                </span>
                <p className="text-tokeo-cream text-4xl font-bold tracking-tight">
                  {price}
                  <span className="text-tokeo-cream/40 text-base font-medium ml-1">{period}</span>
                </p>
                <p className="text-tokeo-cream/45 text-sm leading-relaxed">
                  Full access to all eight modules, your Labs, and your assessment.
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="/contact" size="lg">Join the Waitlist</Button>
          </div>

        </div>
      </section>
    </>
  )
}
