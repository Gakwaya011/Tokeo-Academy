import Button from '../components/ui/Button'

const sections = [
  {
    heading: 'What we collect',
    body: [
      'Information you give us directly. When you submit the contact or waitlist form, we collect your name, email address, phone number, the segment you select (learner, entrepreneur, manager, employer/institution or partner), what you are interested in, and any message you write.',
      'Analytics data. If you accept analytics cookies, Google Analytics 4 records standard usage data — pages visited, links and buttons clicked, scroll depth, approximate location (city level), device type, and the site or search that referred you. This is tied to a random identifier, not to your name.',
    ],
  },
  {
    heading: 'How we use it',
    body: [
      'Form submissions are used only to respond to you and to plan the pilot cohort. Analytics data is used in aggregate to understand which pages and messages are working and to improve the site.',
      'We do not sell your information, and we do not share it with third parties except the service providers that run this site (our hosting provider and, for analytics, Google) acting on our instructions.',
    ],
  },
  {
    heading: 'Cookies',
    body: [
      'The site sets no analytics or advertising cookies unless you choose Accept on the cookie banner. Declining keeps analytics switched off; you can change your mind by clearing the site data in your browser. A single small entry is stored to remember your choice.',
    ],
  },
  {
    heading: 'Retention and your choices',
    body: [
      'We keep form submissions for as long as we are actively planning and running the pilot, then delete them. You can ask us to show you what we hold about you, correct it, or delete it — email tokeoacademy@gmail.com and we will action it.',
    ],
  },
]

export default function PrivacyPolicy() {
  return (
    <section className="w-full bg-tokeo-navy px-6 py-32 md:px-12 lg:px-24">
      <div className="max-w-2xl mx-auto flex flex-col gap-7">
        <span className="text-xs font-semibold tracking-widest uppercase text-tokeo-gold">
          Privacy Policy
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-tokeo-cream leading-tight tracking-tight">
          What we collect, and why.
        </h1>
        <p className="text-tokeo-cream/50 text-lg leading-relaxed">
          Tokeo Academy is pre-launch. This policy covers the website as it
          stands today and will be expanded when the platform goes live.
          It is written to be accurate about current practice rather than
          to cover every future case.
        </p>

        {sections.map(({ heading, body }) => (
          <div key={heading} className="flex flex-col gap-3 pt-4 border-t border-white/10">
            <h2 className="text-tokeo-cream text-xl font-bold tracking-tight">{heading}</h2>
            {body.map((p, i) => (
              <p key={i} className="text-tokeo-cream/50 text-lg leading-relaxed">{p}</p>
            ))}
          </div>
        ))}

        <p className="text-tokeo-cream/40 text-sm leading-relaxed pt-4 border-t border-white/10">
          Tokeo Academy · Kigali, Rwanda · tokeoacademy@gmail.com. Questions
          about this policy? Reach out and we will answer directly.
        </p>
        <Button href="/contact" size="lg" className="w-fit mt-2">Contact Us</Button>
      </div>
    </section>
  )
}
