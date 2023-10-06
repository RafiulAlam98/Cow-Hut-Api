import { Model } from 'mongoose'

export type UserName = {
  firstName: string
  lastName: string
}

export type IBuyer = {
  _id?: string
  id: string
  phoneNumber: string
  role: 'buyer'
  password: string
  name: UserName
  address: string
  budget: number
}

export type BuyerModel = Model<IBuyer>

export type IBuyerFilters = {
  searchTerm?: string
  id?: string
  name?: string
}
