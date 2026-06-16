import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  sign: async (): Promise<string> => await Promise.resolve('any_token'),
}))

const makeSut = (): JwtAdapter => new JwtAdapter('secret')

describe('Jwt Adapter', () => {
  describe('sign()', () => {
    it('should call sign with correct values', async () => {
      const sut = makeSut()
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt('any_id')
      expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
    })

    it('should return a token on sign success', async () => {
      const sut = makeSut()
      const accessToken = await sut.encrypt('any_id')
      expect(accessToken).toBe('any_token')
    })

    it('should throw if sign throws', async () => {
      const sut = makeSut()
      const throwError = (): never => {
        throw new Error()
      }
      jest.spyOn(jwt, 'sign').mockImplementationOnce(throwError)
      const promise = sut.encrypt('any_id')
      await expect(promise).rejects.toThrow()
    })
  })
})
