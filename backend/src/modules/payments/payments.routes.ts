import { Router } from 'express'
import { requireAuth } from '../../middleware/requireAuth'
import { paymentLimiter } from '../../middleware/rateLimit'
import {
  getPriceHandler,
  initializePaymentHandler,
  verifyPaymentHandler,
  webhookHandler,
} from './payments.controller'

export const paymentsRouter = Router()

paymentsRouter.get('/price', getPriceHandler)
paymentsRouter.post('/initialize', paymentLimiter, requireAuth, initializePaymentHandler)
paymentsRouter.post('/verify', paymentLimiter, requireAuth, verifyPaymentHandler)
paymentsRouter.post('/webhook', paymentLimiter, webhookHandler)
