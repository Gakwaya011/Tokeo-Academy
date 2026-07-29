import { prisma } from '../../db/prisma'
import { AppError } from '../../utils/AppError'
import { comparePassword, hashPassword } from '../../utils/password'
import { signAccessToken } from '../../utils/jwt'
import type { LoginInput, SignupInput } from './auth.schema'

async function toPublicUser(user: { id: string; name: string; email: string; role: 'USER' | 'ADMIN' }) {
  const enrollment = await prisma.enrollment.findUnique({ where: { userId: user.id } })
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    hasAccess: enrollment?.status === 'ACTIVE',
  }
}

export async function signup(input: SignupInput) {
  const existing = await prisma.user.findUnique({ where: { email: input.email } })
  if (existing) {
    throw new AppError('An account with this email already exists.', 409)
  }

  const passwordHash = await hashPassword(input.password)
  const user = await prisma.user.create({
    data: { name: input.name, email: input.email, passwordHash },
  })

  const token = signAccessToken({ sub: user.id, role: user.role })
  return { user: await toPublicUser(user), token }
}

export async function login(input: LoginInput) {
  const user = await prisma.user.findUnique({ where: { email: input.email } })
  if (!user) {
    throw new AppError('Incorrect email or password.', 401)
  }

  const valid = await comparePassword(input.password, user.passwordHash)
  if (!valid) {
    throw new AppError('Incorrect email or password.', 401)
  }

  const token = signAccessToken({ sub: user.id, role: user.role })
  return { user: await toPublicUser(user), token }
}

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({ where: { id } })
  if (!user) {
    throw new AppError('User not found', 404)
  }
  return toPublicUser(user)
}
