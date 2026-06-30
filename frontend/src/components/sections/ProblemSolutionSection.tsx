export default function ProblemSolutionSection() {
  return (
    <section id="problem-solution" className="w-full bg-tokeo-offwhite px-6 py-28 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto flex flex-col gap-10 lg:flex-row">

        {/* Problem Statement card */}
        <div className="flex-1 bg-white rounded-2xl p-10 md:p-12 relative overflow-hidden shadow-sm">
          {/* Decorative corner blob */}
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-tokeo-navy/5" />

          {/* Icon badge */}
          <div className="w-14 h-14 rounded-xl bg-tokeo-navy flex items-center justify-center mb-6 relative z-10">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
                stroke="#eaa623"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <p className="text-tokeo-navy/40 text-xs font-bold tracking-widest uppercase mb-3 relative z-10">
            Problem Statement
          </p>
          <h3 className="text-2xl md:text-3xl font-bold text-tokeo-navy tracking-tight mb-4 relative z-10">
            Knowledge without execution.
          </h3>
          <p className="text-tokeo-navy/55 leading-relaxed relative z-10">
            Most people already have the courses finished and the plan
            written. What they lack is the structure that keeps them
            going after the motivation fades, and the accountability
            that notices when they quietly stop.
          </p>
        </div>

        {/* Solution card */}
        <div className="flex-1 bg-white rounded-2xl p-10 md:p-12 relative overflow-hidden shadow-sm">
          {/* Decorative corner blob */}
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-tokeo-gold/10" />

          {/* Icon badge */}
          <div className="w-14 h-14 rounded-xl bg-tokeo-gold flex items-center justify-center mb-6 relative z-10">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
                stroke="#10112c"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <p className="text-tokeo-gold text-xs font-bold tracking-widest uppercase mb-3 relative z-10">
            Solution
          </p>
          <h3 className="text-2xl md:text-3xl font-bold text-tokeo-navy tracking-tight mb-4 relative z-10">
            A system built for follow-through.
          </h3>
          <p className="text-tokeo-navy/55 leading-relaxed relative z-10">
            Tokeo plans one clear action a day, tracks it honestly, and
            sends nudges before drift becomes a pattern. Execution
            becomes a habit you repeat, not a decision you have to
            remake every morning.
          </p>
        </div>

      </div>
    </section>
  )
}
