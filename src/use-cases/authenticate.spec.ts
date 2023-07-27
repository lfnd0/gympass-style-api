import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './erros/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'Nathan',
      email: 'nathan@mail.com',
      password_hash: await hash('1001001', 6),
    })

    const { user } = await sut.execute({
      email: 'nathan@mail.com',
      password: '1001001',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    expect(() =>
      sut.execute({
        email: 'nathan@mail.com',
        password: '1001001',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'Nathan',
      email: 'nathan@mail.com',
      password_hash: await hash('1001001', 6),
    })

    expect(() =>
      sut.execute({
        email: 'nathan@mail.com',
        password: '1001002',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
