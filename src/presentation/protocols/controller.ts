import type { HttpReponse, HttpRequest } from './http'

export interface Controller {
  handle: (httpRequest: HttpRequest) => HttpReponse
}
