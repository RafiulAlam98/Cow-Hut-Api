import { Request, Response } from 'express'

import { SellerService } from './seller.service'
import { catchAsyncTry } from '../../../shared/catchAsyncTry'
import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'

//Get all Sellers
const getAllSellers = catchAsyncTry(async (req: Request, res: Response) => {
  const result = await SellerService.getAllSellers()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sellers retrived successfully',
    data: result,
  })
})

//Get a Single Seller
const getSingleSeller = catchAsyncTry(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await SellerService.getSingleSeller(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Seller retrived successfully',
    data: result,
  })
})

//Update Seller
const updateSeller = catchAsyncTry(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await SellerService.updateSeller(id, req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Seller updated successfully',
    data: result,
  })
})

//Delete a Single Seller
const deleteSeller = catchAsyncTry(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await SellerService.deleteSeller(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Seller deleted successfully',
    data: result,
  })
})

export const SellerController = {
  deleteSeller,
  getAllSellers,
  getSingleSeller,
  updateSeller,
}
