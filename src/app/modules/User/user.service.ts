import httpStatus from 'http-status'
import ApiError from '../../errors/ApiError'
import { IUser } from './user.interfaces'
import { User } from './user.model'

const createUserService = async (user: IUser): Promise<IUser> => {
  const createdUser = await User.create(user)
  if (!createdUser) {
    throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, '')
  }
  return createdUser
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

const deleteSingleUserService = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id)
  return result
}

export const UserService = {
  createUserService,
  getAllUsersService,
  getSingleUser,
  updateSingleUser,
  deleteSingleUserService,
}
