import Button from '../ui/Button'

export default function CTASection() {
  return (
    <section id="cta" className="w-full bg-tokeo-offwhite px-6 py-28 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto flex flex-col items-start gap-8 text-left">

        <span className="text-xs font-semibold tracking-widest uppercase text-tokeo-gold">
          Get Started
        </span>

        <h2 className="text-4xl md:text-6xl font-bold text-tokeo-navy leading-[1.05]">
          Stop planning to start.
          <br />
          Start today.
        </h2>

        <p className="text-tokeo-navy/55 text-lg leading-relaxed max-w-xl">
          The pilot cohort is opening soon, with limited spots to keep the
          accountability structure tight. Join the waitlist to be first in
          line, or reach out if you want to partner with us.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Button href="/contact" size="lg">Join the Waitlist</Button>
          <Button href="/contact" variant="secondary" size="lg">Partner With Us</Button>
        </div>

      </div>
    </section>
  )
}