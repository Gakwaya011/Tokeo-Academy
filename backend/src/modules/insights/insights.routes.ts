import { Router } from 'express'
import { requireAdmin, requireAuth } from '../../middleware/requireAuth'
import { upload } from '../../middleware/upload'
import {
  createInsightHandler,
  deleteInsightHandler,
  getInsightHandler,
  listInsightsHandler,
  updateInsightHandler,
} from './insights.controller'

export const insightsRouter = Router()

// Public — the Insights pages
insightsRouter.get('/', listInsightsHandler)
insightsRouter.get('/:slug', getInsightHandler)

// Admin-only — the dashboard managing insights
insightsRouter.post('/', requireAuth, requireAdmin, upload.single('image'), createInsightHandler)
insightsRouter.patch('/:id', requireAuth, requireAdmin, upload.single('image'), updateInsightHandler)
insightsRouter.delete('/:id', requireAuth, requireAdmin, deleteInsightHandler)
