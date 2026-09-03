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
  .max(40000)
  .transform((raw, ctx) => {
    try {
      const parsed = JSON.parse(raw)
      if (!Array.isArray(parsed) || !parsed.every((p) => typeof p === 'string')) throw new Error()
      if (parsed.length > 60 || parsed.some((p) => p.length > 5000)) throw new Error()
      return parsed as string[]
    } catch {
      ctx.addIssue({ code: 'custom', message: 'Body must be a JSON array of paragraph strings' })
      return z.NEVER
    }
  })

export const createInsightSchema = z.object({
  slug: slugField.max(120),
  category: z.string().trim().min(1, 'Category is required').max(60),
  title: z.string().trim().min(1, 'Title is required').max(200),
  excerpt: z.string().trim().min(1, 'Excerpt is required').max(500),
  body: bodyField,
  imageFocus: z.string().trim().min(1).max(40).optional(),
})

export const updateInsightSchema = createInsightSchema.partial()

export type CreateInsightInput = z.infer<typeof createInsightSchema>
export type UpdateInsightInput = z.infer<typeof updateInsightSchema>
