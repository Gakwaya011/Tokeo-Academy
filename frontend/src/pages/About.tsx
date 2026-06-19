export default function About() {
  return (
    <>
      {/* Hero — page intro */}
      <section className="w-full bg-tokeo-navy px-6 py-32 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto flex flex-col gap-7">
          <span className="text-xs font-semibold tracking-widest uppercase text-tokeo-gold">
            About Tokeo
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-tokeo-cream leading-[1.02] tracking-tight">
            We exist because knowing was never the problem.
          </h1>
          <p className="text-tokeo-cream/50 text-xl leading-relaxed max-w-2xl">
            Tokeo Academy is built on one belief: execution is a skill,
            not a personality trait. It can be trained, structured, and
            sustained — if the system around you is built right.
          </p>
        </div>
      </section>

      {/* Founder story */}
      <section className="w-full bg-tokeo-offwhite px-6 py-32 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Portrait placeholder */}
          <div className="lg:col-span-4">
            <div className="aspect-[4/5] w-full bg-tokeo-navy relative overflow-hidden">
              {/* Abstract silhouette mark */}
              <svg
                viewBox="0 0 200 250"
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="xMidYMax slice"
              >
                <circle cx="100" cy="90" r="42" fill="#eaa62322" />
                <path
                  d="M 40 250 Q 40 150 100 150 Q 160 150 160 250 Z"
                  fill="#eaa62315"
                />
              </svg>
              <div className="absolute bottom-6 left-6">
                <p className="text-tokeo-gold text-xs font-semibold tracking-widest uppercase">
                  Founder
                </p>
                <p className="text-tokeo-cream/40 text-xs mt-1">
                  Photo coming soon
                </p>
              </div>
            </div>
          </div>

          {/* Story */}
          <div className="lg:col-span-8 flex flex-col gap-7">
            <span className="text-xs font-semibold tracking-widest uppercase text-tokeo-gold">
              The Story
            </span>
            <p className="text-tokeo-navy text-2xl leading-relaxed font-medium tracking-tight">
              I spent years collecting knowledge I never used. Courses
              finished and forgotten, plans written and abandoned by the
              second week.
            </p>
            <p className="text-tokeo-navy/55 text-lg leading-relaxed">
              The problem was never information. I had access to more of
              it than any generation before me. What I lacked was a
              structure that held me accountable when motivation
              inevitably ran out — something that did not depend on how
              I felt on any given day.
            </p>
            <p className="text-tokeo-navy/55 text-lg leading-relaxed">
              Tokeo is that structure. Not another course promising
              transformation, but a system built around one premise:
              execution is a skill you build through repetition, not an
              attitude you summon through inspiration.
            </p>
          </div>

        </div>
      </section>

      {/* Mission / Philosophy */}
      <section className="w-full bg-tokeo-navy px-6 py-32 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">

          <div className="lg:col-span-4">
            <span className="text-xs font-semibold tracking-widest uppercase text-tokeo-gold">
              Our Philosophy
            </span>
            <h2 className="text-4xl font-bold text-tokeo-cream leading-tight mt-5 tracking-tight">
              Discipline over motivation.
            </h2>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-7">
            <p className="text-tokeo-cream text-2xl leading-relaxed font-medium tracking-tight">
              Motivation is unreliable by design. It spikes and fades. A
              system that depends on it will always fail eventually.
            </p>
            <p className="text-tokeo-cream/55 text-lg leading-relaxed">
              We build for the days you do not feel like it, not just
              the days you do. That means small, repeatable actions,
              honest tracking, and accountability that does not
              disappear the moment things get hard.
            </p>
          </div>

        </div>
      </section>

      {/* CBC positioning */}
      <section className="w-full bg-tokeo-offwhite px-6 py-32 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto flex flex-col gap-7">
          <span className="text-xs font-semibold tracking-widest uppercase text-tokeo-gold">
            Built for CBC
          </span>
          <h2 className="text-4xl font-bold text-tokeo-navy leading-tight tracking-tight">
            Designed around how students learn today.
          </h2>
          <p className="text-tokeo-navy/55 text-xl leading-relaxed max-w-2xl">
            The Competency-Based Curriculum shifted education toward
            applied skill and demonstrated ability, not memorized
            theory. Tokeo extends that same logic beyond the classroom:
            what matters is not what you can recite, but what you can
            consistently execute.
          </p>
        </div>
      </section>
    </>
  )
}