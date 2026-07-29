import type { Request, Response } from 'express'
import { timingSafeEqual } from 'node:crypto'
import { asyncHandler } from '../../utils/asyncHandler'
import { AppError } from '../../utils/AppError'
import { env } from '../../config/env'
import { verifyPaymentSchema, webhookSchema } from './payments.schema'
import * as paymentsService from './payments.service'

function isValidWebhookSignature(header: unknown) {
  if (typeof header !== 'string' || !header) return false
  const expected = Buffer.from(env.FLUTTERWAVE_SECRET_HASH)
  const received = Buffer.from(header)
  if (expected.length !== received.length) return false
  return timingSafeEqual(expected, received)
}

export const getPriceHandler = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json(paymentsService.getProgramPrice())
})

export const initializePaymentHandler = asyncHandler(async (req: Request, res: Response) => {
  if (!req.auth) throw new AppError('Authentication required', 401)
  const { link } = await paymentsService.initializePayment(req.auth.userId)
  res.status(200).json({ link })
})

export const verifyPaymentHandler = asyncHandler(async (req: Request, res: Response) => {
  if (!req.auth) throw new AppError('Authentication required', 401)
  const input = verifyPaymentSchema.parse(req.body)
  const result = await paymentsService.confirmTransaction(input.transaction_id, input.tx_ref)

  if (result.payment.userId !== req.auth.userId) {
    throw new AppError('This payment does not belong to your account', 403)
  }

  res.status(200).json({ status: result.payment.status })
})

export const webhookHandler = asyncHandler(async (req: Request, res: Response) => {
  if (!isValidWebhookSignature(req.headers['verif-hash'])) {
    throw new AppError('Invalid webhook signature', 401)
  }

  const input = webhookSchema.parse(req.body)
  if (input.event === 'charge.completed') {
    await paymentsService.confirmTransaction(String(input.data.id), input.data.tx_ref)
  }

  res.status(200).json({ received: true })
})
