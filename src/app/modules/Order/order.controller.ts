import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { catchAsyncTry } from '../../../shared/catchAsyncTry'
import sendResponse from '../../../shared/sendResponse'
import { OrderService } from './order.service'

const CreateOrderCow = catchAsyncTry(async (req: Request, res: Response) => {
  const result = await OrderService.orderCow(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order is crerated  successfully',
    data: result,
  })
})

const getAllOrders = catchAsyncTry(async (req: Request, res: Response) => {
  const result = await OrderService.getAllOrders()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order retrieved  successfully',
    data: result,
  })
})
export const OrderController = {
  getAllOrders,
  CreateOrderCow,
}
