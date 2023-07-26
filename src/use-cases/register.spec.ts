import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './erros/user-already-exists-error'

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const registerUserCase = new RegisterUseCase(inMemoryUsersRepository)

    const { user } = await registerUserCase.execute({
      name: 'Nathan',
      email: 'nathan@mail.com',
      password: '1001001',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const registerUserCase = new RegisterUseCase(inMemoryUsersRepository)

    const { user } = await registerUserCase.execute({
      name: 'Nathan',
      email: 'nathan@mail.com',
      password: '1001001',
    })

    const isPasswordCorrectlyHashed = await compare(
      '1001001',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same e-mail twice', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const registerUserCase = new RegisterUseCase(inMemoryUsersRepository)

    const email = 'nathan@mail.com'

    await registerUserCase.execute({
      name: 'Nathan',
      email,
      password: '1001001',
    })

    await expect(() =>
      registerUserCase.execute({
        name: 'Nathan',
        email,
        password: '1001001',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
