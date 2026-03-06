import type { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import type { AddAccountModel } from '../../../../domain/use-cases/add-account'
import type { AccountModel } from '../../../../domain/use-cases/models/account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const accountToInsert = { ...accountData }
    const { insertedId } = await accountCollection.insertOne(accountToInsert)
    return {
      ...accountData,
      id: insertedId.toString(),
    }
  }
}
