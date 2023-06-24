import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

prisma.user.create({
  data: {
    name: 'Logan',
    email: 'logan@email.com',
  },
})

export const app = fastify()
