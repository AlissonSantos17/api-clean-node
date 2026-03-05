import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  hash: async (_value: string, _salt: number): Promise<string> =>
    await Promise.resolve('hashed_value'),
}))

describe('Bcrypt Adapter', () => {
  it('should call bcrypt with correct values', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })
  it('should return a hash on success', async () => {
    const sut = new BcryptAdapter(12)
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hashed_value')
  })
})
