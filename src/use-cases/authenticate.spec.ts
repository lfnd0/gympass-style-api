import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './erros/invalid-credentials-error'

describe('Authenticate Use Case', () => {
  it('should be able to authenticate', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

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
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    expect(() =>
      sut.execute({
        email: 'nathan@mail.com',
        password: '1001001',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

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
