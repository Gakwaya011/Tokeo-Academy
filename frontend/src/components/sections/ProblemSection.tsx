export default function ProblemSection() {
  return (
    <section id="problem" className="w-full bg-tokeo-offwhite px-6 py-28 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto flex flex-col gap-16">

        {/* Header */}
        <div className="max-w-2xl">
          <span className="text-xs font-semibold tracking-widest uppercase text-tokeo-gold">
            The Problem
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-tokeo-navy leading-[1.05] mt-5">
            The execution gap is real.
          </h2>
        </div>

        {/* Split visual — chaos to order */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-tokeo-navy/15 border border-tokeo-navy/15">

          {/* Left — scattered / chaotic */}
          <div className="bg-tokeo-offwhite p-10 md:p-14 relative min-h-[420px] overflow-hidden">
            <span className="text-xs font-semibold tracking-widest uppercase text-tokeo-navy/35 absolute top-10 left-10 md:top-14 md:left-14">
              Where most people are
            </span>

            <div className="relative w-full h-full pt-12">
              <p className="absolute top-[18%] left-[2%] -rotate-6 text-tokeo-navy/70 text-lg">
                "I'll start Monday."
              </p>
              <p className="absolute top-[38%] left-[20%] rotate-3 text-tokeo-navy/50 text-xl font-medium">
                17 open tabs of courses
              </p>
              <p className="absolute top-[55%] left-[5%] -rotate-2 text-tokeo-navy/40 text-base">
                Notes app, half finished
              </p>
              <p className="absolute top-[70%] left-[28%] rotate-6 text-tokeo-navy/60 text-lg">
                "Why didn't I do this yesterday?"
              </p>
              <p className="absolute top-[85%] left-[8%] -rotate-3 text-tokeo-navy/30 text-sm">
                3 unread productivity books
              </p>
            </div>
          </div>

          {/* Right — ordered / clean */}
          <div className="bg-tokeo-navy p-10 md:p-14 flex flex-col justify-center gap-7 min-h-[420px]">
            <span className="text-xs font-semibold tracking-widest uppercase text-tokeo-gold">
              Where Tokeo takes you
            </span>

            <div className="flex flex-col gap-5">
              <div className="flex items-baseline gap-4">
                <span className="text-tokeo-gold font-bold text-sm w-6">01</span>
                <p className="text-tokeo-cream text-lg">One plan, written before the day starts.</p>
              </div>
              <div className="flex items-baseline gap-4">
                <span className="text-tokeo-gold font-bold text-sm w-6">02</span>
                <p className="text-tokeo-cream text-lg">A single action, tracked, not imagined.</p>
              </div>
              <div className="flex items-baseline gap-4">
                <span className="text-tokeo-gold font-bold text-sm w-6">03</span>
                <p className="text-tokeo-cream text-lg">A system that notices when you stop.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Closing line */}
        <p className="text-tokeo-navy/55 text-lg leading-relaxed max-w-xl">
          The gap between these two columns is not motivation.
          It is structure — and structure is exactly what we build.
        </p>

      </div>
    </section>
  )
}