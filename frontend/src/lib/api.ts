// Trailing slash stripped defensively — an env var set with one (e.g. ".../onrender.com/")
// would otherwise double up with the leading slash on each path and 404 on every request.
export const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:4000').replace(/\/+$/, '')

const TOKEN_KEY = 'tokeo_token'

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY)
}

export function storeToken(token: string, remember: boolean) {
  const store = remember ? localStorage : sessionStorage
  store.setItem(TOKEN_KEY, token)
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
  sessionStorage.removeItem(TOKEN_KEY)
}

const GENERIC_ERROR = 'Something went wrong. Please try again.'

// A handful of backend error messages are safe and useful to show as-is
// (e.g. "Incorrect email or password."). Anything else — network failures,
// routing/500s, unexpected shapes — should never surface raw to the user;
// the real detail still goes to the console for us to debug.
export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken()

  let res: Response
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    })
  } catch (err) {
    console.error(`API request failed: ${path}`, err)
    throw new Error(GENERIC_ERROR)
  }

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    console.error(`API error (${res.status}) on ${path}:`, data)
    const message = res.status < 500 && typeof data.error === 'string' ? data.error : GENERIC_ERROR
    throw new Error(message)
  }

  return data as T
}
