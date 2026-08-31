import { z } from 'zod'

const slugField = z
  .string()
  .trim()
  .toLowerCase()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase letters, numbers, and hyphens only')

export const createProgramSchema = z.object({
  number: z.string().trim().min(1, 'Number is required'),
  slug: slugField,
  title: z.string().trim().min(1, 'Title is required'),
  tagline: z.string().trim().min(1, 'Tagline is required'),
  challenge: z.string().trim().min(1, 'Challenge is required'),
  artifact: z.string().trim().min(1, 'Artifact is required'),
  quote: z.string().trim().min(1, 'Quote is required'),
})

export const updateProgramSchema = createProgramSchema.partial()

export type CreateProgramInput = z.infer<typeof createProgramSchema>
export type UpdateProgramInput = z.infer<typeof updateProgramSchema>
