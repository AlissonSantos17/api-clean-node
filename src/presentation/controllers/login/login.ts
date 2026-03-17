import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, serverError } from '../../helpers/http-helper'
import type { HttpRequest, HttpResponse } from '../../protocols'
import type { Controller } from '../../protocols/controller'
import type { EmailValidator } from '../signup/signup-protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body
      if (!email) {
        return badRequest(new MissingParamError('email'))
      }
      if (!password) {
        return badRequest(new MissingParamError('password'))
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      return await Promise.resolve({
        statusCode: 200,
        body: {
          message: 'Login successful',
        },
      })
    } catch (error) {
      const handledError = error instanceof Error ? error : new Error('Unexpected error')
      return serverError(handledError)
    }
  }
}
