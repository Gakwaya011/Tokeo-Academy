const articles = [
  {
    title: 'Why knowledge alone never builds discipline',
    excerpt: 'Information has never been the bottleneck. The real gap is between knowing what to do and actually doing it, day after day.',
    date: 'Coming soon',
    readTime: '4 min read',
  },
  {
    title: 'The cost of starting over every Monday',
    excerpt: 'Restarting a habit is not free. Every reset costs momentum, confidence, and trust in your own follow-through.',
    date: 'Coming soon',
    readTime: '5 min read',
  },
  {
    title: 'What accountability actually means',
    excerpt: 'It is not about guilt or pressure. Real accountability is a structure that notices drift before it becomes a pattern.',
    date: 'Coming soon',
    readTime: '3 min read',
  },
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

      {/* Article list */}
      <section className="w-full bg-tokeo-offwhite px-6 py-28 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto flex flex-col">
          {articles.map(({ title, excerpt, date, readTime }, i) => (
            <article
              key={title}
              className={`flex flex-col gap-3 py-10 ${
                i !== articles.length - 1 ? 'border-b border-tokeo-navy/15' : ''
              }`}
            >
              <div className="flex items-center gap-3 text-xs text-tokeo-navy/40 font-semibold tracking-widest uppercase">
                <span>{date}</span>
                <span className="w-1 h-1 rounded-full bg-tokeo-navy/30" />
                <span>{readTime}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-tokeo-navy tracking-tight leading-snug">
                {title}
              </h2>
              <p className="text-tokeo-navy/55 text-lg leading-relaxed max-w-2xl">
                {excerpt}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}