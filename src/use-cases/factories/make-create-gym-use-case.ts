import { PrismaGysmRepositories } from '@/repositories/prisma/prisma-gysm-repositories'
import { CreateGymUseCase } from '../create-gym'

export function makeCreateGymUseCase() {
  const gymsRepository = new PrismaGysmRepositories()
  const createGymsUseCase = new CreateGymUseCase(gymsRepository)

  return createGymsUseCase
}
