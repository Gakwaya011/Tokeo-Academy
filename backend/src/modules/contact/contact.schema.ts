import { z } from 'zod'

export const createSubmissionSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  email: z.string().trim().toLowerCase().email('Enter a valid email address'),
  phone: z.string().trim().default(''),
  // The homepage's quick contact form doesn't collect these pill-selector
  // fields (only the full /contact page does), so default them.
  userType: z.string().trim().default('unspecified'),
  interestType: z.string().trim().default('general'),
  message: z.string().trim().min(1).optional(),
})

export type CreateSubmissionInput = z.infer<typeof createSubmissionSchema>
