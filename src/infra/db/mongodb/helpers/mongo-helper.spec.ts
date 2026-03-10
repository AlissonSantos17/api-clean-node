import { Db, ObjectId } from 'mongodb'
import { MongoHelper as sut } from './mongo-helper'

describe('MongoHelper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  it('should reconnect if mongodb is down', async () => {
    let accountCollection = await sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
    await sut.disconnect()
    accountCollection = await sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
  })

  it('should connect using stored uri when no uri is provided', async () => {
    await sut.disconnect()
    await sut.connect()
    const isConnected = await sut.isConnected()
    expect(isConnected).toBe(true)
  })

  it('should return true if mongodb is connected', async () => {
    const isConnected = await sut.isConnected()
    expect(isConnected).toBe(true)
  })

  it('should return false if mongodb client is null', async () => {
    await sut.disconnect()
    const isConnected = await sut.isConnected()
    expect(isConnected).toBe(false)
    await sut.connect(process.env.MONGO_URL)
  })

  it('should return false if ping throws', async () => {
    const commandSpy = jest
      .spyOn(Db.prototype, 'command')
      .mockRejectedValueOnce(new Error('any_error'))
    const isConnected = await sut.isConnected()
    expect(isConnected).toBe(false)
    commandSpy.mockRestore()
  })

  it('should map _id to id (string) and remove _id', () => {
    const _id = new ObjectId()
    const model = sut.map({ _id, name: 'any_name' })
    expect(model).toEqual({
      id: _id.toString(),
      name: 'any_name',
    })
    expect(model._id).toBeUndefined()
  })

  it('should keep id when it already exists and remove _id', () => {
    const _id = new ObjectId()
    const model = sut.map({ _id, id: 'custom-id', name: 'any_name' })
    expect(model).toEqual({
      id: 'custom-id',
      name: 'any_name',
    })
    expect(model._id).toBeUndefined()
  })
})
