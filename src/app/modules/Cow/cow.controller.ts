import httpStatus from 'http-status'
import { catchAsyncTry } from '../../../shared/catchAsyncTry'
import sendResponse from '../../../shared/sendResponse'
import { CowService } from './cow.service'

const createCowController = catchAsyncTry(async (req, res) => {
  const { ...cows } = req.body
  const result = await CowService.createCowService(cows)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow added successfully !',
    data: result,
  })
})

const getAllCowsController = catchAsyncTry(async (req, res) => {
  const result = await CowService.getAllCowsService()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cows retrieved successfully',
    data: result,
  })
})

const getSingleCowController = catchAsyncTry(async (req, res) => {
  const id = req.params.id
  const result = await CowService.getSingleCowService(id)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Cow retrieved successfully!',
    data: result,
  })
})

const updateSingleCowController = catchAsyncTry(async (req, res) => {
  const id = req.params.id
  const updatedData = req.body
  const result = await CowService.updateSingleCowService(id, updatedData)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow updated successfully',
    data: result,
  })
})

const deleteSingleCowController = catchAsyncTry(async (req, res) => {
  const id = req.params.id
  const result = await CowService.deleteSingleCowService(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow deleted successfully',
    data: result,
  })
})

export const CowController = {
  createCowController,
  getAllCowsController,
  getSingleCowController,
  updateSingleCowController,
  deleteSingleCowController,
}
