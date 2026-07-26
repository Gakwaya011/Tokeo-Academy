import { Router } from 'express'
import { requireAdmin, requireAuth } from '../../middleware/requireAuth'
import {
  createSubmissionHandler,
  listSubmissionsHandler,
  markSubmissionReadHandler,
} from './contact.controller'

export const contactRouter = Router()

// Public — anyone submitting the Contact page form
contactRouter.post('/', createSubmissionHandler)

// Admin-only — the dashboard reading submissions
contactRouter.get('/', requireAuth, requireAdmin, listSubmissionsHandler)
contactRouter.patch('/:id/read', requireAuth, requireAdmin, markSubmissionReadHandler)
