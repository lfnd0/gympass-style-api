import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history'

let checkInsRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInsHistoryUseCase

describe('Fetch User Check-in History Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckInsHistoryUseCase(checkInsRepository)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to fetch check-in history', async () => {
    await checkInsRepository.create({
      gym_id: '1',
      user_id: '1',
    })

    await checkInsRepository.create({
      gym_id: '2',
      user_id: '1',
    })

    const { checkIns } = await sut.execute({
      userId: '1',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: '1' }),
      expect.objectContaining({ gym_id: '2' }),
    ])
  })

  it('should be able to fetch paginated check-in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        gym_id: `${i}`,
        user_id: '1',
      })
    }

    const { checkIns } = await sut.execute({
      userId: '1',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: '21' }),
      expect.objectContaining({ gym_id: '22' }),
    ])
  })
})
