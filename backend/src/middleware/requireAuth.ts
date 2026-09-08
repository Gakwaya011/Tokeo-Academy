import type { NextFunction, Request, Response } from 'express'
import { verifyAccessToken } from '../utils/jwt'
import { AppError } from '../utils/AppError'
import { SESSION_COOKIE_NAME } from '../utils/cookies'

declare global {
  namespace Express {
    interface Request {
      auth?: { userId: string; role: 'USER' | 'ADMIN' }
    }
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  // httpOnly cookie is the primary transport; a Bearer header still works
  // too (kept for API clients other than the browser SPA).
  const header = req.headers.authorization
  const headerToken = header?.startsWith('Bearer ') ? header.slice(7) : undefined
  const token = req.cookies?.[SESSION_COOKIE_NAME] ?? headerToken

  if (!token) {
    return next(new AppError('Authentication required', 401))
  }

  try {
    const payload = verifyAccessToken(token)
    req.auth = { userId: payload.sub, role: payload.role }
    next()
  } catch {
    next(new AppError('Invalid or expired session', 401))
  }
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.auth?.role !== 'ADMIN') {
    return next(new AppError('Admin access required', 403))
  }
  next()
}
