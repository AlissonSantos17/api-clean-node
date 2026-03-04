import type { AddAccount, AddAccountModel } from '../../../domain/use-cases/add-account'
import type { AccountModel } from '../../../domain/use-cases/models/account'
import type { Encrypter } from '../../protocols/encrypter'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter

  constructor(encrypter: Encrypter) {
    this.encrypter = encrypter
  }
  async add(account: AddAccountModel): Promise<AccountModel> {
    const encryptedPassword = await this.encrypter.encrypt(account.password)
    return await Promise.resolve({
      id: 'valid_id',
      name: account.name,
      email: account.email,
      password: encryptedPassword,
    })
  }
}
