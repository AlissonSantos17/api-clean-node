import { MongoHelper } from '../helpers/mongo-helper'
import type { Collection } from 'mongodb'
import { SurveyMongoRepository } from './survey-mongo-repository'

let surveysCollection: Collection

describe('Survey Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveysCollection = await MongoHelper.getCollection('surveys')
    await surveysCollection.deleteMany({})
  })

  const makeSut = (): SurveyMongoRepository => new SurveyMongoRepository()

  it('should add a survey on success', async () => {
    const sut = makeSut()
    await sut.add({
      question: 'any_question',
      answers: [{ answer: 'any_answer', image: 'any_image' }, { answer: 'other_answer' }],
    })
    const survey = await surveysCollection.findOne({ question: 'any_question' })
    expect(survey).toBeTruthy()
    expect(survey?.question).toBe('any_question')
    expect(survey?.answers).toEqual([
      { answer: 'any_answer', image: 'any_image' },
      { answer: 'other_answer' },
    ])
  })
})
