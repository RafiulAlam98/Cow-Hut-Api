import { Model, Types } from 'mongoose'

import { IBuyer } from '../Buyer/buyer.interface'
import { ICow } from '../Cow/cow.interface'

export type IOrder = {
  id: string
  cow: Types.ObjectId | ICow
  buyer: Types.ObjectId | IBuyer
}

export type OrderModel = Model<IOrder>
