import Button from '../components/ui/Button'

export default function PrivacyPolicy() {
  return (
    <section className="w-full bg-tokeo-navy px-6 py-32 md:px-12 lg:px-24">
      <div className="max-w-2xl mx-auto flex flex-col gap-7">
        <span className="text-xs font-semibold tracking-widest uppercase text-tokeo-gold">
          Privacy Policy
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-tokeo-cream leading-tight tracking-tight">
          Being finalized ahead of launch.
        </h1>
        <p className="text-tokeo-cream/50 text-lg leading-relaxed">
          We're writing a full privacy policy alongside the pilot launch,
          so it accurately reflects what we collect and how it's used
          once the platform is live. Until then: any information you
          share through this site — like the contact form — is used only
          to follow up with you, and is never sold or shared with third
          parties.
        </p>
        <p className="text-tokeo-cream/50 text-lg leading-relaxed">
          Questions in the meantime? Reach out directly.
        </p>
        <Button href="/contact" size="lg" className="w-fit mt-2">Contact Us</Button>
      </div>
    </section>
  )
}
