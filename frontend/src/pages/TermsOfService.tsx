import Button from '../components/ui/Button'

const sections = [
  {
    heading: 'What this site is',
    body: [
      'tokeoacademy.org is an informational website for Tokeo Academy. It describes the programme, shares written insights, and lets you join the waitlist or get in touch. Enrolment and payment are handled separately, by individual review, and are not completed through this site.',
    ],
  },
  {
    heading: 'Using the site',
    body: [
      'You may read, share and link to these pages freely. Please do not attempt to break, overload or gain unauthorised access to the site or its systems, scrape it at scale, or submit false information through the forms.',
    ],
  },
  {
    heading: 'Content and ownership',
    body: [
      'The text, design, logo and articles on this site belong to Tokeo Academy unless stated otherwise. You are welcome to quote short passages with attribution and a link; republishing whole articles needs our permission.',
    ],
  },
  {
    heading: 'No guarantees',
    body: [
      'The site is provided as is. We work to keep it accurate and available, but we do not guarantee it will be error-free or uninterrupted, and nothing here is professional advice. Submitting a form does not create any obligation on either side until we have agreed terms with you directly.',
    ],
  },
]

export default function TermsOfService() {
  return (
    <section className="w-full bg-tokeo-navy px-6 py-32 md:px-12 lg:px-24">
      <div className="max-w-2xl mx-auto flex flex-col gap-7">
        <span className="text-xs font-semibold tracking-widest uppercase text-tokeo-gold">
          Terms of Service
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-tokeo-cream leading-tight tracking-tight">
          The basics, while we're pre-launch.
        </h1>
        <p className="text-tokeo-cream/50 text-lg leading-relaxed">
          Full programme terms — covering enrolment, payment and the
          platform itself — will be published when the pilot opens. These
          interim terms cover use of the website as it stands today.
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
          Tokeo Academy · Kigali, Rwanda · tokeoacademy@gmail.com
        </p>
        <Button href="/contact" size="lg" className="w-fit mt-2">Contact Us</Button>
      </div>
    </section>
  )
}
