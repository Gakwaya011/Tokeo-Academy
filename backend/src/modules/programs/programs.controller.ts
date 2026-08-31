import type { Request, Response } from 'express'
import { asyncHandler } from '../../utils/asyncHandler'
import { createProgramSchema, updateProgramSchema } from './programs.schema'
import * as programsService from './programs.service'

export const listProgramsHandler = asyncHandler(async (req: Request, res: Response) => {
  const programs = await programsService.listPrograms()
  res.status(200).json({ programs })
})

export const getProgramHandler = asyncHandler(async (req: Request, res: Response) => {
  const program = await programsService.getProgramBySlug(req.params.slug)
  res.status(200).json({ program })
})

export const createProgramHandler = asyncHandler(async (req: Request, res: Response) => {
  const input = createProgramSchema.parse(req.body)
  const program = await programsService.createProgram(input, req.file)
  res.status(201).json({ program })
})

export const updateProgramHandler = asyncHandler(async (req: Request, res: Response) => {
  const input = updateProgramSchema.parse(req.body)
  const program = await programsService.updateProgram(req.params.id, input, req.file)
  res.status(200).json({ program })
})

export const deleteProgramHandler = asyncHandler(async (req: Request, res: Response) => {
  await programsService.deleteProgram(req.params.id)
  res.status(204).send()
})
