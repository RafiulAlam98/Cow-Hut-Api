import { Model } from 'mongoose'
import { UserName } from '../Buyer/buyer.interface'

export type IUser = {
  _id?: string
  id: string
  phoneNumber: string
  role: 'seller' | 'buyer'
  password: string
  name: UserName
  address: string
  budget?: number
  income?: number
}
export type UserModel = Model<IUser>
