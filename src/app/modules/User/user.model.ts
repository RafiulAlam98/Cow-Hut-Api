import { Model, Schema, model } from 'mongoose'
import { IUser } from './user.interfaces'

type UserModel = Model<IUser, object>

const userSchema = new Schema<IUser>(
  {
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['seller', 'buyer'],
      required: true,
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
        },
      },
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    income: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export const User = model<IUser, UserModel>('User', userSchema)
