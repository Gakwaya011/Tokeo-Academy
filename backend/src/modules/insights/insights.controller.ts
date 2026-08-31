import type { Request, Response } from 'express'
import { asyncHandler } from '../../utils/asyncHandler'
import { createInsightSchema, updateInsightSchema } from './insights.schema'
import * as insightsService from './insights.service'

export const listInsightsHandler = asyncHandler(async (req: Request, res: Response) => {
  const insights = await insightsService.listInsights()
  res.status(200).json({ insights })
})

export const getInsightHandler = asyncHandler(async (req: Request, res: Response) => {
  const insight = await insightsService.getInsightBySlug(req.params.slug)
  res.status(200).json({ insight })
})

export const createInsightHandler = asyncHandler(async (req: Request, res: Response) => {
  const input = createInsightSchema.parse(req.body)
  const insight = await insightsService.createInsight(input, req.file)
  res.status(201).json({ insight })
})

export const updateInsightHandler = asyncHandler(async (req: Request, res: Response) => {
  const input = updateInsightSchema.parse(req.body)
  const insight = await insightsService.updateInsight(req.params.id, input, req.file)
  res.status(200).json({ insight })
})

export const deleteInsightHandler = asyncHandler(async (req: Request, res: Response) => {
  await insightsService.deleteInsight(req.params.id)
  res.status(204).send()
})
