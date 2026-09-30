import SiteLink from '../ui/SiteLink'
import { useEffect, useRef, useState } from 'react'
import { LogOut, ShieldCheck, User as UserIcon } from 'lucide-react'
import Button from '../ui/Button'
import { useAuth } from '../../context/AuthContext'
import logoCream from '../../assets/logo-cream.png'
import logoGold from '../../assets/logo-gold.png'

const links = [
  { label: 'About', href: '/about' },
  { label: 'Programs', href: '/programs' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
]

function initials(name: string) {
  return name.trim().split(/\s+/).slice(0, 2).map((p) => p[0]?.toUpperCase()).join('')
}

export default function Navbar() {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const accountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) setAccountOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const pillClass = scrolled
    ? 'bg-white border-black/8 shadow-lg shadow-black/7'
    : 'bg-white/[0.07] backdrop-blur-xl border-white/[0.13]'

  const linkClass = scrolled
    ? 'text-tokeo-navy/65 hover:text-tokeo-navy'
    : 'text-tokeo-cream/60 hover:text-tokeo-cream'

  return (
    <nav onClick={(event) => {
      if ((event.target as HTMLElement).closest('a')) {
        setOpen(false)
        setAccountOpen(false)
      }
    }} className="fixed top-4 left-4 right-4 z-50 md:top-5 md:left-8 md:right-8">
      <div
        className={`max-w-6xl mx-auto px-5 md:px-8 h-[60px] flex items-center justify-between rounded-full border transition-all duration-500 ${pillClass}`}
      >
        <SiteLink href="/" className="shrink-0">
          <img
            src={scrolled ? logoGold : logoCream}
            alt="Tokeo Academy"
            className="h-8 md:h-9 w-auto transition-all duration-500"
          />
        </SiteLink>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(({ label, href }) => (
            <SiteLink
              key={label}
              href={href}
              className={`min-h-[44px] flex items-center group text-sm tracking-wide transition-colors duration-300 ${linkClass}`}
            >
              <span className="relative">
                {label}
                <span className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-tokeo-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full" />
              </span>
            </SiteLink>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="relative" ref={accountRef}>
              <button
                onClick={() => setAccountOpen((o) => !o)}
                className={`min-h-[44px] min-w-[44px] rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                  scrolled ? 'bg-tokeo-navy text-tokeo-cream' : 'bg-tokeo-cream text-tokeo-navy'
                }`}
                aria-label="Account menu"
                aria-expanded={accountOpen}
              >
                {initials(user.name)}
              </button>
              {accountOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white text-tokeo-navy rounded-xl border border-black/8 shadow-xl shadow-black/10 py-2">
                  <div className="px-4 py-2 border-b border-black/5">
                    <p className="text-sm font-medium truncate">{user.name}</p>
                    <p className="text-xs text-tokeo-navy/50 truncate">{user.email}</p>
                  </div>
                  {user.role === 'ADMIN' && (
                    <SiteLink
                      href="/admin/messages"
                      onClick={() => setAccountOpen(false)}
                      className="w-full flex items-center min-h-[44px] gap-2 px-4 py-2 text-sm text-tokeo-navy/70 hover:bg-tokeo-navy/5"
                    >
                      <ShieldCheck size={14} /> Admin Dashboard
                    </SiteLink>
                  )}
                  <button
                    onClick={() => { logout(); setAccountOpen(false) }}
                    className="w-full flex items-center min-h-[44px] gap-2 px-4 py-2 text-sm text-tokeo-navy/70 hover:bg-tokeo-navy/5"
                  >
                    <LogOut size={14} /> Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <SiteLink
              href="/login"
              className={`flex items-center min-h-[44px] gap-1 text-sm tracking-wide transition-colors duration-300 ${linkClass}`}
            >
              <UserIcon size={15} /> Log In
            </SiteLink>
          )}
          <Button size="sm" href="/contact">Join Waitlist</Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`md:hidden p-1 min-h-[44px] min-w-[44px] flex flex-col justify-center items-center transition-colors duration-300 ${scrolled ? 'text-tokeo-navy' : 'text-tokeo-cream'}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <div className={`w-5 h-[1.5px] bg-current transition-all duration-300 ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <div className={`w-5 h-[1.5px] bg-current my-[5px] transition-all duration-300 ${open ? 'opacity-0 scale-x-0' : ''}`} />
          <div className={`w-5 h-[1.5px] bg-current transition-all duration-300 ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className={`md:hidden mt-2 max-w-6xl mx-auto border rounded-2xl px-6 py-5 flex flex-col shadow-xl ${
          scrolled
            ? 'bg-white border-black/8'
            : 'bg-tokeo-navy/95 backdrop-blur-xl border-white/10 shadow-black/40'
        }`}>
          {links.map(({ label, href }) => (
            <SiteLink
              key={label}
              href={href}
              className={`min-h-[44px] flex items-center text-sm tracking-wide transition-colors ${
                scrolled ? 'text-tokeo-navy/70 hover:text-tokeo-navy' : 'text-tokeo-cream/70 hover:text-tokeo-cream'
              }`}
              onClick={() => setOpen(false)}
            >
              {label}
            </SiteLink>
          ))}
          <div className={`pt-3 mt-1 border-t flex flex-col gap-1 ${scrolled ? 'border-black/10' : 'border-white/10'}`}>
            {user ? (
              <div className="flex items-center justify-between min-h-[44px]">
                <div className="min-w-0">
                  <p className={`text-sm font-medium truncate ${scrolled ? 'text-tokeo-navy' : 'text-tokeo-cream'}`}>{user.name}</p>
                  <p className={`text-xs truncate ${scrolled ? 'text-tokeo-navy/50' : 'text-tokeo-cream/50'}`}>{user.email}</p>
                </div>
                <button
                  onClick={() => { logout(); setOpen(false) }}
                  className={`flex items-center min-h-[44px] gap-1.5 text-sm shrink-0 ${scrolled ? 'text-tokeo-navy/70 hover:text-tokeo-navy' : 'text-tokeo-cream/70 hover:text-tokeo-cream'}`}
                >
                  <LogOut size={14} /> Log out
                </button>
              </div>
            ) : (
              <SiteLink
                href="/login"
                onClick={() => setOpen(false)}
                className={`flex items-center min-h-[44px] gap-1.5 text-sm tracking-wide text-left ${scrolled ? 'text-tokeo-navy/70 hover:text-tokeo-navy' : 'text-tokeo-cream/70 hover:text-tokeo-cream'}`}
              >
                <UserIcon size={15} /> Log In
              </SiteLink>
            )}
            <div className="mt-2">
               <Button size="sm" href="/contact">Join Waitlist</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}