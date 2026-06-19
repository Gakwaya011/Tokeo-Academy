export default function SolutionSection() {
  return (
    <section id="solution" className="w-full bg-tokeo-navy px-6 py-28 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto flex flex-col gap-16">

        {/* Header */}
        <div className="max-w-2xl">
          <span className="text-xs font-semibold tracking-widest uppercase text-tokeo-gold">
            The Solution
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-tokeo-cream leading-[1.05] mt-5">
            Tokeo is the system, not another course.
          </h2>
          <p className="text-tokeo-cream/50 text-lg leading-relaxed mt-6 max-w-lg">
            We do not teach you more. We build the structure around what
            you already know, so it actually gets done.
          </p>
        </div>

        {/* Three pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">

          <div className="bg-tokeo-navy p-10 flex flex-col gap-4">
            <span className="text-tokeo-gold text-sm font-semibold tracking-widest uppercase">
              Planning
            </span>
            <h3 className="text-tokeo-cream text-2xl font-bold leading-snug">
              One clear action each day.
            </h3>
            <p className="text-tokeo-cream/50 leading-relaxed">
              No sprawling to-do lists. Every day starts with a single,
              specific action tied to what actually moves you forward.
            </p>
          </div>

          <div className="bg-tokeo-navy p-10 flex flex-col gap-4">
            <span className="text-tokeo-gold text-sm font-semibold tracking-widest uppercase">
              Accountability
            </span>
            <h3 className="text-tokeo-cream text-2xl font-bold leading-snug">
              Someone notices when you stop.
            </h3>
            <p className="text-tokeo-cream/50 leading-relaxed">
              Daily nudges and check-ins mean you are never quietly
              drifting alone. The system tracks what you skip.
            </p>
          </div>

          <div className="bg-tokeo-navy p-10 flex flex-col gap-4">
            <span className="text-tokeo-gold text-sm font-semibold tracking-widest uppercase">
              Repetition
            </span>
            <h3 className="text-tokeo-cream text-2xl font-bold leading-snug">
              Small actions, compounded.
            </h3>
            <p className="text-tokeo-cream/50 leading-relaxed">
              Execution is not a single decision. It is the same small
              action, repeated until it becomes who you are.
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}