import { MongoClient, type Collection } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient | null,
  uri: null as string | null,

  async connect(uri?: string): Promise<void> {
    this.uri = uri ?? this.uri
    this.client = await MongoClient.connect(this.uri!)
  },

  async disconnect(): Promise<void> {
    await this.client?.close()
    this.client = null
  },

  async isConnected(): Promise<boolean> {
    const client = this.client
    if (client === null) {
      return false
    }
    return await client
      .db()
      .command({ ping: 1 })
      .then(() => true)
      .catch(() => false)
  },

  async getCollection(name: string): Promise<Collection> {
    const isConnected = await this.isConnected()
    if (!isConnected) {
      await this.connect(this.uri!)
    }
    return this.client!.db().collection(name)
  },

  map: (collection: any): any => {
    const { _id: collectionId, ...collectionWithoutInternalId } = collection
    const id = collection.id ?? collectionId?.toString()
    return { ...collectionWithoutInternalId, id }
  },
}
