import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post('/users').send({
    name: 'Logan',
    email: 'logan@mail.com',
    password: 'yu789qc',
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'logan@mail.com',
    password: 'yu789qc',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
