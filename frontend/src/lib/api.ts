// Trailing slash stripped defensively — an env var set with one (e.g. ".../onrender.com/")
// would otherwise double up with the leading slash on each path and 404 on every request.
// Callers already include /api; production browsers use the current origin.
// Server-side fetches retain the absolute base URL they require.
export const API_URL = import.meta.env.PROD && !import.meta.env.SSR
  ? ''
  : (import.meta.env.VITE_API_URL || 'http://localhost:4000').replace(/\/+$/, '')

const GENERIC_ERROR = 'Something went wrong. Please try again.'

// A handful of backend error messages are safe and useful to show as-is
// (e.g. "Incorrect email or password."). Anything else — network failures,
// routing/500s, unexpected shapes — should never surface raw to the user;
// the real detail still goes to the console for us to debug.
export async function apiRequest<T>(path: string, options: RequestInit = {}, expectedStatus?: number): Promise<T> {
  let res: Response
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...options,
      // Session lives in an httpOnly cookie set by the API — this is what
      // makes the browser actually send/accept it (needed cross-origin,
      // harmless same-origin).
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
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

  if (expectedStatus !== undefined && res.status !== expectedStatus) {
    throw new Error(GENERIC_ERROR)
  }

  return data as T
}

// For multipart/form-data uploads (e.g. admin forms with an image file) —
// Content-Type is intentionally left unset so the browser adds the boundary.
export async function apiUpload<T>(path: string, formData: FormData, options: RequestInit = {}): Promise<T> {
  let res: Response
  try {
    res = await fetch(`${API_URL}${path}`, {
      method: 'POST',
      ...options,
      credentials: 'include',
      headers: {
        ...options.headers,
      },
      body: formData,
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
