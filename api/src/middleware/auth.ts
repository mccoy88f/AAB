import type { FastifyRequest, FastifyReply } from 'fastify'
import { verifyAccessToken } from '../lib/jwt'

export async function authenticate(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  const authHeader = request.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    return reply.status(401).send({ error: 'Missing token', statusCode: 401 })
  }
  try {
    const payload = verifyAccessToken(authHeader.slice(7))
    ;(request as any).userId = payload.userId
  } catch {
    return reply.status(401).send({ error: 'Invalid or expired token', statusCode: 401 })
  }
}
