import Button from '../components/ui/Button'

export default function Programs() {
  return (
    <>
      {/* Hero — page intro */}
      <section className="w-full bg-tokeo-navy px-6 py-32 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto flex flex-col gap-7">
          <span className="text-xs font-semibold tracking-widest uppercase text-tokeo-gold">
            The Pilot Program
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-tokeo-cream leading-[1.02] tracking-tight">
            A structured cohort built to prove the system works.
          </h1>
          <p className="text-tokeo-cream/50 text-xl leading-relaxed max-w-2xl">
            The pilot is a limited, focused cohort — not an open course.
            Small enough to actually hold every participant accountable,
            structured enough to produce real, measurable execution.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="w-full bg-tokeo-offwhite px-6 py-32 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">

          <div className="lg:col-span-4">
            <span className="text-xs font-semibold tracking-widest uppercase text-tokeo-gold">
              Overview
            </span>
            <h2 className="text-4xl font-bold text-tokeo-navy leading-tight mt-5 tracking-tight">
              What the pilot actually is.
            </h2>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-7">
            <p className="text-tokeo-navy text-2xl leading-relaxed font-medium tracking-tight">
              A fixed-length cohort where a small group commits to one
              clear execution system, together, with real accountability.
            </p>
            <p className="text-tokeo-navy/55 text-lg leading-relaxed">
              You will not sit through generic lessons. You will plan
              daily actions, log what you actually did, and have a
              structure around you that notices the moment you start
              slipping — before it becomes a pattern.
            </p>
            <p className="text-tokeo-navy/55 text-lg leading-relaxed">
              The goal of the pilot is simple: prove that the system
              produces consistent execution for real people, in real
              conditions, not just in theory.
            </p>
          </div>

        </div>
      </section>

      {/* Accountability structure */}
      <section className="w-full bg-tokeo-navy px-6 py-32 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto flex flex-col gap-16">

          <div className="max-w-2xl">
            <span className="text-xs font-semibold tracking-widest uppercase text-tokeo-gold">
              Accountability Structure
            </span>
            <h2 className="text-4xl font-bold text-tokeo-cream leading-tight mt-5 tracking-tight">
              How we keep you honest.
            </h2>
          </div>

          <div className="flex flex-col">

            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 py-8 border-b border-white/10">
              <h3 className="text-tokeo-cream text-2xl font-bold md:w-64 shrink-0">
                Daily check-ins
              </h3>
              <p className="text-tokeo-cream/55 text-lg leading-relaxed">
                A short daily log of what you planned versus what you
                actually did. No streaks to game, just honest tracking.
              </p>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 py-8 border-b border-white/10">
              <h3 className="text-tokeo-cream text-2xl font-bold md:w-64 shrink-0">
                Cohort visibility
              </h3>
              <p className="text-tokeo-cream/55 text-lg leading-relaxed">
                You are not executing alone in a vacuum. A small group
                of peers sees your consistency, and you see theirs.
              </p>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 py-8">
              <h3 className="text-tokeo-cream text-2xl font-bold md:w-64 shrink-0">
                Drift alerts
              </h3>
              <p className="text-tokeo-cream/55 text-lg leading-relaxed">
                When you start skipping days, the system flags it
                early, before two missed days quietly become twenty.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Daily planning & nudges */}
      <section className="w-full bg-tokeo-offwhite px-6 py-32 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">

          <div className="lg:col-span-4">
            <span className="text-xs font-semibold tracking-widest uppercase text-tokeo-gold">
              Daily Rhythm
            </span>
            <h2 className="text-4xl font-bold text-tokeo-navy leading-tight mt-5 tracking-tight">
              Planning and nudges, built in.
            </h2>
          </div>

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
      </section>

      {/* Pricing */}
      <section className="w-full bg-tokeo-offwhite px-6 pb-32 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto flex flex-col gap-10">

          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-tokeo-gold">
              Investment
            </span>
            <h2 className="text-4xl font-bold text-tokeo-navy leading-tight mt-5 tracking-tight">
              One price. No hidden tiers.
            </h2>
          </div>

          <div className="border border-tokeo-navy/15 p-10 md:p-12 flex flex-col gap-8">
            <div className="flex items-baseline gap-3">
              {/* TODO: Replace with real price once confirmed */}
              <span className="text-5xl md:text-6xl font-bold text-tokeo-navy tracking-tight">
                RWF [PRICE TBD]
              </span>
              <span className="text-tokeo-navy/40 text-lg">/ pilot cohort</span>
            </div>

            <div className="flex flex-col gap-4 pt-6 border-t border-tokeo-navy/10">
              <p className="text-tokeo-navy/70 leading-relaxed">
                {/* TODO: Replace with real description once confirmed */}
                Includes full access to the 5-step execution system, daily
                planning and accountability nudges, cohort visibility, and
                direct support for the full duration of the pilot.
              </p>
            </div>
          </div>

          <p className="text-tokeo-navy/45 text-sm">
            Payment is collected after your application is reviewed and
            accepted, not before.
          </p>

        </div>
      </section>

      {/* Eligibility / Application CTA */}
      <section className="w-full bg-tokeo-navy px-6 py-32 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto flex flex-col items-start gap-8">

          <span className="text-xs font-semibold tracking-widest uppercase text-tokeo-gold">
            Apply to the Pilot
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-tokeo-cream leading-[1.05] tracking-tight">
            Spots are limited, on purpose.
          </h2>

          <p className="text-tokeo-cream/55 text-lg leading-relaxed max-w-xl">
            The pilot is intentionally small to keep accountability
            real. We are looking for people who are serious about
            execution, not just curious about it. If that is you,
            apply below.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Button href="/contact" size="lg">Apply for the Pilot</Button>
            <Button href="/contact" variant="secondary" size="lg">Ask a Question</Button>
          </div>

        </div>
      </section>
    </>
  )
}