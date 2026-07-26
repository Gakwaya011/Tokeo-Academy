import { z } from 'zod'

export const createSubmissionSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  email: z.string().trim().toLowerCase().email('Enter a valid email address'),
  phone: z.string().trim().min(1, 'Phone is required'),
  userType: z.string().trim().min(1, 'userType is required'),
  interestType: z.string().trim().min(1, 'interestType is required'),
})

export type CreateSubmissionInput = z.infer<typeof createSubmissionSchema>
