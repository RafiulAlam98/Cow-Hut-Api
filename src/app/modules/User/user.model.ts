import { IUser, UserModel } from './user.interfaces'
import { Schema, model } from 'mongoose'

const UserSchema = new Schema<IUser>(
  {
    role: {
      type: String,
      required: true,
    },
    // id: {
    //   type: String,
    //   required: true,
    //   unique: true,
    // },

    password: {
      type: String,
      required: true,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'Seller',
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: 'Buyer',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)
export const User = model<IUser, UserModel>('User', UserSchema)
