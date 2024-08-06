import { FastifyInstance } from 'fastify'
import { welcome } from './welcome'

export async function rootRoutes(app: FastifyInstance) {
  app.get('/', welcome)
}
