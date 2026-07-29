import { z } from 'zod'

export const verifyPaymentSchema = z.object({
  tx_ref: z.string().trim().min(1, 'tx_ref is required'),
  transaction_id: z.string().trim().min(1, 'transaction_id is required'),
})

export const webhookSchema = z.object({
  event: z.string(),
  data: z.object({
    id: z.union([z.number(), z.string()]),
    tx_ref: z.string(),
    status: z.string(),
  }),
})

export type VerifyPaymentInput = z.infer<typeof verifyPaymentSchema>
export type WebhookInput = z.infer<typeof webhookSchema>
