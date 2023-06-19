import httpStatus from 'http-status'
import ApiError from '../../errors/ApiError'
import { ICow } from './cow.interface'
import { cows } from './cow.model'

const createCowService = async (cow: ICow): Promise<ICow> => {
  const createdCowService = await cows.create(cow)
  if (!createCowService) {
    throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, '')
  }
  return createdCowService
}

export const getAllCowsService = async (): Promise<ICow[]> => {
  const result = await cows.find()
  return result
}

export const getSingleCowService = async (id: string): Promise<ICow | null> => {
  const result = await cows.findById(id)
  return result
}

export const updateSingleCowService = async (
  id: string,
  paylod: ICow
): Promise<ICow | null> => {
  const result = await cows.findOneAndUpdate({ _id: id }, paylod, {
    new: true,
  })
  return result
}

export const deleteSingleCowService = async (
  id: string
): Promise<ICow | null> => {
  const result = await cows.findByIdAndDelete(id)
  return result
}

export const CowService = {
  createCowService,
  getAllCowsService,
  getSingleCowService,
  updateSingleCowService,
  deleteSingleCowService,
}
