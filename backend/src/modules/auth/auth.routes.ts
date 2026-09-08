import { Router } from 'express'
import { passport } from '../../config/passport'
import { env } from '../../config/env'
import { requireAuth } from '../../middleware/requireAuth'
import { loginEmailLimiter, loginIpLimiter, signupLimiter } from '../../middleware/rateLimit'
import { googleCallbackHandler, loginHandler, logoutHandler, meHandler, signupHandler } from './auth.controller'

export const authRouter = Router()

authRouter.post('/signup', signupLimiter, signupHandler)
authRouter.post('/login', loginIpLimiter, loginEmailLimiter, loginHandler)
authRouter.post('/logout', logoutHandler)
authRouter.get('/me', requireAuth, meHandler)

authRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'], session: false }),
)
authRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: `${env.FRONTEND_URL}/login?error=google`,
  }),
  googleCallbackHandler,
)
