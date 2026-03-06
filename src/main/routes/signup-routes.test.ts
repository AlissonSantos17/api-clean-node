import { app } from '../config/app'
import request from 'supertest'

describe('Signup Routes', () => {
  test('should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Alisson',
        email: 'alissonfelp00@gmail.com',
        password: '123456',
        passwordConfirmation: '123456',
      })
      .expect(200)
  })
})
