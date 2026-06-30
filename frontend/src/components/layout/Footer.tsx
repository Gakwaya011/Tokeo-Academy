import { ArrowUpRight } from 'lucide-react'
import logoGold from '../../assets/logo-gold.png'

const nav = {
  Platform: [
    { label: 'About',        href: '/about'    },
    { label: 'Programs',     href: '/programs' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Insights',     href: '/insights' },
  ],
  Company: [
    { label: 'Partner With Us', href: '/contact' },
    { label: 'Contact',         href: '/contact' },
    { label: 'Press',           href: '/contact' },
  ],
}

const socials = [
  {
    label: 'LinkedIn',
    href: '#',
    svg: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: 'X',
    href: '#',
    svg: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    svg: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="bg-tokeo-navy">

      {/* ── Main columns ─────────────────────────────────── */}
      <div className="px-6 pt-16 pb-12 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Brand column */}
          <div className="flex flex-col gap-6">
            <img src={logoGold} alt="Tokeo Academy" className="h-8 w-auto self-start" />
            <p className="text-tokeo-cream/35 text-sm leading-relaxed max-w-[200px]">
              A cohort-based platform for people serious about follow-through.
            </p>
            <div className="flex gap-2.5">
              {socials.map(({ svg, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-full border border-white/[0.12] flex items-center justify-center text-tokeo-cream/35 hover:text-tokeo-cream hover:border-white/30 transition-all duration-200"
                >
                  {svg}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(nav).map(([group, links]) => (
            <div key={group} className="flex flex-col gap-5">
              <h4 className="text-[0.6rem] font-bold tracking-[0.2em] uppercase text-tokeo-gold">
                {group}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="group flex items-center gap-1 text-tokeo-cream/40 text-sm hover:text-tokeo-cream transition-colors duration-200"
                    >
                      {label}
                      <ArrowUpRight
                        size={12}
                        className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          <div className="flex flex-col gap-5">
            <h4 className="text-[0.6rem] font-bold tracking-[0.2em] uppercase text-tokeo-gold">
              Get In Touch
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'hello@tokeo.academy', href: 'mailto:hello@tokeo.academy' },
                { label: '+250 000 000 000',    href: 'tel:+250000000000' },
                { label: 'Kigali, Rwanda',      href: '#' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-tokeo-cream/40 text-sm hover:text-tokeo-cream transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────────────── */}
      <div className="border-t border-white/[0.07] px-6 py-5 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-tokeo-cream/20 text-xs">
            © {new Date().getFullYear()} Tokeo Academy. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service'].map(label => (
              <a
                key={label}
                href="#"
                className="text-tokeo-cream/20 text-xs hover:text-tokeo-cream/50 transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

    </footer>
  )
}
