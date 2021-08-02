
import { Request, Response } from 'express'
import { BaseController } from '../../adapters/presentation/controllers/http/base-controller'
import { HttpRequest } from '../../adapters/presentation/controllers/http/http-request'

export const adaptRoute = (controller: BaseController) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const httpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}