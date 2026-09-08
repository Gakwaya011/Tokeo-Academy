import type { Request, Response } from 'express'
import { env } from '../../config/env'
import { asyncHandler } from '../../utils/asyncHandler'
import { AppError } from '../../utils/AppError'
import { clearSessionCookie, setSessionCookie } from '../../utils/cookies'
import { signAccessToken } from '../../utils/jwt'
import { loginSchema, signupSchema } from './auth.schema'
import * as authService from './auth.service'

export const signupHandler = asyncHandler(async (req: Request, res: Response) => {
  const input = signupSchema.parse(req.body)
  const { user, token } = await authService.signup(input)
  setSessionCookie(res, token, true)
  res.status(201).json({ user })
})

export const loginHandler = asyncHandler(async (req: Request, res: Response) => {
  const input = loginSchema.parse(req.body)
  const { user, token } = await authService.login(input)
  setSessionCookie(res, token, input.remember)
  res.status(200).json({ user })
})

export const logoutHandler = asyncHandler(async (req: Request, res: Response) => {
  clearSessionCookie(res)
  res.status(204).send()
})

// Reached only after passport's Google strategy has populated req.user with
// a { id, role } from findOrCreateGoogleUser. We mint our own session the
// same way login/signup do — httpOnly cookie, nothing in the redirect URL —
// then bounce to the SPA, which reads the session via /api/auth/me.
export const googleCallbackHandler = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user as { id: string; role: 'USER' | 'ADMIN' } | undefined
  if (!user) throw new AppError('Google authentication failed', 401)

  const token = signAccessToken({ sub: user.id, role: user.role })
  setSessionCookie(res, token, true)
  res.redirect(`${env.FRONTEND_URL}/auth/callback`)
})

export const meHandler = asyncHandler(async (req: Request, res: Response) => {
  if (!req.auth) throw new AppError('Authentication required', 401)
  const user = await authService.getUserById(req.auth.userId)
  res.status(200).json({ user })
})
