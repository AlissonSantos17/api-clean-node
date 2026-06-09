import type { Decrypter } from '../../protocols/criptography/decrypter'

export class DbLoadAccountByToken {
  constructor(private readonly decrypter: Decrypter) {}

  async load(accessToken: string, _role?: string): Promise<string | null> {
    await this.decrypter.decrypt(accessToken)
    return await Promise.resolve(null)
  }
}
