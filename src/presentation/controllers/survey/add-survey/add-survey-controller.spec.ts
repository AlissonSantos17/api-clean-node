import type { HttpRequest, Validation } from './add-survey-controller.protocols'
import { AddSurveyController } from './add-survey-controller'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    question: 'any_question',
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer',
      },
    ],
  },
})

describe('AddSurveyController', () => {
  it('should call AddSurvey with correct values', async () => {
    class ValidationStub implements Validation {
      validate(_input: any): Error | null {
        return null
      }
    }
    const validationStub = new ValidationStub()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const sut = new AddSurveyController(validationStub)
    await sut.handle(makeFakeRequest())
    expect(validateSpy).toHaveBeenCalledWith(makeFakeRequest().body)
  })
})
