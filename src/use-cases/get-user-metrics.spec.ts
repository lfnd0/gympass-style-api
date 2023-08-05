import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GetUserMetricsUseCase } from './get-user-metrics'

let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe('Get User Metrics Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(checkInsRepository)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to get checkins count from metrics', async () => {
    await checkInsRepository.create({
      gym_id: '1',
      user_id: '1',
    })

    await checkInsRepository.create({
      gym_id: '2',
      user_id: '1',
    })

    const { checkInsCount } = await sut.execute({
      userId: '1',
    })

    expect(checkInsCount).toEqual(2)
  })
})
