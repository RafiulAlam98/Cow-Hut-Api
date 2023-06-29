import { Model, Types } from 'mongoose'

import { IBuyer } from '../Buyer/buyer.interface'
import { ISeller } from '../Seller/seller.interface'

export type IUser = {
  _id: any
  id: string
  role: string
  seller?: Types.ObjectId | ISeller
  buyer?: Types.ObjectId | IBuyer
}
export type UserModel = Model<IUser>
