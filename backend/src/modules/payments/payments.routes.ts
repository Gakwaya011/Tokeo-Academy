import { Router } from 'express'
import { requireAuth } from '../../middleware/requireAuth'
import {
  getPriceHandler,
  initializePaymentHandler,
  verifyPaymentHandler,
  webhookHandler,
} from './payments.controller'

export const paymentsRouter = Router()

paymentsRouter.get('/price', getPriceHandler)
paymentsRouter.post('/initialize', requireAuth, initializePaymentHandler)
paymentsRouter.post('/verify', requireAuth, verifyPaymentHandler)
paymentsRouter.post('/webhook', webhookHandler)
