import { z } from 'zod'

const slugField = z
  .string()
  .trim()
  .toLowerCase()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase letters, numbers, and hyphens only')

// Multipart form fields arrive as strings — body is sent as a JSON-encoded array of paragraphs.
const bodyField = z
  .string()
  .min(1, 'Body is required')
  .transform((raw, ctx) => {
    try {
      const parsed = JSON.parse(raw)
      if (!Array.isArray(parsed) || !parsed.every((p) => typeof p === 'string')) throw new Error()
      return parsed as string[]
    } catch {
      ctx.addIssue({ code: 'custom', message: 'Body must be a JSON array of paragraph strings' })
      return z.NEVER
    }
  })

export const createInsightSchema = z.object({
  slug: slugField,
  category: z.string().trim().min(1, 'Category is required'),
  title: z.string().trim().min(1, 'Title is required'),
  excerpt: z.string().trim().min(1, 'Excerpt is required'),
  body: bodyField,
  imageFocus: z.string().trim().min(1).optional(),
})

export const updateInsightSchema = createInsightSchema.partial()

export type CreateInsightInput = z.infer<typeof createInsightSchema>
export type UpdateInsightInput = z.infer<typeof updateInsightSchema>
