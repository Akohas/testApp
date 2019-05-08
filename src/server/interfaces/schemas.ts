
export interface Schemas {
  [key: string]: string
}

export interface IUser {
  encryptPassword: Function,
  checkPassword: Function
}
