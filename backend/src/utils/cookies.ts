import type { Response } from 'express'
import { env } from '../config/env'

export const SESSION_COOKIE_NAME = 'tokeo_session'

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000

const baseOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
}

// "Remember me" = a persistent cookie matching the JWT's own lifetime.
// Otherwise a session cookie — gone the moment the browser closes, even
// though the JWT itself would still be valid if it somehow survived.
export function setSessionCookie(res: Response, token: string, remember: boolean) {
  res.cookie(SESSION_COOKIE_NAME, token, {
    ...baseOptions,
    ...(remember ? { maxAge: SEVEN_DAYS_MS } : {}),
  })
}

export function clearSessionCookie(res: Response) {
  res.clearCookie(SESSION_COOKIE_NAME, baseOptions)
}
