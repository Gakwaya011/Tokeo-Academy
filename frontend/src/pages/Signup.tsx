import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import AuthLayout from '../components/auth/AuthLayout'
import GoogleButton from '../components/auth/GoogleButton'
import { useAuth } from '../context/AuthContext'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Signup() {
  const { signup } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleNote, setGoogleNote] = useState(false)

  function validate(): boolean {
    const next: Record<string, string> = {}
    if (!name.trim()) next.name = 'Enter your full name.'
    if (!email.trim()) next.email = 'Enter your email.'
    else if (!EMAIL_RE.test(email)) next.email = 'Enter a valid email address.'
    if (!password) next.password = 'Enter a password.'
    else if (password.length < 8) next.password = 'Password must be at least 8 characters.'
    if (confirmPassword !== password) next.confirmPassword = 'Passwords do not match.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setFormError('')
    if (!validate()) return
    setLoading(true)
    try {
      await signup(name.trim(), email, password)
      navigate('/')
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Hello, friend!"
      subtitle="Join a cohort built on discipline over motivation."
      ctaText="Already have an account?"
      ctaLabel="Sign in"
      ctaTo="/login"
    >
      <h1 className="text-3xl font-bold text-tokeo-navy tracking-tight text-center">Create your account</h1>
      <p className="text-tokeo-navy/50 mt-2 mb-8 text-center">Start your accountability journey.</p>

      <GoogleButton onClick={() => setGoogleNote(true)} />
      {googleNote && (
        <p className="text-xs text-tokeo-navy/40 mt-2">Google sign-in is coming soon — use email for now.</p>
      )}

      <div className="flex items-center gap-3 my-6">
        <div className="h-px flex-1 bg-tokeo-navy/10" />
        <span className="text-xs text-tokeo-navy/40">or</span>
        <div className="h-px flex-1 bg-tokeo-navy/10" />
      </div>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        {formError && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{formError}</div>
        )}

        <div className="flex flex-col gap-1">
          <label htmlFor="signup-name" className="text-xs font-medium text-tokeo-navy/60">Full name</label>
          <input
            id="signup-name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`px-3 py-2.5 rounded-lg border bg-white text-sm text-tokeo-navy outline-none focus:border-tokeo-gold ${errors.name ? 'border-red-400' : 'border-tokeo-navy/15'}`}
          />
          {errors.name && <span className="text-xs text-red-600">{errors.name}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="signup-email" className="text-xs font-medium text-tokeo-navy/60">Email</label>
          <input
            id="signup-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`px-3 py-2.5 rounded-lg border bg-white text-sm text-tokeo-navy outline-none focus:border-tokeo-gold ${errors.email ? 'border-red-400' : 'border-tokeo-navy/15'}`}
          />
          {errors.email && <span className="text-xs text-red-600">{errors.email}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="signup-password" className="text-xs font-medium text-tokeo-navy/60">Password</label>
          <div className="relative">
            <input
              id="signup-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-3 py-2.5 pr-10 rounded-lg border bg-white text-sm text-tokeo-navy outline-none focus:border-tokeo-gold ${errors.password ? 'border-red-400' : 'border-tokeo-navy/15'}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-tokeo-navy/40 hover:text-tokeo-navy"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && <span className="text-xs text-red-600">{errors.password}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="signup-confirm" className="text-xs font-medium text-tokeo-navy/60">Confirm password</label>
          <input
            id="signup-confirm"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`px-3 py-2.5 rounded-lg border bg-white text-sm text-tokeo-navy outline-none focus:border-tokeo-gold ${errors.confirmPassword ? 'border-red-400' : 'border-tokeo-navy/15'}`}
          />
          {errors.confirmPassword && <span className="text-xs text-red-600">{errors.confirmPassword}</span>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-1 inline-flex items-center justify-center gap-2 bg-tokeo-gold text-tokeo-navy font-semibold text-sm rounded-lg px-4 py-3 hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {loading && <Loader2 size={16} className="animate-spin" />}
          Create account
        </button>
      </form>

      <p className="text-center text-sm text-tokeo-navy/50 mt-8">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-tokeo-navy underline underline-offset-2">Log in</Link>
      </p>
    </AuthLayout>
  )
}
