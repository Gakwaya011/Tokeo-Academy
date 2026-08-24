import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { requireAuth } from '../../middleware/requireAuth'
import { loginHandler, meHandler, signupHandler } from './auth.controller'

export const authRouter = Router()

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { status: 'error', message: 'Too many attempts, please try again in 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
})

authRouter.post('/signup', authLimiter, signupHandler)
authRouter.post('/login', authLimiter, loginHandler)
authRouter.get('/me', requireAuth, meHandler)
