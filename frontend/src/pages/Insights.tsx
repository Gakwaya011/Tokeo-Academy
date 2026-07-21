import { PenLine } from 'lucide-react'
import Button from '../components/ui/Button'

const topics = [
  'Execution habits',
  'Accountability systems',
  'Daily planning',
  'Consistency over motivation',
]

export default function Insights() {
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

      {/* Coming soon */}
      <section className="w-full bg-tokeo-offwhite px-6 py-28 md:px-12 lg:px-24">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-6">
          <span className="w-14 h-14 rounded-2xl bg-tokeo-navy flex items-center justify-center">
            <PenLine size={22} className="text-tokeo-gold" />
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-tokeo-navy tracking-tight">
            The first pieces publish with the pilot.
          </h2>

          <p className="text-tokeo-navy/55 text-lg leading-relaxed max-w-xl">
            We are writing from what actually happens inside the cohort,
            not in advance of it — so insights will start publishing once
            the pilot is underway.
          </p>

          <div className="flex flex-wrap justify-center gap-2.5 mt-2">
            {topics.map((topic) => (
              <span
                key={topic}
                className="text-sm text-tokeo-navy/60 border border-tokeo-navy/15 rounded-full px-4 py-1.5"
              >
                {topic}
              </span>
            ))}
          </div>

          <Button href="/contact" size="md" className="mt-4">Get notified when we publish</Button>
        </div>
      </section>
    </>
  )
}