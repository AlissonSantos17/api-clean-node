import { AccessDeniedError } from '../errors'
import { forbidden } from '../helpers/http/http-helper'
import { AuthMiddleware } from './auth-middleware'

describe('Auth Middleware', () => {
  it('should return 403 if no x-access-token header is provided', async () => {
    const sut = new AuthMiddleware()
    const httpResponse = await sut.handle({ body: {} })
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
})
