import { z } from 'zod'

const slugField = z
  .string()
  .trim()
  .toLowerCase()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase letters, numbers, and hyphens only')

export const createProgramSchema = z.object({
  number: z.string().trim().min(1, 'Number is required').max(10),
  slug: slugField.max(120),
  title: z.string().trim().min(1, 'Title is required').max(160),
  tagline: z.string().trim().min(1, 'Tagline is required').max(300),
  challenge: z.string().trim().min(1, 'Challenge is required').max(1000),
  artifact: z.string().trim().min(1, 'Artifact is required').max(300),
  quote: z.string().trim().min(1, 'Quote is required').max(1000),
})

export const updateProgramSchema = createProgramSchema.partial()

export type CreateProgramInput = z.infer<typeof createProgramSchema>
export type UpdateProgramInput = z.infer<typeof updateProgramSchema>
