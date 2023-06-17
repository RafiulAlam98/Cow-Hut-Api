import { NextFunction, Request, RequestHandler, Response } from 'express'

export const catchAsyncTry = (payloadFn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await payloadFn(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
