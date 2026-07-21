import Button from '../components/ui/Button'

export default function NotFound() {
  return (
    <section className="w-full bg-tokeo-offwhite px-6 py-40 md:px-12 lg:px-24 flex items-center min-h-screen">
      <div className="max-w-2xl mx-auto flex flex-col items-center text-center gap-7">
        <span className="text-xs font-semibold tracking-widest uppercase text-tokeo-gold">
          404
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-tokeo-navy leading-tight tracking-tight">
          This page didn't make the cut.
        </h1>
        <p className="text-tokeo-navy/55 text-lg leading-relaxed max-w-md">
          The page you're looking for doesn't exist, or has moved.
          Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <Button href="/" size="lg">Back to Home</Button>
          <a
            href="/contact"
            className="inline-flex items-center justify-center font-semibold tracking-wide transition-all duration-200 px-8 py-4 text-lg rounded border border-tokeo-navy/20 text-tokeo-navy hover:bg-tokeo-navy hover:text-tokeo-cream"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  )
}
