import { Model } from 'mongoose'
import { UserName } from '../Buyer/buyer.interface'

export type ISeller = {
  _id?: string
  id: string
  phoneNumber: string
  role: 'seller'
  password: string
  name: UserName
  address: string
  income: number
}

export type SellerModel = Model<ISeller>

export type ISellerFilters = {
  searchTerm?: string
  id?: string
}
