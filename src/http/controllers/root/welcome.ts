import { FastifyReply, FastifyRequest } from 'fastify'

export async function welcome(request: FastifyRequest, reply: FastifyReply) {
  return reply.status(200).send({
    message: 'Welcome to Gympass Style API',
  })
}
