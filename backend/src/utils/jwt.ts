import jwt from 'jsonwebtoken'
import { env } from '../config/env'

export type AccessTokenPayload = {
  sub: string
  role: 'USER' | 'ADMIN'
}

export function signAccessToken(payload: AccessTokenPayload) {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] })
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, env.JWT_SECRET) as AccessTokenPayload & { iat: number; exp: number }
}
