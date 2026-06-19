import Button from '../ui/Button'
import heroImg from '../../assets/hero.jpeg'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">

      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt=""
          className="w-full h-full object-cover"
        />
        {/* Base tint over whole image */}
        <div className="absolute inset-0 bg-tokeo-navy/40" />
        {/* Stronger dark gradient on the left, where text sits */}
        <div className="absolute inset-0 bg-gradient-to-r from-tokeo-navy/90 via-tokeo-navy/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto w-full px-6 md:px-12 lg:px-24 py-24">
        <div className="max-w-2xl flex flex-col gap-6">

          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-tokeo-gold border border-tokeo-gold/50 px-3 py-1 w-fit">
            Execution Platform
          </span>

          <h1 className="text-5xl md:text-6xl font-bold text-tokeo-cream leading-[1.1]">
            Build execution habits that turn{' '}
            <span className="text-tokeo-gold">potential</span>{' '}
            into performance.
          </h1>

          <p className="text-tokeo-cream/70 text-lg leading-relaxed max-w-lg">
            Most people don't fail because they lack knowledge or motivation.
            They fail because they never build the systems to act consistently.
            Tokeo is that system.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Button href="/contact" size="lg">Join the Waitlist</Button>
            <Button href="/programs" variant="secondary" size="lg">See the Program</Button>
          </div>

          <p className="text-tokeo-cream/40 text-sm">
            Pilot cohort opening soon — limited spots available.
          </p>

        </div>
      </div>

    </section>
  )
}