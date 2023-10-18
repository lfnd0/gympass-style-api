import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Search Gyms (2e2)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search gyms by title', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'GNN Gym 1',
        description: 'Some description.',
        phone: '888888888',
        latitude: -9.7015267,
        longitude: -37.8405002,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'GNN Gym 2',
        description: 'Some description.',
        phone: '999999999',
        latitude: -9.7615872,
        longitude: -36.6608384,
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .query({
        q: 'GNN Gym 1',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'GNN Gym 1',
      }),
    ])
  })
})
