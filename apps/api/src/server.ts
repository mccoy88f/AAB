import Fastify from 'fastify'
import cors from '@fastify/cors'
import { authRoutes } from './routes/auth'

const app = Fastify({ logger: true })

async function start() {
  await app.register(cors, {
    origin: ['http://localhost:3001', 'http://localhost:5173', process.env['ALLOWED_ORIGIN'] ?? ''].filter(Boolean),
    credentials: true,
  })
  await app.register(authRoutes, { prefix: '/auth' })
  app.get('/health', async () => ({ status: 'ok', timestamp: new Date().toISOString() }))
  const port = parseInt(process.env['PORT'] ?? '3000')
  await app.listen({ port, host: '0.0.0.0' })
  console.log(`🚀 API running on http://localhost:${port}`)
}

start().catch((err) => { console.error(err); process.exit(1) })
