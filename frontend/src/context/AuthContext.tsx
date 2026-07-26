import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { apiRequest, clearToken, getToken, storeToken } from '../lib/api'

interface User {
  id: string
  name: string
  email: string
  role: 'USER' | 'ADMIN'
}

interface AuthContextValue {
  user: User | null
  loading: boolean
  login: (email: string, password: string, remember: boolean) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  requestPasswordReset: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!getToken()) {
      setLoading(false)
      return
    }
    apiRequest<{ user: User }>('/api/auth/me')
      .then(({ user }) => setUser(user))
      .catch(() => clearToken())
      .finally(() => setLoading(false))
  }, [])

  const login = async (email: string, password: string, remember: boolean) => {
    const { user, token } = await apiRequest<{ user: User; token: string }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    storeToken(token, remember)
    setUser(user)
  }

  const signup = async (name: string, email: string, password: string) => {
    const { user, token } = await apiRequest<{ user: User; token: string }>('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    })
    storeToken(token, true)
    setUser(user)
  }

  const logout = () => {
    setUser(null)
    clearToken()
  }

  const requestPasswordReset = async (email: string) => {
    // No backend endpoint for this yet — simulated until real email delivery is wired up.
    await new Promise((resolve) => setTimeout(resolve, 600))
    void email
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, requestPasswordReset }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
