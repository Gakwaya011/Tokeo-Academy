import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import AuthLayout from '../components/auth/AuthLayout'
import GoogleButton from '../components/auth/GoogleButton'
import { useAuth } from '../context/AuthContext'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleNote, setGoogleNote] = useState(false)

  function validate(): boolean {
    const next: Record<string, string> = {}
    if (!email.trim()) next.email = 'Enter your email.'
    else if (!EMAIL_RE.test(email)) next.email = 'Enter a valid email address.'
    if (!password) next.password = 'Enter your password.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setFormError('')
    if (!validate()) return
    setLoading(true)
    try {
      await login(email, password, remember)
      navigate('/')
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <h1 className="text-3xl font-bold text-tokeo-navy tracking-tight text-center">Welcome back</h1>
      <p className="text-tokeo-navy/50 mt-2 mb-8 text-center">Log in to continue your journey.</p>

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
          <label htmlFor="login-email" className="text-xs font-medium text-tokeo-navy/60">Email</label>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`px-3 py-2.5 rounded-lg border bg-white text-sm text-tokeo-navy outline-none focus:border-tokeo-gold ${errors.email ? 'border-red-400' : 'border-tokeo-navy/15'}`}
          />
          {errors.email && <span className="text-xs text-red-600">{errors.email}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <label htmlFor="login-password" className="text-xs font-medium text-tokeo-navy/60">Password</label>
            <Link to="/forgot-password" className="text-xs text-tokeo-navy/50 hover:text-tokeo-navy underline underline-offset-2">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
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

        <label className="flex items-center gap-2 text-xs text-tokeo-navy/60 select-none">
          <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="accent-tokeo-gold" />
          Keep me logged in
        </label>

        <button
          type="submit"
          disabled={loading}
          className="mt-1 inline-flex items-center justify-center gap-2 bg-tokeo-gold text-tokeo-navy font-semibold text-sm rounded-lg px-4 py-3 hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {loading && <Loader2 size={16} className="animate-spin" />}
          Sign in
        </button>
      </form>

      <p className="text-center text-sm text-tokeo-navy/50 mt-8">
        Don't have an account?{' '}
        <Link to="/signup" className="font-medium text-tokeo-navy underline underline-offset-2">Sign up</Link>
      </p>
    </AuthLayout>
  )
}
