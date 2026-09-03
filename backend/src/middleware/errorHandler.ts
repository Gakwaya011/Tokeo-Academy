import type { NextFunction, Request, Response } from 'express'
import { MulterError } from 'multer'
import { ZodError } from 'zod'
import { AppError } from '../utils/AppError'

export function notFoundHandler(_req: Request, res: Response) {
  res.status(404).json({ error: 'Not found' })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ZodError) {
    return res.status(422).json({ error: 'Validation failed', details: err.flatten().fieldErrors })
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message })
  }

  // Multer rejects (file too large, unexpected field, wrong type) — client errors, not 500s.
  if (err instanceof MulterError) {
    const message =
      err.code === 'LIMIT_FILE_SIZE' ? 'Image must be 5 MB or smaller.' : 'Image upload was rejected.'
    return res.status(400).json({ error: message })
  }

  console.error(err)
  return res.status(500).json({ error: 'Something went wrong' })
}
