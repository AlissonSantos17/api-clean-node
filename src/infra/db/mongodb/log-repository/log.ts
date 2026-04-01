import type { LogErrorRepository } from '../../../../data/protocols/db/log-error-repository'
import { MongoHelper } from '../helpers/mongo-helper'

export class LogMongoRepository implements LogErrorRepository {
  async logError(stack: string): Promise<void> {
    const errorLogCollection = await MongoHelper.getCollection('errors')
    await errorLogCollection.insertOne({
      stack,
      date: new Date(),
    })
  }
}
