import type { AddAccountModel } from '../../domain/use-cases/add-account'
import type { AccountModel } from '../../domain/use-cases/models/account'

export interface AddAccountRepository {
  add: (accountData: AddAccountModel) => Promise<AccountModel>
}
