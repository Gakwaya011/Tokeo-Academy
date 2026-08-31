import { Prisma } from '@prisma/client'
import { prisma } from '../../db/prisma'
import { AppError } from '../../utils/AppError'
import { deleteImage, uploadImage } from '../../lib/cloudinary'
import type { CreateProgramInput, UpdateProgramInput } from './programs.schema'

export function listPrograms() {
  return prisma.program.findMany({ orderBy: { createdAt: 'asc' } })
}

export async function getProgramBySlug(slug: string) {
  const program = await prisma.program.findUnique({ where: { slug } })
  if (!program) {
    throw new AppError('Program not found', 404)
  }
  return program
}

export async function createProgram(input: CreateProgramInput, imageFile?: Express.Multer.File) {
  const image = imageFile ? await uploadImage(imageFile.buffer, 'tokeo/programs') : null

  try {
    return await prisma.program.create({
      data: {
        ...input,
        imageUrl: image?.url,
        imagePublicId: image?.publicId,
      },
    })
  } catch (err) {
    if (image) await deleteImage(image.publicId)
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      throw new AppError('A program with this slug already exists', 409)
    }
    throw err
  }
}

export async function updateProgram(id: string, input: UpdateProgramInput, imageFile?: Express.Multer.File) {
  const existing = await prisma.program.findUnique({ where: { id } })
  if (!existing) {
    throw new AppError('Program not found', 404)
  }

  const image = imageFile ? await uploadImage(imageFile.buffer, 'tokeo/programs') : null

  try {
    const updated = await prisma.program.update({
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
      throw new AppError('A program with this slug already exists', 409)
    }
    throw err
  }
}

export async function deleteProgram(id: string) {
  const existing = await prisma.program.findUnique({ where: { id } })
  if (!existing) {
    throw new AppError('Program not found', 404)
  }
  await prisma.program.delete({ where: { id } })
  if (existing.imagePublicId) await deleteImage(existing.imagePublicId)
}
