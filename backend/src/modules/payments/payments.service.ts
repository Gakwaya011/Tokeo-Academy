import { randomUUID } from 'node:crypto'
import { prisma } from '../../db/prisma'
import { AppError } from '../../utils/AppError'
import { env } from '../../config/env'

const FLW_BASE_URL = 'https://api.flutterwave.com/v3'
const CURRENCY = 'RWF'

type FlutterwaveVerifyData = {
  id: number
  tx_ref: string
  status: string
  amount: number
  currency: string
}

export function getProgramPrice() {
  return { amount: env.PROGRAM_PRICE_RWF, currency: CURRENCY }
}

async function verifyWithFlutterwave(transactionId: string): Promise<FlutterwaveVerifyData> {
  const response = await fetch(`${FLW_BASE_URL}/transactions/${transactionId}/verify`, {
    headers: { Authorization: `Bearer ${env.FLUTTERWAVE_SECRET_KEY}` },
  })
  const body = (await response.json().catch(() => ({}))) as { status?: string; data?: FlutterwaveVerifyData }

  if (!response.ok || body.status !== 'success' || !body.data) {
    console.error('Flutterwave verify failed:', body)
    throw new AppError('Unable to verify payment. Please contact support.', 502)
  }

  return body.data
}

export async function initializePayment(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) {
    throw new AppError('User not found', 404)
  }

  const { amount, currency } = getProgramPrice()
  const txRef = `tokeo-${randomUUID()}`

  await prisma.payment.create({
    data: { userId, txRef, amount, currency, status: 'PENDING' },
  })

  const response = await fetch(`${FLW_BASE_URL}/payments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.FLUTTERWAVE_SECRET_KEY}`,
    },
    body: JSON.stringify({
      tx_ref: txRef,
      amount,
      currency,
      redirect_url: `${env.FRONTEND_URL}/payment/verify`,
      payment_options: 'card, mobilemoneyrwanda',
      customer: { email: user.email, name: user.name },
      customizations: { title: 'Tokeo Academy', description: 'Full platform access' },
    }),
  })

  const body = (await response.json().catch(() => ({}))) as { status?: string; data?: { link?: string } }

  if (!response.ok || body.status !== 'success' || !body.data?.link) {
    console.error('Flutterwave initialize failed:', body)
    throw new AppError('Unable to start payment. Please try again.', 502)
  }

  return { link: body.data.link }
}

// Called from both the /payment/verify redirect and the webhook — whichever
// arrives first does the write, the other finds status already SUCCESSFUL
// and no-ops. Keyed on tx_ref (ours), cross-checked against Flutterwave's
// own record for that transaction_id so a caller can't point us at a
// transaction that isn't the one it claims to be.
export async function confirmTransaction(
  transactionId: string,
  expectedTxRef: string,
  ownerUserId?: string,
) {
  const payment = await prisma.payment.findUnique({ where: { txRef: expectedTxRef } })
  if (!payment) {
    throw new AppError('Payment not found', 404)
  }

  // For the user-facing /verify path: refuse before any external call or DB
  // write if the caller doesn't own this payment. The webhook path trusts the
  // signature instead and passes no ownerUserId.
  if (ownerUserId && payment.userId !== ownerUserId) {
    throw new AppError('This payment does not belong to your account', 403)
  }

  if (payment.status === 'SUCCESSFUL') {
    return { payment, alreadyProcessed: true }
  }

  const data = await verifyWithFlutterwave(transactionId)

  if (data.tx_ref !== expectedTxRef) {
    throw new AppError('Transaction reference mismatch', 400)
  }

  const isValid = data.status === 'successful' && data.currency === payment.currency && data.amount >= payment.amount

  if (!isValid) {
    await prisma.payment.update({ where: { id: payment.id }, data: { status: 'FAILED' } })
    throw new AppError('Payment could not be verified as successful.', 400)
  }

  const [updatedPayment] = await prisma.$transaction([
    prisma.payment.update({
      where: { id: payment.id },
      data: { status: 'SUCCESSFUL', flwTransactionId: String(data.id) },
    }),
    prisma.enrollment.upsert({
      where: { userId: payment.userId },
      update: { status: 'ACTIVE', paidAt: new Date() },
      create: { userId: payment.userId, status: 'ACTIVE', paidAt: new Date() },
    }),
  ])

  return { payment: updatedPayment, alreadyProcessed: false }
}
