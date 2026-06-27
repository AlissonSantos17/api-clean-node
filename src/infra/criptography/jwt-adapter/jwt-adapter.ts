import jwt from 'jsonwebtoken'
import type { Encrypter } from '../../../data/protocols/criptography/encrypter'

export class JwtAdapter implements Encrypter {
  constructor(private readonly secret: string) {}

  async encrypt(value: string): Promise<string> {
    const accessToken = jwt.sign({ id: value }, this.secret)
    return await Promise.resolve(accessToken)
  }

  async decrypt(token: string): Promise<string | null> {
    const value = jwt.verify(token, this.secret) as string
    return await Promise.resolve(value)
  }
}
