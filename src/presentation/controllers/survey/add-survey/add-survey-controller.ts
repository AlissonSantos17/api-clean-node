import { badRequest, serverError } from '../../../helpers/http/http-helper'
import type {
  AddSurvey,
  Controller,
  HttpRequest,
  Validation,
} from './add-survey-controller.protocols'

export class AddSurveyController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<any> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { question, answers } = httpRequest.body
      await this.addSurvey.add({ question, answers })
      return null
    } catch (error) {
      return serverError(error instanceof Error ? error : new Error(String(error)))
    }
  }
}
