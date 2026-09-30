import { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Button from '../components/ui/Button'
import { InsightsDataContext } from '../context/InsightsDataContext'
import { API_URL } from '../lib/api'
import NotFound from './NotFound'
import type { Insight } from '../types/insight'

export default function InsightArticle() {
  const { slug } = useParams<{ slug: string }>()
  const ssrInsights = useContext(InsightsDataContext)
  const [attempt, setAttempt] = useState(0)
  const [result, setResult] = useState(() => {
    const item = ssrInsights?.find((entry) => entry.slug === slug)
    return { slug, item: item as Insight | undefined, notFound: ssrInsights !== null && !item, error: false }
  })
  // Do not reuse the previous slug's content or 404 while navigating.
  const article = result.slug === slug ? result.item : undefined
  const notFound = result.slug === slug && result.notFound
  const failed = result.slug === slug && result.error

  useEffect(() => {
    if (!slug) return
    let cancelled = false
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 10000)
    fetch(`${API_URL}/api/insights/${encodeURIComponent(slug)}`, { signal: controller.signal })
      .then(async (res) => {
        if (res.status === 404) {
          if (!cancelled) setResult({ slug, item: undefined, notFound: true, error: false })
          return
        }
        if (!res.ok) throw new Error(`/insights/${slug} responded ${res.status}`)
        const { insight } = await res.json()
        if (!insight || insight.slug !== slug) throw new Error('Invalid insight response')
        if (!cancelled) setResult({ slug, item: insight, notFound: false, error: false })
      })
      .catch((error) => {
        if (cancelled) return
        console.error('Unable to fetch insight:', error)
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

  if (notFound) return <NotFound />
  if (!article) return (
    <section className="w-full bg-tokeo-offwhite px-6 py-40 md:px-12 lg:px-24 flex items-center justify-center min-h-screen" aria-busy={!failed}>
      <div className="max-w-2xl mx-auto flex flex-col items-center text-center gap-7">
        <p role={failed ? 'alert' : 'status'} className="text-tokeo-navy text-lg leading-relaxed">
          {failed ? "We couldn't load this insight. Please try again." : 'Loading insight...'}
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

  const { imageUrl, imageFocus, category, title, body } = article

  return (
    <>
      {/* Header */}
      <section className="w-full bg-tokeo-navy px-6 pt-32 pb-16 md:px-12 lg:px-24">
        <div className="max-w-3xl mx-auto flex flex-col gap-6">
          <Link to="/insights" className="inline-flex items-center gap-2 text-sm text-tokeo-cream/50 hover:text-tokeo-cream w-fit">
            <ArrowLeft size={15} /> Back to Insights
          </Link>
          <span className="text-xs font-bold tracking-widest uppercase text-tokeo-gold w-fit">
            {category}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-tokeo-cream leading-[1.1] tracking-tight">
            {title}
          </h1>
        </div>
      </section>

      {/* Cover image */}
      {imageUrl && (
        <div className="w-full max-w-5xl mx-auto px-6 md:px-12 lg:px-0 -mt-10 relative z-10">
          <img
            src={imageUrl}
            alt=""
            decoding="async"
            style={{ objectPosition: imageFocus }}
            className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-xl shadow-tokeo-navy/10"
          />
        </div>
      )}

      {/* Body */}
      <section className="w-full bg-tokeo-offwhite px-6 pt-16 pb-28 md:px-12 lg:px-24">
        <div className="max-w-3xl mx-auto flex flex-col gap-6">
          {body.map((paragraph, i) => (
            <p key={i} className="text-tokeo-navy/70 text-lg leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="w-full bg-tokeo-navy px-6 py-32 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto flex flex-col items-start gap-8">
          <span className="text-xs font-semibold tracking-widest uppercase text-tokeo-gold">
            Stay in the loop
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-tokeo-cream leading-[1.05] tracking-tight">
            Be first to read the next one.
          </h2>
          <p className="text-tokeo-cream/55 text-lg leading-relaxed max-w-xl">
            Leave your details and we'll let you know the moment new
            pieces go live.
          </p>
          <Button href="/contact" size="lg" className="mt-2">Get notified</Button>
        </div>
      </section>
    </>
  )
}
