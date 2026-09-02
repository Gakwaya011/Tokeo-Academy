import { useContext, useEffect, useState } from 'react'
import { Navigate, useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Button from '../components/ui/Button'
import { InsightsDataContext } from '../context/InsightsDataContext'
import { API_URL } from '../lib/api'
import type { Insight } from '../types/insight'

export default function InsightArticle() {
  const { slug } = useParams<{ slug: string }>()
  const ssrInsights = useContext(InsightsDataContext)
  const [article, setArticle] = useState<Insight | undefined>(() => ssrInsights?.find((a) => a.slug === slug))
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) return
    fetch(`${API_URL}/api/insights/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found')
        return res.json()
      })
      .then(({ insight }) => setArticle(insight))
      .catch(() => setNotFound(true))
  }, [slug])

  if (notFound && !article) return <Navigate to="/insights" replace />
  if (!article) return null

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
