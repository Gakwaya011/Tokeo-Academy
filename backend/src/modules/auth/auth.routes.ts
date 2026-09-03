import { Router } from 'express'
import { requireAuth } from '../../middleware/requireAuth'
import { loginEmailLimiter, loginIpLimiter, signupLimiter } from '../../middleware/rateLimit'
import { loginHandler, meHandler, signupHandler } from './auth.controller'

export const authRouter = Router()

authRouter.post('/signup', signupLimiter, signupHandler)
authRouter.post('/login', loginIpLimiter, loginEmailLimiter, loginHandler)
authRouter.get('/me', requireAuth, meHandler)
