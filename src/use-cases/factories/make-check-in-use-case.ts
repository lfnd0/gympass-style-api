import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repositories'
import { PrismaGysmRepositories } from '@/repositories/prisma/prisma-gysm-repositories'
import { CheckInUseCase } from '../check-in'

export function makeCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGysmRepositories()

  const checkInUseCase = new CheckInUseCase(checkInsRepository, gymsRepository)

  return checkInUseCase
}
