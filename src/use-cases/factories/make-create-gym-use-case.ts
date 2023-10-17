import { PrismaGymsRepositories } from '@/repositories/prisma/prisma-gyms-repositories'
import { CreateGymUseCase } from '../create-gym'

export function makeCreateGymUseCase() {
  const gymsRepository = new PrismaGymsRepositories()
  const createGymsUseCase = new CreateGymUseCase(gymsRepository)

  return createGymsUseCase
}
