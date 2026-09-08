import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

// Landing point after the backend's Google callback set the httpOnly
// session cookie and redirected here. There is no token in the URL — we
// just confirm the session via /api/auth/me, then drop the user on the
// home page (same as email/password login). This is the public marketing
// site — signing in here does not imply paid access; the gated student
// app is a separate phase-2 domain.
export default function AuthCallback() {
  const { refreshUser } = useAuth()
  const navigate = useNavigate()
  const ran = useRef(false)

  useEffect(() => {
    if (ran.current) return
    ran.current = true
    refreshUser()
      .then(() => navigate('/', { replace: true }))
      .catch(() => navigate('/login?error=google', { replace: true }))
  }, [refreshUser, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-tokeo-offwhite">
      <Loader2 className="animate-spin text-tokeo-navy/40" size={28} />
    </div>
  )
}
