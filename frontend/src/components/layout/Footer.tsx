import { ArrowUpRight } from 'lucide-react'
import logoGoldDark from '../../assets/logo-gold-dark.png'

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

export default function Footer() {
  return (
    <footer className="bg-tokeo-navy">

      {/* ── Main columns ─────────────────────────────────── */}
      <div className="px-6 pt-16 pb-12 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Brand column */}
          <div className="flex flex-col gap-6">
            <img src={logoGoldDark} alt="Tokeo Academy" className="h-8 w-auto self-start" />
            <p className="text-tokeo-cream/35 text-sm leading-relaxed max-w-[220px]">
              An execution curriculum for professionals, entrepreneurs and
              teams — turning what you know into what you consistently do.
            </p>
            <p className="text-tokeo-cream/25 text-xs leading-relaxed max-w-[220px]">
              Tokeo Academy · Kigali, Rwanda. Built on the competency-based
              approach: applied skill over recall.
            </p>
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
                { label: 'tokeoacademy@gmail.com', href: 'mailto:tokeoacademy@gmail.com' },
                { label: '+250 788 495 519',       href: 'tel:+250788495519' },
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
              <li className="text-tokeo-cream/40 text-sm">Kigali, Rwanda</li>
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
            {[
              { label: 'Privacy Policy', href: '/privacy-policy' },
              { label: 'Terms of Service', href: '/terms-of-service' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
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
