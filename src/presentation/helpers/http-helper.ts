import { ServerError } from '../errors'
import type { HttpResponse } from '../protocols/http'

export const badRequest = (error: Error): HttpResponse => ({
  body: error,
  statusCode: 400,
})

export const serverError = (error: Error): HttpResponse => ({
  body: new ServerError(error.stack),
  statusCode: 500,
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
})
