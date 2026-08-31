import { Prisma } from '@prisma/client'
import { prisma } from '../../db/prisma'
import { AppError } from '../../utils/AppError'
import { deleteImage, uploadImage } from '../../lib/cloudinary'
import type { CreateInsightInput, UpdateInsightInput } from './insights.schema'

export function listInsights() {
  return prisma.insight.findMany({ orderBy: { createdAt: 'asc' } })
}

export async function getInsightBySlug(slug: string) {
  const insight = await prisma.insight.findUnique({ where: { slug } })
  if (!insight) {
    throw new AppError('Insight not found', 404)
  }
  return insight
}

export async function createInsight(input: CreateInsightInput, imageFile?: Express.Multer.File) {
  const image = imageFile ? await uploadImage(imageFile.buffer, 'tokeo/insights') : null

  try {
    return await prisma.insight.create({
      data: {
        ...input,
        imageUrl: image?.url,
        imagePublicId: image?.publicId,
      },
    })
  } catch (err) {
    if (image) await deleteImage(image.publicId)
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      throw new AppError('An insight with this slug already exists', 409)
    }
    throw err
  }
}

export async function updateInsight(id: string, input: UpdateInsightInput, imageFile?: Express.Multer.File) {
  const existing = await prisma.insight.findUnique({ where: { id } })
  if (!existing) {
    throw new AppError('Insight not found', 404)
  }

  const image = imageFile ? await uploadImage(imageFile.buffer, 'tokeo/insights') : null

  try {
    const updated = await prisma.insight.update({
      where: { id },
      data: {
        ...input,
        ...(image ? { imageUrl: image.url, imagePublicId: image.publicId } : {}),
      },
    })
    if (image && existing.imagePublicId) await deleteImage(existing.imagePublicId)
    return updated
  } catch (err) {
    if (image) await deleteImage(image.publicId)
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      throw new AppError('An insight with this slug already exists', 409)
    }
    throw err
  }
}

export async function deleteInsight(id: string) {
  const existing = await prisma.insight.findUnique({ where: { id } })
  if (!existing) {
    throw new AppError('Insight not found', 404)
  }
  await prisma.insight.delete({ where: { id } })
  if (existing.imagePublicId) await deleteImage(existing.imagePublicId)
}
