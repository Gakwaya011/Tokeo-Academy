import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Button from '../components/ui/Button'
import { InsightsDataContext } from '../context/InsightsDataContext'
import { API_URL } from '../lib/api'
import type { Insight } from '../types/insight'

export default function Insights() {
  const ssrInsights = useContext(InsightsDataContext)
  const [articles, setArticles] = useState<Insight[]>(ssrInsights ?? [])

  useEffect(() => {
    fetch(`${API_URL}/api/insights`)
      .then((res) => res.json())
      .then(({ insights }) => setArticles(insights))
      .catch(() => {})
  }, [])

  return (
    <>
      {/* Hero — page intro */}
      <section className="w-full bg-tokeo-navy px-6 py-32 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto flex flex-col gap-7">
          <span className="text-xs font-semibold tracking-widest uppercase text-tokeo-gold">
            Insights
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-tokeo-cream leading-[1.02] tracking-tight">
            Reflections on execution.
          </h1>
          <p className="text-tokeo-cream/50 text-xl leading-relaxed max-w-2xl">
            Short, honest writing on what it actually takes to follow
            through — not motivational fluff, just what we have
            learned building this system.
          </p>
        </div>
      </section>

      {/* Article grid */}
      <section className="w-full bg-tokeo-offwhite px-6 py-32 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto flex flex-col gap-16">

          <div className="max-w-2xl">
            <span className="text-xs font-semibold tracking-widest uppercase text-tokeo-gold">
              Latest
            </span>
            <h2 className="text-4xl font-bold text-tokeo-navy leading-tight mt-5 tracking-tight">
              The kind of writing to expect.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {articles.map(({ slug, imageUrl, imageFocus, category, title, excerpt }) => (
              <Link
                key={slug}
                to={`/insights/${slug}`}
                className="group flex flex-col bg-white border border-tokeo-navy/10 rounded-2xl overflow-hidden hover:border-tokeo-gold/50 hover:shadow-lg hover:shadow-tokeo-navy/5 transition-all"
              >
                <div className="relative h-44 bg-tokeo-navy/5">
                  {imageUrl && (
                    <img src={imageUrl} alt="" style={{ objectPosition: imageFocus }} className="w-full h-full object-cover" />
                  )}
                  <span className="absolute top-4 left-4 text-[0.65rem] font-bold tracking-widest uppercase text-tokeo-navy bg-white/90 px-3 py-1 rounded-full">
                    {category}
                  </span>
                </div>
                <div className="flex flex-col gap-3 p-7">
                  <h3 className="text-tokeo-navy text-xl font-bold tracking-tight leading-snug">
                    {title}
                  </h3>
                  <p className="text-tokeo-navy/55 text-sm leading-relaxed">
                    {excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-tokeo-gold mt-2">
                    Read full story
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* Closing CTA */}
      <section className="w-full bg-tokeo-navy px-6 py-32 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto flex flex-col items-start gap-8">

          <span className="text-xs font-semibold tracking-widest uppercase text-tokeo-gold">
            Stay in the loop
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-tokeo-cream leading-[1.05] tracking-tight">
            Be first to read.
          </h2>

          <p className="text-tokeo-cream/55 text-lg leading-relaxed max-w-xl">
            Leave your details and we'll let you know the moment the
            first pieces go live.
          </p>

          <Button href="/contact" size="lg" className="mt-2">Get notified</Button>

        </div>
      </section>
    </>
  )
}
