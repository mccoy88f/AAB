import type { FastifyInstance } from 'fastify'
import bcrypt from 'bcryptjs'
import { prisma } from '../lib/prisma'
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../lib/jwt'
import { authenticate } from '../middleware/auth'

export async function authRoutes(app: FastifyInstance) {

  app.post('/register', async (request, reply) => {
    const { email, password, name } = request.body as any
    if (!email || !password || !name) return reply.status(400).send({ error: 'Missing required fields', statusCode: 400 })
    if (password.length < 8) return reply.status(400).send({ error: 'Password too short', statusCode: 400 })
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) return reply.status(409).send({ error: 'Email already registered', statusCode: 409 })
    const passwordHash = await bcrypt.hash(password, 12)
    const user = await prisma.user.create({
      data: { email, passwordHash, name },
      select: { id: true, email: true, name: true, locale: true, createdAt: true, updatedAt: true },
    })
    const accessToken = signAccessToken({ userId: user.id })
    const refreshToken = signRefreshToken({ userId: user.id })
    await prisma.session.create({ data: { userId: user.id, refreshToken, expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) } })
    return reply.status(201).send({ accessToken, refreshToken, user })
  })

  app.post('/login', async (request, reply) => {
    const { email, password } = request.body as any
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return reply.status(401).send({ error: 'Invalid credentials', statusCode: 401 })
    const valid = await bcrypt.compare(password, user.passwordHash)
    if (!valid) return reply.status(401).send({ error: 'Invalid credentials', statusCode: 401 })
    const accessToken = signAccessToken({ userId: user.id })
    const refreshToken = signRefreshToken({ userId: user.id })
    await prisma.session.create({ data: { userId: user.id, refreshToken, expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) } })
    const { passwordHash: _, ...safeUser } = user
    return { accessToken, refreshToken, user: safeUser }
  })

  app.post('/refresh', async (request, reply) => {
    const { refreshToken } = request.body as any
    if (!refreshToken) return reply.status(400).send({ error: 'Missing refresh token', statusCode: 400 })
    let payload
    try { payload = verifyRefreshToken(refreshToken) } catch {
      return reply.status(401).send({ error: 'Invalid refresh token', statusCode: 401 })
    }
    const session = await prisma.session.findUnique({ where: { refreshToken } })
    if (!session || session.expiresAt < new Date()) return reply.status(401).send({ error: 'Session expired', statusCode: 401 })
    return { accessToken: signAccessToken({ userId: payload.userId }) }
  })

  app.post('/logout', { preHandler: authenticate }, async (request, reply) => {
    const { refreshToken } = request.body as any
    if (refreshToken) await prisma.session.deleteMany({ where: { refreshToken } })
    return reply.status(204).send()
  })

  app.get('/me', { preHandler: authenticate }, async (request) => {
    const userId = (request as any).userId
    return prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, locale: true, createdAt: true, updatedAt: true },
    })
  })
}
