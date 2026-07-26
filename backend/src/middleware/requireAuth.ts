import type { NextFunction, Request, Response } from 'express'
import { verifyAccessToken } from '../utils/jwt'
import { AppError } from '../utils/AppError'

declare global {
  namespace Express {
    interface Request {
      auth?: { userId: string; role: 'USER' | 'ADMIN' }
    }
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization
  const token = header?.startsWith('Bearer ') ? header.slice(7) : undefined

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
