
import { Request, Response } from 'express'
import { BaseController } from '../../adapters/presentation/controllers/http/base-controller'
export const adaptRoute = (controller: BaseController) => {
  return async (req: Request, res: Response) => {
    const request = {
        query: req.query || {},
        body:  req.body || {},
        params: req.params || {}
      }
    const httpResponse = await controller.handle(request)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}