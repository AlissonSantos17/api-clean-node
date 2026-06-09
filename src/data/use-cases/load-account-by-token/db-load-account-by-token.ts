import type { Decrypter } from '../../protocols/criptography/decrypter'
import type { LoadAccountByTokenRepository } from '../../protocols/db/account/load-account-by-token-repository'

export class DbLoadAccountByToken {
  constructor(
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository,
  ) {}

  async load(accessToken: string, role?: string): Promise<string | null> {
    const decryptedToken = await this.decrypter.decrypt(accessToken)
    if (decryptedToken) {
      await this.loadAccountByTokenRepository.loadByToken(decryptedToken, role)
    }
    return null
  }
}
