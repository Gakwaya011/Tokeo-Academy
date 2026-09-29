import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { env } from './config/env'
import { passport } from './config/passport'
import { errorHandler, notFoundHandler } from './middleware/errorHandler'
import { globalLimiter } from './middleware/rateLimit'
import { authRouter } from './modules/auth/auth.routes'
import { contactRouter } from './modules/contact/contact.routes'
import { insightsRouter } from './modules/insights/insights.routes'
// import { paymentsRouter } from './modules/payments/payments.routes'
import { programsRouter } from './modules/programs/programs.routes'

export const app = express()

// Behind nginx on the VPS — trust exactly one proxy hop so req.ip and the
// rate limiters see the real client address, not the proxy's.
app.set('trust proxy', 1)

app.use(helmet())

// credentials: true + an explicit origin allowlist (never '*') is required
// for the browser to actually send/accept the httpOnly session cookie
// cross-origin (frontend and API run as separate services).
const allowedOrigins = env.CORS_ORIGIN.split(',').map(s => s.trim())
app.use(cors({ origin: allowedOrigins, credentials: true }))
app.use(express.json({ limit: '32kb' }))
app.use(cookieParser())

// Stateless use only — no passport.session(). The Google strategy resolves
// a user, the callback handler mints our own JWT cookie.
app.use(passport.initialize())

app.use(globalLimiter)

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/auth', authRouter)
app.use('/api/contact', contactRouter)
// app.use('/api/payments', paymentsRouter)
app.use('/api/programs', programsRouter)
app.use('/api/insights', insightsRouter)

app.use(notFoundHandler)
app.use(errorHandler)
