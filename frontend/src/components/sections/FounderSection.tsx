export default function FounderSection() {
  return (
    <section id="founder" className="w-full bg-tokeo-navy px-6 py-28 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

        {/* Left — label and framing */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          <span className="text-xs font-semibold tracking-widest uppercase text-tokeo-gold">
            Why Tokeo Exists
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-tokeo-cream leading-tight">
            Built by someone who lived the gap.
          </h2>
        </div>

        {/* Right — founder narrative */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <p className="text-tokeo-cream text-xl md:text-2xl leading-relaxed font-medium">
            I spent years collecting knowledge I never used. Courses finished
            and forgotten, plans written and abandoned by the second week.
          </p>
          <p className="text-tokeo-cream/55 text-lg leading-relaxed">
            The problem was never information. I had access to more of it
            than any generation before me. What I lacked was a structure
            that held me accountable when motivation inevitably ran out —
            something that did not depend on how I felt on any given day.
          </p>
          <p className="text-tokeo-cream/55 text-lg leading-relaxed">
            Tokeo is that structure. Not another course promising
            transformation, but a system built around one premise:
            execution is a skill you build through repetition, not
            an attitude you summon through inspiration.
          </p>

          <div className="flex items-center gap-4 pt-6 border-t border-white/10 mt-2">
            <div className="w-12 h-12 rounded-full bg-tokeo-gold/20 border border-tokeo-gold/40 flex items-center justify-center">
              <span className="text-tokeo-gold font-bold text-sm">TA</span>
            </div>
            <div>
              <p className="text-tokeo-cream font-semibold">Founder, Tokeo Academy</p>
              <p className="text-tokeo-cream/40 text-sm">Building the execution layer most platforms skip.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}