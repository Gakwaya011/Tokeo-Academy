import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { apiRequest } from '../lib/api'

interface User {
  id: string
  name: string
  email: string
  role: 'USER' | 'ADMIN'
  hasAccess: boolean
}

interface AuthContextValue {
  user: User | null
  loading: boolean
  login: (email: string, password: string, remember: boolean) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  requestPasswordReset: (email: string) => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // The session lives in an httpOnly cookie, invisible to JS, so the only
    // way to know if one exists is to ask the API. A 401 here just means
    // "not logged in" — not an error worth surfacing.
    apiRequest<{ user: User }>('/api/auth/me')
      .then(({ user }) => setUser(user))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const login = async (email: string, password: string, remember: boolean) => {
    const { user } = await apiRequest<{ user: User }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, remember }),
    })
    setUser(user)
  }

  const signup = async (name: string, email: string, password: string) => {
    const { user } = await apiRequest<{ user: User }>('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    })
    setUser(user)
  }

  const logout = () => {
    setUser(null)
    // Best-effort — the local state is already cleared, so the UI updates
    // instantly regardless of whether this request succeeds.
    apiRequest('/api/auth/logout', { method: 'POST' }).catch(() => {})
  }

  const requestPasswordReset = async (email: string) => {
    // No backend endpoint for this yet — simulated until real email delivery is wired up.
    await new Promise((resolve) => setTimeout(resolve, 600))
    void email
  }

  const refreshUser = async () => {
    const { user } = await apiRequest<{ user: User }>('/api/auth/me')
    setUser(user)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, requestPasswordReset, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
