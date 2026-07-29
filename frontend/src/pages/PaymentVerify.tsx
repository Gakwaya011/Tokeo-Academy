import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Loader2, CircleAlert } from 'lucide-react'
import { apiRequest } from '../lib/api'
import { useAuth } from '../context/AuthContext'

export default function PaymentVerify() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { refreshUser } = useAuth()
  const [error, setError] = useState('')
  const ran = useRef(false)

  useEffect(() => {
    if (ran.current) return
    ran.current = true

    const status = searchParams.get('status')
    const txRef = searchParams.get('tx_ref')
    const transactionId = searchParams.get('transaction_id')

    if (status !== 'successful' || !txRef || !transactionId) {
      setError('Payment was not completed. If you were charged, contact support and we will sort it out.')
      return
    }

    apiRequest('/api/payments/verify', {
      method: 'POST',
      body: JSON.stringify({ tx_ref: txRef, transaction_id: transactionId }),
    })
      .then(() => refreshUser())
      .then(() => navigate('/dashboard', { replace: true }))
      .catch((err) => setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.'))
  }, [searchParams, navigate, refreshUser])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-tokeo-offwhite px-6">
        <div className="max-w-md w-full flex flex-col items-center gap-4 text-center">
          <CircleAlert size={32} className="text-red-500" />
          <h1 className="text-2xl font-bold text-tokeo-navy tracking-tight">Payment verification failed</h1>
          <p className="text-tokeo-navy/60">{error}</p>
          <a href="/programs" className="mt-2 text-sm font-semibold text-tokeo-navy underline underline-offset-2">
            Back to Programs
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-tokeo-offwhite px-6">
      <div className="flex flex-col items-center gap-4 text-center">
        <Loader2 size={32} className="animate-spin text-tokeo-navy" />
        <p className="text-tokeo-navy/70 font-medium">Verifying your payment...</p>
      </div>
    </div>
  )
}
