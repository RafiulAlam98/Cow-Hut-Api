import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { catchAsyncTry } from '../../../shared/catchAsyncTry'
import sendResponse from '../../../shared/sendResponse'
import { UserService } from './user.service'

const createUser = catchAsyncTry(async (req, res) => {
  const { ...user } = req.body
  const result = await UserService.createUserService(user)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users created successfully !',
    data: result,
  })
})

const getAllUsers = catchAsyncTry(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsersService()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully',
    data: result,
  })
})

const getSingleUser = catchAsyncTry(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await UserService.getSingleUser(id)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User retrieved successfully!',
    data: result,
  })
})

const updateSingleUser = catchAsyncTry(async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedData = req.body
  const result = await UserService.updateSingleUser(id, updatedData)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: result,
  })
})

const deleteSingleUser = catchAsyncTry(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await UserService.deleteSingleUserService(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully',
    data: result,
  })
})
export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
}
