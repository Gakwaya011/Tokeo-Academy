import { useState, useEffect } from 'react'
import Button from '../ui/Button'
import logo from '../../assets/logo-cream.png'

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
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navClass = scrolled
    ? 'fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-tokeo-navy border-b border-white/10 shadow-lg shadow-black/20'
    : 'fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent border-b border-transparent'

  return (
    <nav className={navClass}>
      <div className="max-w-6xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        <a href="/">
          <img src={logo} alt="Tokeo Academy" className="h-14 w-auto" />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map(({ label, href }) => (
            <a key={label} href={href} className="text-sm text-tokeo-cream/70 hover:text-tokeo-cream transition-colors">
              {label}
            </a>
          ))}
          <Button size="sm" href="/contact">Join Waitlist</Button>
        </div>

        <button className="md:hidden text-tokeo-cream" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <div className={`w-5 h-0.5 bg-current transition-all ${open ? 'rotate-45 translate-y-1.5' : ''}`} />
          <div className={`w-5 h-0.5 bg-current my-1 transition-all ${open ? 'opacity-0' : ''}`} />
          <div className={`w-5 h-0.5 bg-current transition-all ${open ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-tokeo-navy border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {links.map(({ label, href }) => (
            <a key={label} href={href} className="text-tokeo-cream/80 hover:text-tokeo-cream text-sm" onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <Button size="sm" href="/contact">Join Waitlist</Button>
        </div>
      )}
    </nav>
  )
}