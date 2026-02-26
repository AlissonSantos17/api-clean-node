import type { HttpReponse, HttpRequest } from '../protocols/http'

export class SignUpController {
  handle(httpRequest: HttpRequest): HttpReponse {
    if (!httpRequest.body.name) {
      return {
        body: new Error('Missing param: name'),
        statusCode: 400,
      }
    }
    if (!httpRequest.body.email) {
      return {
        body: new Error('Missing param: email'),
        statusCode: 400,
      }
    }

    return {
      body: 'success',
      statusCode: 200,
    }
  }
}
