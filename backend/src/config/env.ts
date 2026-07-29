import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  JWT_SECRET: z.string().min(16, 'JWT_SECRET must be at least 16 characters'),
  JWT_EXPIRES_IN: z.string().default('7d'),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
  FLUTTERWAVE_PUBLIC_KEY: z.string().min(1, 'FLUTTERWAVE_PUBLIC_KEY is required'),
  FLUTTERWAVE_SECRET_KEY: z.string().min(1, 'FLUTTERWAVE_SECRET_KEY is required'),
  FLUTTERWAVE_ENCRYPTION_KEY: z.string().min(1, 'FLUTTERWAVE_ENCRYPTION_KEY is required'),
  FLUTTERWAVE_SECRET_HASH: z.string().min(1, 'FLUTTERWAVE_SECRET_HASH is required'),
  PROGRAM_PRICE_RWF: z.coerce.number().positive('PROGRAM_PRICE_RWF must be a positive number'),
  FRONTEND_URL: z.string().min(1, 'FRONTEND_URL is required'),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  console.error('Invalid environment variables:', parsed.error.flatten().fieldErrors)
  throw new Error('Invalid environment variables')
}

export const env = parsed.data
