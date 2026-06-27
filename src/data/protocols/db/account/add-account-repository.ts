import type { AccountModel } from '../../../../domain/models/account'
import type { AddAccountModel } from '../../../../domain/use-cases/add-account'

export interface AddAccountRepository {
  add: (accountData: AddAccountModel) => Promise<AccountModel>
}
