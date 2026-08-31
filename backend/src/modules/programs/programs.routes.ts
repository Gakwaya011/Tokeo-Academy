import { Router } from 'express'
import { requireAdmin, requireAuth } from '../../middleware/requireAuth'
import { upload } from '../../middleware/upload'
import {
  createProgramHandler,
  deleteProgramHandler,
  getProgramHandler,
  listProgramsHandler,
  updateProgramHandler,
} from './programs.controller'

export const programsRouter = Router()

// Public — the Programs pages
programsRouter.get('/', listProgramsHandler)
programsRouter.get('/:slug', getProgramHandler)

// Admin-only — the dashboard managing programs
programsRouter.post('/', requireAuth, requireAdmin, upload.single('image'), createProgramHandler)
programsRouter.patch('/:id', requireAuth, requireAdmin, upload.single('image'), updateProgramHandler)
programsRouter.delete('/:id', requireAuth, requireAdmin, deleteProgramHandler)
