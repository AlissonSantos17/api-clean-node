import type { Request, RequestHandler, Response } from 'express'
import type { Controller, HttpRequest } from '../../presentation/protocols'

export const adaptRoute =
  (controller: Controller): RequestHandler =>
  async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
    }
    const httpResponse = await controller.handle(httpRequest)
    if (httpResponse.statusCode >= 400) {
      return res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message,
      })
    }
    return res.status(httpResponse.statusCode).json(httpResponse.body)
  }
