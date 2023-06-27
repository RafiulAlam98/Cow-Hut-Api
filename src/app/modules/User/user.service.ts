import { generateBuyerId, generateSellerId } from './user.util';

import ApiError from '../../errors/ApiError';
import { Buyer } from '../Buyer/buyer.model';
import { Cow } from '../Cow/cow.model';
import { IBuyer } from '../Buyer/buyer.interface';
import { IOrder } from '../Order/order.interface';
import { ISeller } from '../Seller/seller.interface';
import { IUser } from './user.interfaces';
import { Order } from '../Order/order.model';
import { Seller } from '../Seller/seller.model';
import { User } from './user.model';
import httpStatus from 'http-status';
import mongoose from 'mongoose';

//create A seller
const createSeller = async (
  seller: ISeller,
  user: IUser
): Promise<IUser | null> => {
  
  user.role = 'seller';

  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateSellerId();
    user.id = id;//S-00001
    seller.id = id;//S-00001

    const newSeller = await Seller.create([seller], { session });

    if (!newSeller.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Seller');
    }

    user.seller = newSeller[0]._id;
    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'seller',
    });
  }
  return newUserAllData;
};

// create a buyer
const createbuyer = async (
  buyer: IBuyer,
  user: IUser
): Promise<IUser | null> => {
  
  user.role = 'buyer'

  let newUserAllData = null
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const id = await generateBuyerId()
    user.id = id
    buyer.id = id

    const newBuyer = await Buyer.create([buyer], { session })

    if (!newBuyer.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create buyer')
    }

    user.buyer = newBuyer[0]._id

    const newUser = await User.create([user], { session })

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    newUserAllData = newUser[0]

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'buyer',
    })
  }

  return newUserAllData
}

const getAllUsersService = async (): Promise<IUser[]> => {
  const result = await User.find()
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
  const user = await User.findById(id)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  const result = await User.findByIdAndDelete(id)

  let buyerDelete = null
  let sellerDelete = null

  if (user.buyer) {
    buyerDelete = await Buyer.findByIdAndDelete({ _id: user.buyer })
  }
  if (user.seller) {
    sellerDelete = await Seller.findByIdAndDelete({ _id: user.seller })
  }
  return { result, buyerDelete, sellerDelete }
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
      throw new Error('Cow not found')
    }
    // Check if the cow is available for sale
    if (cow.label !== 'for sale') {
      throw new Error('The cow is not available for sale')
    }

    // Find the seller
    const seller = await Seller.findById(cow.seller).session(session)
    if (!seller) {
      throw new Error('Seller not found')
    }

    // Find the buyer
    const buyer = await Buyer.findById(order.buyer).session(session)
    if (!buyer) {
      throw new Error('Buyer not found')
    }
    // Check if the buyer has enough budget to buy the cow
    if (buyer.budget < cow.price) {
      throw new Error('Buyer does not have enough budget to buy the cow')
    }

    // Update the cow's status to sold
    cow.label = 'sold out'
    await cow.save()

    // Transfer money from buyer to seller
    seller.income += cow.price
    buyer.budget -= cow.price
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
    const populatedOrder = await Order.findById(newOrderData._id)
      .populate('buyer')
      .populate('cow')

    await session.commitTransaction()
    await session.endSession()
    return populatedOrder
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }
}

//getAllOrder Data
const getAllOrders = async () => {
  const result = await Order.find({}).populate('cow').populate('buyer')
  return result
}



export const UserService = {
  orderCow,
  getAllOrders,
  createSeller,
  createbuyer,
  getAllUsersService,
  getSingleUser,
  updateSingleUser,
  deleteSingleUserService,
}
