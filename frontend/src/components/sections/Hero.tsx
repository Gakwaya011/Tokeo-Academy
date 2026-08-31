import Button from '../ui/Button'
import heroImg from '../../assets/hero.jpeg'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">

      {/* ── Background ────────────────────────────────────────── */}
      <div className="absolute inset-0">
        <img src={heroImg} alt="" className="w-full h-full object-cover object-center" />
        {/* Base darkening */}
        <div className="absolute inset-0 bg-black/35" />
        {/* Left shadow — where the text lives */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-transparent" />
        {/* Top vignette — blends into the floating navbar */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-transparent" />
        {/* Bottom vignette — grounds the section */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>                

      {/* ── Content ───────────────────────────────────────────── */}
      <div className="relative z-10 max-w-6xl mx-auto w-full px-6 md:px-12 lg:px-24 py-28">
        <div className="max-w-3xl flex flex-col gap-7">

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-tokeo-cream leading-[1.1] tracking-tight">
            Build execution habits that turn what you know into{' '}
            <span className="text-tokeo-gold italic">what you consistently do.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-tokeo-cream/60 text-lg leading-relaxed max-w-md">
            Most people don't fail from a lack of knowledge — they fail
            because they never built a system to act on it.
            Tokeo is that system.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button href="/contact" size="lg">Join the Waitlist</Button>
          </div>

          {/* Note */}
          <p className="text-tokeo-cream/35 text-sm tracking-wide">
            Pilot cohort opening soon — limited spots available.
          </p>

        </div>
      </div>

      {/* ── Scroll indicator ──────────────────────────────────── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-px h-16 bg-gradient-to-b from-tokeo-cream/50 to-transparent" />
      </div>

    </section>
  )
}
