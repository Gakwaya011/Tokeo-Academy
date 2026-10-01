import { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Button from '../components/ui/Button'
import { ProgramsDataContext } from '../context/ProgramsDataContext'
import { API_URL } from '../lib/api'
import NotFound from './NotFound'
import type { Program } from '../types/program'

export default function ProgramModule() {
  const { slug } = useParams<{ slug: string }>()
  const ssrPrograms = useContext(ProgramsDataContext)
  const [attempt, setAttempt] = useState(0)
  const [result, setResult] = useState(() => {
    const item = ssrPrograms?.find((entry) => entry.slug === slug)
    return { slug, item: item as Program | undefined, notFound: ssrPrograms !== null && !item, error: false }
  })
  // Do not reuse the previous slug's content or 404 while navigating.
  const module = result.slug === slug ? result.item : undefined
  const notFound = result.slug === slug && result.notFound
  const failed = result.slug === slug && result.error

  useEffect(() => {
    if (!slug) return
    let cancelled = false
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 10000)
    fetch(`${API_URL}/api/programs/${encodeURIComponent(slug)}`, { signal: controller.signal })
      .then(async (res) => {
        if (res.status === 404) {
          if (!cancelled) setResult({ slug, item: undefined, notFound: true, error: false })
          return
        }
        if (!res.ok) throw new Error(`/programs/${slug} responded ${res.status}`)
        const { program } = await res.json()
        if (!program || program.slug !== slug) throw new Error('Invalid program response')
        if (!cancelled) setResult({ slug, item: program, notFound: false, error: false })
      })
      .catch((error) => {
        if (cancelled) return
        console.error('Unable to fetch program:', error)
        // Keep confirmed SSR content/404s when a background refresh fails.
        setResult((previous) => previous.slug === slug && (previous.item || previous.notFound)
          ? previous
          : { slug, item: undefined, notFound: false, error: true })
      })
      .finally(() => window.clearTimeout(timeout))
    return () => {
      cancelled = true
      window.clearTimeout(timeout)
      controller.abort()
    }
  }, [slug, attempt])

  useEffect(() => {
    if (notFound) document.title = 'Page Not Found | Tokeo Academy'
    else if (module) document.title = `${module.title} — Execution Foundations | Tokeo Academy`
  }, [module, notFound])

  if (notFound) return <NotFound />
  if (!module) return (
    <section className="w-full bg-tokeo-offwhite px-6 py-40 md:px-12 lg:px-24 flex items-center justify-center min-h-screen" aria-busy={!failed}>
      <div className="max-w-2xl mx-auto flex flex-col items-center text-center gap-7">
        <p role={failed ? 'alert' : 'status'} className="text-tokeo-navy text-lg leading-relaxed">
          {failed ? "We couldn't load this program. Please try again." : 'Loading program...'}
        </p>
        {failed && (
          <Button onClick={() => {
            setResult({ slug, item: undefined, notFound: false, error: false })
            setAttempt((value) => value + 1)
          }}>
            Try again
          </Button>
        )}
      </div>
    </section>
  )

  const { number, title, tagline, challenge, artifact, quote, imageUrl } = module

  return (
    <>
      {/* Header */}
      <section className="relative w-full bg-tokeo-navy px-6 pt-32 pb-20 md:px-12 lg:px-24 overflow-hidden">
        {imageUrl && (
          <>
            <img src={imageUrl} alt="" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-tokeo-navy/85" />
          </>
        )}
        <div className="relative max-w-3xl mx-auto flex flex-col gap-6">
          <Link to="/programs" className="inline-flex items-center gap-2 text-sm text-tokeo-cream/50 hover:text-tokeo-cream w-fit">
            <ArrowLeft size={15} /> Back to Programs
          </Link>
          <span className="text-xs font-bold tracking-widest uppercase text-tokeo-gold w-fit">
            Module {number}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-tokeo-cream leading-[1.1] tracking-tight">
            {title}
          </h1>
          <p className="text-tokeo-cream/55 text-xl leading-relaxed">
            {tagline}
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="w-full bg-tokeo-offwhite px-6 py-20 md:px-12 lg:px-24">
        <div className="max-w-3xl mx-auto flex flex-col gap-10">

          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold tracking-widest uppercase text-tokeo-navy/40">
              The challenge
            </span>
            <p className="text-tokeo-navy text-xl leading-relaxed font-medium tracking-tight">
              {challenge}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold tracking-widest uppercase text-tokeo-navy/40">
              You will build
            </span>
            <p className="text-tokeo-navy text-lg leading-relaxed font-semibold">
              {artifact}
            </p>
          </div>

          <div className="border-l-2 border-tokeo-gold/40 pl-6">
            <p className="text-tokeo-navy/60 text-lg italic leading-relaxed">
              "{quote}"
            </p>
          </div>

        </div>
      </section>

      {/* Closing CTA */}
      <section className="w-full bg-tokeo-navy px-6 py-32 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto flex flex-col items-start gap-8">
          <span className="text-xs font-semibold tracking-widest uppercase text-tokeo-gold">
            Get Started
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-tokeo-cream leading-[1.05] tracking-tight">
            Start with this module.
          </h2>
          <p className="text-tokeo-cream/55 text-lg leading-relaxed max-w-xl">
            Join the waitlist and we'll help you find your highest-leverage
            place to begin the moment the pilot opens.
          </p>
          <Button href="/contact" size="lg" className="mt-2">Join the Waitlist</Button>
        </div>
      </section>
    </>
  )
}
