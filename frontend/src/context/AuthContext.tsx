import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

interface User {
  name: string
  email: string
}

interface StoredAccount extends User {
  password: string
}

interface AuthContextValue {
  user: User | null
  login: (email: string, password: string, remember: boolean) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  requestPasswordReset: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const ACCOUNTS_KEY = 'tokeo_accounts'
const SESSION_KEY = 'tokeo_session'

function readAccounts(): StoredAccount[] {
  try {
    return JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || '[]')
  } catch {
    return []
  }
}

function writeAccounts(accounts: StoredAccount[]) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts))
}

// Simulated network latency so the UI has something real to show loading/error states for.
function delay(ms = 600) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY)
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch {
        // ignore corrupt session
      }
    }
  }, [])

  const login = async (email: string, password: string, remember: boolean) => {
    await delay()
    const account = readAccounts().find((a) => a.email.toLowerCase() === email.toLowerCase())
    if (!account || account.password !== password) {
      throw new Error('Incorrect email or password.')
    }
    const sessionUser: User = { name: account.name, email: account.email }
    setUser(sessionUser)
    const store = remember ? localStorage : sessionStorage
    store.setItem(SESSION_KEY, JSON.stringify(sessionUser))
  }

  const signup = async (name: string, email: string, password: string) => {
    await delay()
    const accounts = readAccounts()
    if (accounts.some((a) => a.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('An account with this email already exists.')
    }
    const account: StoredAccount = { name, email, password }
    writeAccounts([...accounts, account])
    const sessionUser: User = { name, email }
    setUser(sessionUser)
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(SESSION_KEY)
    sessionStorage.removeItem(SESSION_KEY)
  }

  const requestPasswordReset = async (email: string) => {
    await delay()
    // No email service is wired up yet — this only simulates the request.
    void email
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, requestPasswordReset }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
