import { useState, useEffect } from 'react'
import Button from '../ui/Button'
import logoCream from '../../assets/logo-cream.png'
import logoGold from '../../assets/logo-gold.png'

const links = [
  { label: 'About', href: '/about' },
  { label: 'Programs', href: '/programs' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const pillClass = scrolled
    ? 'bg-white border-black/8 shadow-lg shadow-black/7'
    : 'bg-white/[0.07] backdrop-blur-xl border-white/[0.13]'

  const linkClass = scrolled
    ? 'text-tokeo-navy/65 hover:text-tokeo-navy'
    : 'text-tokeo-cream/60 hover:text-tokeo-cream'

  return (
    <nav className="fixed top-4 left-4 right-4 z-50 md:top-5 md:left-8 md:right-8">
      <div
        className={`max-w-6xl mx-auto px-5 md:px-8 h-[60px] flex items-center justify-between rounded-full border transition-all duration-500 ${pillClass}`}
      >
        <a href="/" className="shrink-0">
          <img
            src={scrolled ? logoGold : logoCream}
            alt="Tokeo Academy"
            className="h-8 md:h-9 w-auto transition-all duration-500"
          />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className={`group relative text-sm tracking-wide transition-colors duration-300 ${linkClass}`}
            >
              {label}
              <span className="absolute -bottom-0.5 left-0 w-full h-[1.5px] bg-tokeo-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full" />
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <Button size="sm" href="/contact">Join Waitlist</Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`md:hidden p-1 transition-colors duration-300 ${scrolled ? 'text-tokeo-navy' : 'text-tokeo-cream'}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <div className={`w-5 h-[1.5px] bg-current transition-all duration-300 ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <div className={`w-5 h-[1.5px] bg-current my-[5px] transition-all duration-300 ${open ? 'opacity-0 scale-x-0' : ''}`} />
          <div className={`w-5 h-[1.5px] bg-current transition-all duration-300 ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className={`md:hidden mt-2 max-w-6xl mx-auto border rounded-2xl px-6 py-5 flex flex-col gap-4 shadow-xl ${
          scrolled
            ? 'bg-white border-black/8'
            : 'bg-tokeo-navy/95 backdrop-blur-xl border-white/10 shadow-black/40'
        }`}>
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className={`text-sm tracking-wide transition-colors ${
                scrolled ? 'text-tokeo-navy/70 hover:text-tokeo-navy' : 'text-tokeo-cream/70 hover:text-tokeo-cream'
              }`}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
          <div className={`pt-1 border-t ${scrolled ? 'border-black/10' : 'border-white/10'}`}>
            <Button size="sm" href="/contact">Join Waitlist</Button>
          </div>
        </div>
      )}
    </nav>
  )
}
