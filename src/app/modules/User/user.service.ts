/* eslint-disable @typescript-eslint/no-non-null-assertion */
import httpStatus from 'http-status'
import mongoose from 'mongoose'
import ApiError from '../../errors/ApiError'
import { Buyer } from '../Buyer/buyer.model'
import { Seller } from '../Seller/seller.model'
import { IUser } from './user.interfaces'
import { User } from './user.model'

const createUser = async (payload: IUser) => {
  const { role } = payload
  const session = await mongoose.startSession()
  let newUser

  try {
    session.startTransaction()
    if (role === 'seller') {
      const result = await Seller.findOne({ phoneNumber: payload.phoneNumber })
      if (result) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'User Already Exists')
      }
      const newSeller = await Seller.create([payload], { session })
      if (!newSeller.length) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Create Seller')
      }
    }

    if (role === 'buyer') {
      const result = await Buyer.findOne({ phoneNumber: payload.phoneNumber })
      if (result) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'User Already Exists')
      }
      const newBuyer = await Buyer.create([payload], { session })
      if (!newBuyer.length) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Create Buyer')
      }
    }

    const isUserExist = await User.findOne({ phoneNumber: payload.phoneNumber })
    if (isUserExist) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'User Already Exists')
    }

    const result = await User.create([payload], { session })
    if (!result.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Create User')
    }

    newUser = result[0]
    await session.commitTransaction()
    await session.endSession()
  } catch (ApiError) {
    await session.abortTransaction()
    await session.endSession()
    throw ApiError
  }
  return newUser
}

const getAllUsers = async () => {
  const result = await User.find({})
  return result
}

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id)
  return result
}

const updateSingleUser = async (
  id: string,
  paylod: IUser
): Promise<IUser | null> => {
  const result = await User.findOneAndUpdate({ _id: id }, paylod, {
    new: true,
  })
  return result
}

const deleteSingleUserService = async (id: string) => {
  const session = await mongoose.startSession()
  const existUser = await User.findById(id)
  let deleteUser

  if (!existUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  const { role, phoneNumber } = existUser

  try {
    session.startTransaction()
    if (role === 'seller') {
      await Seller.deleteOne({ phoneNumber: phoneNumber }, { session })
    }

    if (role === 'buyer') {
      await Buyer.deleteOne({ phoneNumber: phoneNumber }, { session })
    }

    const deletedUser = await User.findByIdAndDelete(id)

    deleteUser = deletedUser
    await session.commitTransaction()
    await session.endSession()
  } catch (ApiError) {
    await session.abortTransaction()
    await session.endSession()
    throw ApiError
  }

  return deleteUser
}

export const UserService = {
  createUser,

  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUserService,
}
