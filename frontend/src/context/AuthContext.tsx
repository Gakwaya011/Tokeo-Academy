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
  logout: () => Promise<boolean>
  requestPasswordReset: (email: string) => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Restore the session on every mount without blocking public pages.
    const controller = new AbortController()
    apiRequest<{ user: User }>('/api/auth/me', { signal: controller.signal })
      .then(({ user }) => {
        if (!controller.signal.aborted) setUser(user)
      })
      .catch(() => {})
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })
    return () => controller.abort()
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

  const logout = async () => {
    try {
      await apiRequest('/api/auth/logout', { method: 'POST' }, 204)
      setUser(null)
      return true
    } catch {
      window.alert('Unable to log out. You are still signed in. Please try again.')
      return false
    }
  }

  const requestPasswordReset = async (email: string) => {
    await apiRequest('/api/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }, 200)
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
