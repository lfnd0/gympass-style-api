import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    gymsRepository.items.push({
      id: '1',
      title: 'GNN Gym',
      phone: '(82) 3537-9272',
      description: 'The best gym',
      latitude: new Decimal(-9.7615872),
      longitude: new Decimal(-36.6608384),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      userId: '1',
      gymId: '1',
      userLatitude: -9.7615872,
      userLongitude: -36.6608384,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      userId: '1',
      gymId: '1',
      userLatitude: -9.7615872,
      userLongitude: -36.6608384,
    })

    await expect(() =>
      sut.execute({
        userId: '1',
        gymId: '1',
        userLatitude: -9.7615872,
        userLongitude: -36.6608384,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      userId: '1',
      gymId: '1',
      userLatitude: -9.7615872,
      userLongitude: -36.6608384,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      userId: '1',
      gymId: '1',
      userLatitude: -9.7615872,
      userLongitude: -36.6608384,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: '2',
      title: 'GNN Gym',
      phone: '(82) 3537-9272',
      description: 'The best gym',
      latitude: new Decimal(9.7543201),
      longitude: new Decimal(-36.6456016),
    })

    await expect(() =>
      sut.execute({
        userId: '1',
        gymId: '2',
        userLatitude: -9.7615872,
        userLongitude: -36.6608384,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
