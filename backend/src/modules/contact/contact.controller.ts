import type { Request, Response } from 'express'
import { asyncHandler } from '../../utils/asyncHandler'
import { createSubmissionSchema } from './contact.schema'
import * as contactService from './contact.service'

export const createSubmissionHandler = asyncHandler(async (req: Request, res: Response) => {
  const { website, ...input } = createSubmissionSchema.parse(req.body)

  // Honeypot tripped — pretend it worked so the bot doesn't learn anything.
  if (website && website.trim().length > 0) {
    return res.status(201).json({ submission: null })
  }

  const submission = await contactService.createSubmission(input)
  res.status(201).json({ submission })
})

export const listSubmissionsHandler = asyncHandler(async (req: Request, res: Response) => {
  const submissions = await contactService.listSubmissions()
  res.status(200).json({ submissions })
})

export const markSubmissionReadHandler = asyncHandler(async (req: Request, res: Response) => {
  const submission = await contactService.markSubmissionRead(req.params.id)
  res.status(200).json({ submission })
})
