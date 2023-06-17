export type IUserName = {
  firstName: string
  lastName: string
}
export type IUser = {
  password: string
  role: string
  name: IUserName
  phoneNumber: string
  address: string
  budget: number
  income: number
}
