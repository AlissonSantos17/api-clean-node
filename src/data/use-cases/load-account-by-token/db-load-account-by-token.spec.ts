import type { Decrypter } from '../../protocols/criptography/decrypter'
import { DbLoadAccountByToken } from './db-load-account-by-token'

interface SutTypes {
  sut: DbLoadAccountByToken
  decryptStub: Decrypter
}

const makeDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt(_value: string): Promise<string | null> {
      return await Promise.resolve('any_value')
    }
  }
  return new DecrypterStub()
}

const makeSut = (): SutTypes => {
  const decryptStub = makeDecrypter()
  const sut = new DbLoadAccountByToken(decryptStub)
  return {
    sut,
    decryptStub,
  }
}

describe('DbLoadAccountByToken UseCase', () => {
  it('should call decrypter with correct values', async () => {
    const { sut, decryptStub } = makeSut()
    const decryptSpy = jest.spyOn(decryptStub, 'decrypt')
    await sut.load('any_token', 'any_role')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })

  it('should return null if decrypter returns null', async () => {
    const { sut, decryptStub } = makeSut()
    jest.spyOn(decryptStub, 'decrypt').mockReturnValueOnce(Promise.resolve(null))
    const account = await sut.load('any_token', 'any_role')
    expect(account).toBeNull()
  })
})
