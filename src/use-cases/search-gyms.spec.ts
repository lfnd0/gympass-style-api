import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'GNN Gym 1',
      description: null,
      phone: null,
      latitude: -9.7615872,
      longitude: -36.6608384,
    })

    await gymsRepository.create({
      title: 'GNN Gym 2',
      description: null,
      phone: null,
      latitude: -9.7399354,
      longitude: -36.6768456,
    })

    const { gyms } = await sut.execute({
      query: 'GNN Gym 1',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'GNN Gym 1' })])
  })

  it('should be able to fetch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `GNN Gym ${i}`,
        description: null,
        phone: null,
        latitude: -9.7399354,
        longitude: -36.6768456,
      })
    }

    const { gyms } = await sut.execute({
      query: 'GNN Gym',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'GNN Gym 21' }),
      expect.objectContaining({ title: 'GNN Gym 22' }),
    ])
  })
})
