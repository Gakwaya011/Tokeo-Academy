import Button from '../components/ui/Button'

export default function TermsOfService() {
  return (
    <section className="w-full bg-tokeo-navy px-6 py-32 md:px-12 lg:px-24">
      <div className="max-w-2xl mx-auto flex flex-col gap-7">
        <span className="text-xs font-semibold tracking-widest uppercase text-tokeo-gold">
          Terms of Service
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-tokeo-cream leading-tight tracking-tight">
          Being finalized ahead of launch.
        </h1>
        <p className="text-tokeo-cream/50 text-lg leading-relaxed">
          Formal terms will be published alongside the pilot launch, once
          enrollment and payment are handled through the platform rather
          than a manual review. Right now, this site is informational —
          reaching out through the contact form does not commit you to
          anything.
        </p>
        <p className="text-tokeo-cream/50 text-lg leading-relaxed">
          Questions in the meantime? Reach out directly.
        </p>
        <Button href="/contact" size="lg" className="w-fit mt-2">Contact Us</Button>
      </div>
    </section>
  )
}
