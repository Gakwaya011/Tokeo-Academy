import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, Loader2 } from 'lucide-react'
import AuthLayout from '../components/auth/AuthLayout'
import { useAuth } from '../context/AuthContext'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ForgotPassword() {
  const { requestPasswordReset } = useAuth()

  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    if (!EMAIL_RE.test(email)) {
      setError('Enter a valid email address.')
      return
    }
    setLoading(true)
    try {
      await requestPasswordReset(email)
      setSent(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Forgot something?"
      subtitle="No worries — we'll help you get back on track."
      ctaText="Remembered your password?"
      ctaLabel="Back to log in"
      ctaTo="/login"
    >
      {sent ? (
        <div className="flex flex-col gap-4 items-center text-center">
          <CheckCircle2 className="text-tokeo-gold" size={32} />
          <h1 className="text-2xl font-bold text-tokeo-navy tracking-tight">Check your email</h1>
          <p className="text-tokeo-navy/50">
            If an account exists for <span className="font-medium text-tokeo-navy">{email}</span>, we've sent instructions to reset the password.
          </p>
          <Link to="/login" className="text-sm font-medium text-tokeo-navy underline underline-offset-2 mt-2">
            Back to log in
          </Link>
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-tokeo-navy tracking-tight text-center">Reset your password</h1>
          <p className="text-tokeo-navy/50 mt-2 mb-8 text-center">Enter your email and we'll send you reset instructions.</p>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>
            )}
            <div className="flex flex-col gap-1">
              <label htmlFor="reset-email" className="text-xs font-medium text-tokeo-navy/60">Email</label>
              <input
                id="reset-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`px-3 py-2.5 rounded-lg border bg-white text-sm text-tokeo-navy outline-none focus:border-tokeo-gold ${error ? 'border-red-400' : 'border-tokeo-navy/15'}`}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-1 inline-flex items-center justify-center gap-2 bg-tokeo-gold text-tokeo-navy font-semibold text-sm rounded-lg px-4 py-3 hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              Send reset link
            </button>
          </form>

          <p className="text-center text-sm text-tokeo-navy/50 mt-8">
            <Link to="/login" className="font-medium text-tokeo-navy underline underline-offset-2">Back to log in</Link>
          </p>
        </>
      )}
    </AuthLayout>
  )
}
