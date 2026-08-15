import cors from 'cors'
import express from 'express'
import { env } from './config/env'
import { errorHandler, notFoundHandler } from './middleware/errorHandler'
import { authRouter } from './modules/auth/auth.routes'
import { contactRouter } from './modules/contact/contact.routes'
import { paymentsRouter } from './modules/payments/payments.routes'

export const app = express()

const allowedOrigins = env.CORS_ORIGIN.split(',').map(s => s.trim())
app.use(cors({ origin: allowedOrigins }))
app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/auth', authRouter)
app.use('/api/contact', contactRouter)
app.use('/api/payments', paymentsRouter)

app.use(notFoundHandler)
app.use(errorHandler)
