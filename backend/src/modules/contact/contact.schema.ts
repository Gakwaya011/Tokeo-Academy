import { z } from 'zod'

export const createSubmissionSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(120),
  email: z.string().trim().toLowerCase().email('Enter a valid email address').max(200),
  phone: z.string().trim().max(40).default(''),
  // The homepage's quick contact form doesn't collect these pill-selector
  // fields (only the full /contact page does), so default them.
  userType: z.string().trim().max(40).default('unspecified'),
  interestType: z.string().trim().max(40).default('general'),
  message: z.string().trim().min(1).max(4000).optional(),
  // Honeypot: real users never see or fill this field. Bots that autofill
  // everything will. A non-empty value = silently drop (see the controller).
  website: z.string().max(200).optional(),
})

export type CreateSubmissionInput = z.infer<typeof createSubmissionSchema>
