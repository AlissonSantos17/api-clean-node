import type { Decrypter } from '../../protocols/criptography/decrypter'
import type { LoadAccountByTokenRepository } from '../../protocols/db/account/load-account-by-token-repository'
import type { AccountModel } from '../add-account/db-add-account-protocols'

export class DbLoadAccountByToken {
  constructor(
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository,
  ) {}

  async load(accessToken: string, role?: string): Promise<AccountModel | null> {
    const decryptedToken = await this.decrypter.decrypt(accessToken)
    if (decryptedToken) {
      const account = await this.loadAccountByTokenRepository.loadByToken(decryptedToken, role)
      if (account) {
        return account
      }
    }
    return null
  }
}
