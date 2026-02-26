import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import type { Controller } from '../protocols/controller'
import type { HttpReponse, HttpRequest } from '../protocols/http'

export class SignUpController implements Controller {
  handle(httpRequest: HttpRequest): HttpReponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    return {
      body: 'success',
      statusCode: 200,
    }
  }
}
