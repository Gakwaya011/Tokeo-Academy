import { Router } from 'express'
import { requireAuth } from '../../middleware/requireAuth'
import { loginHandler, meHandler, signupHandler } from './auth.controller'

export const authRouter = Router()

authRouter.post('/signup', signupHandler)
authRouter.post('/login', loginHandler)
authRouter.get('/me', requireAuth, meHandler)
