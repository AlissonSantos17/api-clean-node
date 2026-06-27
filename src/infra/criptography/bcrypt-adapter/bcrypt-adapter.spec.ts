import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  hash: async (_value: string, _salt: number): Promise<string> =>
    await Promise.resolve('hashed_value'),

  compare: async (_value: string, _hash: string): Promise<boolean> => await Promise.resolve(true),
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  const sut = new BcryptAdapter(salt)
  return sut
}

describe('Bcrypt Adapter', () => {
  describe('hash()', () => {
    it('should call hash with correct values', async () => {
      const sut = makeSut()
      const hashSpy = jest.spyOn(bcrypt, 'hash')
      await sut.hash('any_value')
      expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
    })

    it('should return a valid hash on hash success', async () => {
      const sut = makeSut()
      const hash = await sut.hash('any_value')
      expect(hash).toBe('hashed_value')
    })

    it('should throw if bcrypt throws', async () => {
      const sut = makeSut()
      const throwError = (): never => {
        throw new Error()
      }
      jest.spyOn(bcrypt, 'hash').mockImplementationOnce(throwError)
      const promise = sut.hash('any_value')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('compare()', () => {
    it('should call compare with correct values', async () => {
      const sut = makeSut()
      const compareSpy = jest.spyOn(bcrypt, 'compare')
      await sut.compare('any_value', 'any_hash')
      expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash')
    })

    it('should return true when compare succeeds', async () => {
      const sut = makeSut()
      const isValid = await sut.compare('any_value', 'any_hash')
      expect(isValid).toBe(true)
    })

    it('should return false when compare fails', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false as never)
      const isValid = await sut.compare('any_value', 'any_hash')
      expect(isValid).toBe(false)
    })

    it('should throw if bcrypt compare throws', async () => {
      const sut = makeSut()
      const throwError = (): never => {
        throw new Error()
      }
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(throwError)
      const promise = sut.compare('any_value', 'any_hash')
      await expect(promise).rejects.toThrow()
    })
  })
})
