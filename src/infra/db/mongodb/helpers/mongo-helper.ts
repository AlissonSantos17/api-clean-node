import { MongoClient, type ObjectId, type Collection } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient | null,

  async connect(uri?: string): Promise<void> {
    this.client = await MongoClient.connect(process.env.MONGO_URL!)
  },

  async disconnect(): Promise<void> {
    await this.client!.close()
  },

  getCollection(name: string): Collection {
    return this.client!.db().collection(name)
  },

  map: (collection: any, _id?: ObjectId): any => ({
    ...collection,
    id: _id?.toString(),
  }),
}
