import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repositories'
import { CheckInUseCase } from '../check-in'
import { PrismaGymsRepositories } from '@/repositories/prisma/prisma-gyms-repositories'

export function makeCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepositories()

  const checkInUseCase = new CheckInUseCase(checkInsRepository, gymsRepository)

  return checkInUseCase
}
