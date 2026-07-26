import { prisma } from '../../db/prisma'
import { AppError } from '../../utils/AppError'
import type { CreateSubmissionInput } from './contact.schema'

export function createSubmission(input: CreateSubmissionInput) {
  return prisma.contactSubmission.create({ data: input })
}

export function listSubmissions() {
  return prisma.contactSubmission.findMany({ orderBy: { createdAt: 'desc' } })
}

export async function markSubmissionRead(id: string) {
  const submission = await prisma.contactSubmission.findUnique({ where: { id } })
  if (!submission) {
    throw new AppError('Submission not found', 404)
  }
  return prisma.contactSubmission.update({ where: { id }, data: { status: 'READ' } })
}
