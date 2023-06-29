import { Model } from 'mongoose'

export type UserName = {
  firstName: string
  lastName: string
}

export type IBuyer = {
  _id: any
  password: string
  id: string
  name: UserName
  phoneNumber: string
  address: string
  budget: number
}

export type BuyerModel = Model<IBuyer>

export type IBuyerFilters = {
  searchTerm?: string
  id?: string
  name?: string
}
