import { useState } from 'react'
import Button from '../components/ui/Button'

type FormData = {
  name: string
  email: string
  phone: string
  userType: string
  interestType: string
}

const initialForm: FormData = {
  name: '',
  email: '',
  phone: '',
  userType: '',
  interestType: '',
}

const userTypes = [
  { value: 'student', label: 'Student' },
  { value: 'professional', label: 'Professional' },
  { value: 'educator', label: 'Educator' },
  { value: 'partner', label: 'Potential Partner' },
]

const interestTypes = [
  { value: 'waitlist', label: 'Joining the waitlist' },
  { value: 'pilot', label: 'The pilot program' },
  { value: 'partnership', label: 'A partnership' },
]

export default function Contact() {
  const [form, setForm] = useState<FormData>(initialForm)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', form)
    setSubmitted(true)
  }

  const inputClass =
    'w-full bg-transparent border-b border-tokeo-navy/20 text-tokeo-navy placeholder:text-tokeo-navy/35 px-1 py-3.5 text-lg focus:outline-none focus:border-tokeo-gold transition-colors duration-200'

  return (
    <>
      {/* Hero — page intro */}
      <section className="w-full bg-tokeo-navy px-6 pt-32 pb-20 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 flex flex-col gap-7">
            <span className="text-xs font-semibold tracking-widest uppercase text-tokeo-gold">
              Get In Touch
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-tokeo-cream leading-[1.05] tracking-tight">
              Join the waitlist.
            </h1>
            <p className="text-tokeo-cream/50 text-xl leading-relaxed max-w-lg">
              Whether you want to join the pilot, get early access, or
              explore a partnership — start here.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="w-full bg-tokeo-offwhite px-6 py-28 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Left rail — context */}
          <div className="lg:col-span-4 flex flex-col gap-10 lg:border-r border-tokeo-navy/10 lg:pr-12">
            <div>
              <p className="text-tokeo-gold text-sm font-semibold tracking-widest uppercase mb-3">
                01
              </p>
              <p className="text-tokeo-navy/55 leading-relaxed">
                Pilot spots are limited and reviewed individually.
                Applications are not first-come, first-served.
              </p>
            </div>
            <div>
              <p className="text-tokeo-gold text-sm font-semibold tracking-widest uppercase mb-3">
                02
              </p>
              <p className="text-tokeo-navy/55 leading-relaxed">
                We typically respond within a few days with next
                steps or clarifying questions.
              </p>
            </div>
            <div>
              <p className="text-tokeo-gold text-sm font-semibold tracking-widest uppercase mb-3">
                03
              </p>
              <p className="text-tokeo-navy/55 leading-relaxed">
                Your information is used only to follow up with you.
                Nothing is shared with third parties.
              </p>
            </div>
          </div>

          {/* Right — the form */}
          <div className="lg:col-span-8">

            {submitted ? (
              <div className="flex flex-col gap-4 py-12">
                <h2 className="text-tokeo-navy text-3xl font-bold tracking-tight">
                  You're on the list.
                </h2>
                <p className="text-tokeo-navy/55 text-lg leading-relaxed max-w-md">
                  Thanks for reaching out. If you applied for the pilot,
                  we will review your application and follow up with
                  payment instructions once accepted. Otherwise, we will
                  be in touch with next steps soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-10">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Full name"
                    className={inputClass}
                  />
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="Email address"
                    className={inputClass}
                  />
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="Phone / WhatsApp"
                    className={inputClass}
                  />
                  <div className="hidden sm:block" />
                </div>

                {/* User type — pill selector */}
                <div className="flex flex-col gap-3">
                  <p className="text-tokeo-navy/40 text-sm tracking-wide">I am a</p>
                  <div className="flex flex-wrap gap-2">
                    {userTypes.map(({ value, label }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => handleChange('userType', value)}
                        className={`px-4 py-2 text-sm border transition-colors ${
                          form.userType === value
                            ? 'border-tokeo-gold bg-tokeo-gold/10 text-tokeo-gold'
                            : 'border-tokeo-navy/20 text-tokeo-navy/60 hover:border-tokeo-navy/40'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Interest type — pill selector */}
                <div className="flex flex-col gap-3">
                  <p className="text-tokeo-navy/40 text-sm tracking-wide">I'm interested in</p>
                  <div className="flex flex-wrap gap-2">
                    {interestTypes.map(({ value, label }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => handleChange('interestType', value)}
                        className={`px-4 py-2 text-sm border transition-colors ${
                          form.interestType === value
                            ? 'border-tokeo-gold bg-tokeo-gold/10 text-tokeo-gold'
                            : 'border-tokeo-navy/20 text-tokeo-navy/60 hover:border-tokeo-navy/40'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-fit mt-2">
                  Submit Application
                </Button>

              </form>
            )}

          </div>

        </div>
      </section>
    </>
  )
}