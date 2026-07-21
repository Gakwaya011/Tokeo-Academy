import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import logoGold from '../../assets/logo-gold.png'
import logoCream from '../../assets/logo-cream.png'

type AuthLayoutProps = {
  children: ReactNode
  title?: string
  subtitle?: string
  ctaText?: string
  ctaLabel?: string
  ctaTo?: string
}

export default function AuthLayout({
  children,
  title = 'Welcome back!',
  subtitle = 'Stay accountable, stay on track — log back in to continue your journey.',
  ctaText = 'New to Tokeo Academy?',
  ctaLabel = 'Sign up',
  ctaTo = '/signup',
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-tokeo-offwhite px-4 py-10 relative overflow-hidden">
      <div className="absolute -top-32 -left-20 w-72 h-72 rounded-full bg-tokeo-gold/10 blur-3xl" />
      <div className="absolute -bottom-24 -right-16 w-80 h-80 rounded-full bg-tokeo-navy/10 blur-3xl" />

      <div className="relative w-full max-w-4xl grid lg:grid-cols-2 bg-white rounded-3xl shadow-2xl shadow-tokeo-navy/10 overflow-hidden">
        {/* Decorative side */}
        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-tokeo-navy to-[#1b1d45] relative p-10 overflow-hidden">
          <div className="absolute -top-16 -right-10 w-52 h-52 rounded-full bg-tokeo-gold/20 blur-3xl" />
          <div className="absolute -bottom-16 -left-10 w-48 h-48 rounded-full bg-tokeo-gold/10 blur-3xl" />

          <a href="/" className="relative z-10 inline-flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2 w-fit">
            <img src={logoCream} alt="Tokeo Academy" className="h-5 w-auto object-contain" />
          </a>

          <div className="relative z-10 flex flex-col gap-3 max-w-xs">
            <h2 className="text-2xl font-bold text-tokeo-cream tracking-tight">{title}</h2>
            <p className="text-tokeo-cream/60 text-sm leading-relaxed">{subtitle}</p>
          </div>

          <div className="relative z-10 flex flex-col gap-2">
            <span className="text-xs text-tokeo-cream/40">{ctaText}</span>
            <Link
              to={ctaTo}
              className="inline-flex items-center justify-center border border-tokeo-cream/30 text-tokeo-cream text-sm font-medium rounded-full px-6 py-2 w-fit hover:bg-white/10 transition-colors"
            >
              {ctaLabel}
            </Link>
          </div>
        </div>

        {/* Form side */}
        <div className="flex flex-col justify-center px-6 sm:px-10 py-10 sm:py-14">
          <div className="w-full max-w-sm mx-auto">
            <a href="/" className="lg:hidden inline-block mb-8">
              <img src={logoGold} alt="Tokeo Academy" className="h-7 w-auto" />
            </a>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
