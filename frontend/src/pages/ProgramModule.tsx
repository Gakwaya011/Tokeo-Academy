import { useContext, useEffect, useState } from 'react'
import { Navigate, useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Button from '../components/ui/Button'
import { ProgramsDataContext } from '../context/ProgramsDataContext'
import { API_URL } from '../lib/api'
import type { Program } from '../types/program'

export default function ProgramModule() {
  const { slug } = useParams<{ slug: string }>()
  const ssrPrograms = useContext(ProgramsDataContext)
  const [module, setModule] = useState<Program | undefined>(() => ssrPrograms?.find((m) => m.slug === slug))
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) return
    fetch(`${API_URL}/api/programs/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found')
        return res.json()
      })
      .then(({ program }) => setModule(program))
      .catch(() => setNotFound(true))
  }, [slug])

  if (notFound && !module) return <Navigate to="/programs" replace />
  if (!module) return null

  const { number, title, tagline, challenge, artifact, quote, imageUrl } = module

  return (
    <>
      {/* Header */}
      <section className="relative w-full bg-tokeo-navy px-6 pt-32 pb-20 md:px-12 lg:px-24 overflow-hidden">
        {imageUrl && (
          <>
            <img src={imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
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
