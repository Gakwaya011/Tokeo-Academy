import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Mail, Newspaper, Compass, ArrowLeft, LogOut } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import logoCream from '../../assets/logo-cream.png'

const navItems = [
  { label: 'Messages', href: '/admin/messages', icon: Mail },
  { label: 'Insights', href: '/admin/insights', icon: Newspaper },
  { label: 'Programs', href: '/admin/programs', icon: Compass },
]

function initials(name: string) {
  return name.trim().split(/\s+/).slice(0, 2).map((p) => p[0]?.toUpperCase()).join('')
}

export default function AdminLayout({ children, title }: { children: ReactNode; title: string }) {
  const { user, logout } = useAuth()
  const location = useLocation()

  return (
    <div className="min-h-screen flex bg-tokeo-offwhite">
      <aside className="w-60 shrink-0 bg-tokeo-navy flex flex-col p-5">
        <Link to="/" className="px-2 py-3 mb-6 w-fit">
          <img src={logoCream} alt="Tokeo Academy" className="h-6 w-auto object-contain" />
        </Link>

        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map(({ label, href, icon: Icon }) => {
            const active = location.pathname === href
            return (
              <Link
                key={href}
                to={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'bg-tokeo-gold/10 text-tokeo-gold'
                    : 'text-tokeo-cream/60 hover:text-tokeo-cream hover:bg-white/5'
                }`}
              >
                <Icon size={17} /> {label}
              </Link>
            )
          })}
        </nav>

        <div className="flex flex-col gap-1 pt-3 border-t border-white/10">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-tokeo-cream/50 hover:text-tokeo-cream hover:bg-white/5 transition-colors"
          >
            <ArrowLeft size={17} /> Back to site
          </Link>
          <button
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-tokeo-cream/50 hover:text-tokeo-cream hover:bg-white/5 transition-colors"
          >
            <LogOut size={17} /> Log out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 shrink-0 bg-white border-b border-tokeo-navy/10 flex items-center justify-between px-8">
          <h1 className="text-tokeo-navy font-bold text-lg tracking-tight">{title}</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-tokeo-navy/50 hidden sm:inline">{user?.email}</span>
            <span className="w-8 h-8 rounded-full bg-tokeo-navy text-tokeo-cream text-xs font-semibold flex items-center justify-center shrink-0">
              {user ? initials(user.name) : ''}
            </span>
          </div>
        </header>
        <main className="flex-1 min-h-0">{children}</main>
      </div>
    </div>
  )
}
