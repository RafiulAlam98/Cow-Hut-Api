import { ICow, ICowFilter } from './cow.interface'

import ApiError from '../../errors/ApiError'
import { Cow } from './cow.model'
import { IPaginationOptions } from './../../../interfaces/paginations/paginations'
import { buildWhereConditions } from '../../../helpersFn/buildWhereCondition'
import { cowSearchableFields } from './cow.constatnt'
import httpStatus from 'http-status'
import { paginationSystem } from '../../../helpersFn/paginationSystem'

const createCowService = async (cow: ICow): Promise<ICow> => {
  const createdCowService = await Cow.create(cow)
  if (!createCowService) {
    throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, '')
  }
  return createdCowService
}

const getAllCowsService = async (
  filters: ICowFilter,
  paginationOptions: IPaginationOptions
) => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationSystem.paginationFormat(paginationOptions)
  const { searchTerm, ...filtersData } = filters

  const { whereConditions, sortConditions } = buildWhereConditions(
    searchTerm,
    filtersData,
    cowSearchableFields,
    sortBy,
    sortOrder
  )

  const result = await Cow.find(whereConditions)
    .populate('seller')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await Cow.countDocuments()

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
  const result = await Cow.findById(id)
  return result
}

export const updateSingleCowService = async (
  id: string,
  paylod: ICow
): Promise<ICow | null> => {
  const result = await Cow.findOneAndUpdate({ _id: id }, paylod, {
    new: true,
  })
  return result
}

export const deleteSingleCowService = async (
  id: string
): Promise<ICow | null> => {
  const result = await Cow.findByIdAndDelete(id)
  return result
}

export const CowService = {
  createCowService,
  getAllCowsService,
  getSingleCowService,
  updateSingleCowService,
  deleteSingleCowService,
}
