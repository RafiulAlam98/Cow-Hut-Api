import { Request, Response } from 'express'

import { BuyerService } from './buyer.service'
import { catchAsyncTry } from '../../../shared/catchAsyncTry'
import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'

//Get all Buyers
const getAllBuyers = catchAsyncTry(async (req: Request, res: Response) => {
  const result = await BuyerService.getAllBuyers()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Buyers retrived successfully',
    data: result,
  })
})

//Get a Single Buyer
const getSingleBuyer = catchAsyncTry(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await BuyerService.getSingleBuyer(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Buyer retrived successfully',
    data: result,
  })
})

//Update Buyer
const updateBuyer = catchAsyncTry(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await BuyerService.updateBuyer(id, req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Buyer updated successfully',
    data: result,
  })
})

//Delete a Single Buyer
const deleteBuyer = catchAsyncTry(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await BuyerService.deleteBuyer(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Buyers deleted successfully',
    data: result,
  })
})

export const BuyerController = {
  deleteBuyer,
  getAllBuyers,
  getSingleBuyer,
  updateBuyer,
}
