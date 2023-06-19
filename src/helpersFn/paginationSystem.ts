import { SortOrder } from 'mongoose'

type IPaginationOptions = {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: SortOrder
  minPrice?: number
  maxPrice?: number
  location: string
}

type IPaginationResult = {
  page: number
  limit: number
  skip: number
  sortBy: string
  sortOrder: SortOrder
  minPrice?: number
  maxPrice?: number
  location: string
}

const paginationFormat = (options: IPaginationOptions): IPaginationResult => {
  const page = Number(options.page || 1)
  const limit = Number(options.limit || 10)
  const skip = (page - 1) * limit
  const sortBy = options.sortBy || 'createdAt'
  const sortOrder = options.sortOrder || 'asc'
  const minPrice = options.minPrice || 1000

  const maxPrice = options.maxPrice || 5000
  const location = options.location || 'chattogram'
  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
    minPrice,
    maxPrice,
    location,
  }
}

export const paginationSystem = {
  paginationFormat,
}
