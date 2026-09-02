import founderPhoto from '../assets/founder.jpeg'

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

          {/* Portrait */}
          <div className="lg:col-span-4">
            <div className="aspect-[4/5] w-full bg-tokeo-navy relative overflow-hidden">
              <img
                src={founderPhoto}
                alt="Léonce Ngaboyakema, founder of Tokeo Academy"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <p className="text-tokeo-navy font-semibold mt-5">Léonce Ngaboyakema</p>
            <p className="text-tokeo-navy/50 text-sm leading-relaxed mt-1">
              Founder, Tokeo Academy · Execution &amp; social enterprise leader
            </p>
          </div>

          {/* Bio */}
          <div className="lg:col-span-8 flex flex-col gap-7">
            <span className="text-xs font-semibold tracking-widest uppercase text-tokeo-gold">
              Meet the Founder
            </span>
            <p className="text-tokeo-navy text-2xl leading-relaxed font-medium tracking-tight">
              Léonce has spent more than a decade turning ambitious
              strategies into results — across execution, agriculture,
              finance and organizational leadership, in complex
              real-world environments.
            </p>
            <p className="text-tokeo-navy/55 text-lg leading-relaxed">
              As Managing Director of One Acre Fund's Rwanda program, he
              leads an operation serving more than one million farmers
              through large field networks, where consistent execution —
              from strategy to the last mile — decides whether farmers
              see meaningful impact.
            </p>
            <p className="text-tokeo-navy/55 text-lg leading-relaxed">
              One pattern kept repeating: people and organizations rarely
              struggle for lack of ideas or ambition. The gap is between
              knowing what needs to be done and building the habits,
              systems and discipline to do it consistently. That insight
              became Tokeo Academy — carrying his experience in
              large-scale execution, leadership development and mentoring
              entrepreneurs into one aim: make practical execution
              capability accessible to the next generation of African
              professionals, entrepreneurs and leaders.
            </p>
            <blockquote className="border-l-2 border-tokeo-gold pl-5 text-tokeo-navy text-xl leading-relaxed italic">
              "Potential is abundant. Consistent execution is rare. Tokeo
              exists to close that gap."
            </blockquote>
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
              the days you do. That means treating execution as a set of
              skills, practising them on real challenges, and a
              structure that keeps going when motivation does not.
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