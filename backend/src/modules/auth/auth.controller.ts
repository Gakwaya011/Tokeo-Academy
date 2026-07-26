import type { Request, Response } from 'express'
import { asyncHandler } from '../../utils/asyncHandler'
import { AppError } from '../../utils/AppError'
import { loginSchema, signupSchema } from './auth.schema'
import * as authService from './auth.service'

export const signupHandler = asyncHandler(async (req: Request, res: Response) => {
  const input = signupSchema.parse(req.body)
  const result = await authService.signup(input)
  res.status(201).json(result)
})

export const loginHandler = asyncHandler(async (req: Request, res: Response) => {
  const input = loginSchema.parse(req.body)
  const result = await authService.login(input)
  res.status(200).json(result)
})

export const meHandler = asyncHandler(async (req: Request, res: Response) => {
  if (!req.auth) throw new AppError('Authentication required', 401)
  const user = await authService.getUserById(req.auth.userId)
  res.status(200).json({ user })
})
