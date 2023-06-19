import httpStatus from 'http-status'
import { SortOrder } from 'mongoose'
import { paginationSystem } from '../../../helpersFn/paginationSystem'
import { IPaginationOptions } from '../../../interfaces/paginations/paginations'
import ApiError from '../../errors/ApiError'
import { cowSearchField } from './cow.constatnt'
import { ICow, ICowFilter } from './cow.interface'
import { cows } from './cow.model'

const createCowService = async (cow: ICow): Promise<ICow> => {
  const createdCowService = await cows.create(cow)
  if (!createCowService) {
    throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, '')
  }
  return createdCowService
}

export const getAllCowsService = async (
  paginationOptions: IPaginationOptions,
  filters: ICowFilter
) => {
  const andConditions = []
  const { searchTerm, ...filtersData } = filters

  if (searchTerm) {
    andConditions.push({
      $or: cowSearchField.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationSystem.paginationFormat(paginationOptions)

  const sortConditions: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await cows
    .find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
  const total = await cows.countDocuments()
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
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
