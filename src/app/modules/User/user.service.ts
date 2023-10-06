/* eslint-disable @typescript-eslint/no-non-null-assertion */
import httpStatus from 'http-status'
import mongoose from 'mongoose'
import ApiError from '../../errors/ApiError'
import { Buyer } from '../Buyer/buyer.model'
import { Cow } from '../Cow/cow.model'
import { IOrder } from '../Order/order.interface'
import { Order } from '../Order/order.model'
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

const orderCow = async (order: IOrder) => {
  const session = await mongoose.startSession()
  let newOrderData = null
  try {
    session.startTransaction()
    // Find the cow to be sold
    //cow:id
    //buyer:id
    const cow = await Cow.findById(order.cow).session(session)
    if (!cow) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Cow not found')
    }

    const sellerId = cow.seller
    // Check if the cow is available for sale
    if (cow.label !== 'for sale') {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'The cow is not available for sale'
      )
    }

    // Find the seller
    const seller = await User.findOne({ _id: sellerId }).session(session)

    if (!seller) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Seller not found')
    }

    // Find the buyer
    const buyer = await User.findById(order.buyer).session(session)
    if (!buyer) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Buyer not found')
    }
    // Check if the buyer has enough budget to buy the cow
    if (buyer.budget! < cow.price) {
      throw new ApiError('Buyer does not have enough budget to buy the cow')
    }

    // Update the cow's status to sold
    cow.label = 'sold out'
    await cow.save()

    // Transfer money from buyer to seller
    seller.income! += cow.price
    buyer.budget! -= cow.price
    await seller.save()
    await buyer.save()

    const newOrder = await Order.create(
      {
        cow: cow._id,
        buyer: buyer._id,
      },
      { session }
    )

    newOrderData = newOrder[0]

    // Populate the 'buyer' field in the newOrder document

    await session.commitTransaction()
    await session.endSession()
    return newOrderData
  } catch (ApiError) {
    await session.abortTransaction()
    await session.endSession()
    throw ApiError
  }
}

//getAllOrder Data
const getAllOrders = async () => {
  const result = await Order.find({}).populate('cow').populate('buyer')
  return result
}

export const UserService = {
  orderCow,
  createUser,
  getAllOrders,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUserService,
}
