export type IUserName = {
  firstName: string
  lastName: string
}
export enum Role {
  BUYER = 'buyer',
  SELLER = 'seller',
}
export type IUser = {
  password: string
  role: Role
  name: IUserName
  phoneNumber: string
  address: string
  budget: number
  income: number
}
