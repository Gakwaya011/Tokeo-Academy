const steps = [
  {
    step: '01',
    title: 'Learn',
    body: 'Absorb what you need, no more and no less. Just enough to act, not enough to stall.',
  },
  {
    step: '02',
    title: 'Plan',
    body: 'Turn what you learned into one clear, specific action for the day ahead.',
  },
  {
    step: '03',
    title: 'Act',
    body: 'Do the thing. Not the perfect version of it. The real, imperfect version, today.',
  },
  {
    step: '04',
    title: 'Track',
    body: 'Log what happened, honestly. No streaks to fake, no excuses to hide behind.',
  },
  {
    step: '05',
    title: 'Improve',
    body: 'Adjust based on what the data shows, not on how you feel about it.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full bg-tokeo-offwhite px-6 py-28 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto flex flex-col gap-16">

        {/* Header */}
        <div className="max-w-2xl">
          <span className="text-xs font-semibold tracking-widest uppercase text-tokeo-gold">
            How It Works
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-tokeo-navy leading-[1.05] mt-5">
            Five steps. Every day.
          </h2>
        </div>

        {/* Step sequence */}
        <div className="flex flex-col">
          {steps.map(({ step, title, body }, i) => (
            <div
              key={step}
              className={`flex flex-col md:flex-row md:items-center gap-4 md:gap-12 py-8 ${
                i !== steps.length - 1 ? 'border-b border-tokeo-navy/15' : ''
              }`}
            >
              <span className="text-tokeo-gold text-sm font-bold tracking-widest w-16 shrink-0">
                {step}
              </span>
              <h3 className="text-tokeo-navy text-2xl md:text-3xl font-bold md:w-56 shrink-0">
                {title}
              </h3>
              <p className="text-tokeo-navy/55 text-lg leading-relaxed">
                {body}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}