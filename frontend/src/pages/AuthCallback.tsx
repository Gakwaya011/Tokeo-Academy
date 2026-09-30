import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// SessionBoundary has already checked the cookie set by Google's callback.
export default function AuthCallback() {
  const { user } = useAuth()
  return <Navigate to={user ? '/' : '/login?error=google'} replace />
}
