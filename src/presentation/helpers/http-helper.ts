import type { HttpReponse } from '../protocols/http'

export const badRequest = (error: Error): HttpReponse => ({
  body: error,
  statusCode: 400,
})
