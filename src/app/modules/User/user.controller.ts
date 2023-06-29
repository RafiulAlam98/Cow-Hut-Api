import { Request, Response } from 'express'
import { RequestHandler } from 'express-serve-static-core'
import httpStatus from 'http-status'
import { catchAsyncTry } from '../../../shared/catchAsyncTry'
import sendResponse from '../../../shared/sendResponse'
import { UserService } from './user.service'


const createSeller = catchAsyncTry(async (req: Request, res: Response) => {

  const { ...seller } = req.body
  const {...user} = req.body
  const result = await UserService.createSeller(seller, user)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Seller created successfully',
    data: result
  })
})

const createbuyer: RequestHandler = catchAsyncTry(async (req: Request, res: Response) => {
  const {...buyer} = req.body
  const { ...user } = req.body
  const result = await UserService.createbuyer(buyer, user)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Buyer created successfully',
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

const CreateOrderCow = catchAsyncTry(async (req: Request, res: Response) => {
  const result = await UserService.orderCow(req.body)
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order is crerated  successfully',
    data: result,
  })
})

//get all orders
const getAllOrders = catchAsyncTry(async (req: Request, res: Response) => {
  const result = await UserService.getAllOrders()
 sendResponse(res, {
   statusCode: httpStatus.OK,
   success: true,
   message: 'Order retrieved  successfully',
   data: result,
 })
})


export const UserController = {
  CreateOrderCow,
  getAllOrders,
  createSeller,
  createbuyer,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
}
