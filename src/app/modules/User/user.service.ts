import ApiError from '../../errors/ApiError';
import { ISeller } from '../Seller/seller.interface';
import { IUser } from './user.interfaces';
import { Seller } from '../Seller/seller.model';
import { User } from './user.model';
import { generateSellerId } from './user.util';
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
    // user.id = id;//S-00001
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

const deleteSingleUserService = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id)
  return result
}

export const UserService = {
  createSeller,
  getAllUsersService,
  getSingleUser,
  updateSingleUser,
  deleteSingleUserService,
}
