import {Role} from "@prisma/client";

export interface IUser {
  id: number
  login: string,
  role: Role
}

export interface IUserExtra {
  isActivated: boolean
}

export interface IUserProfile {
  name: string
  firstSurname: string
  secondSurname: string
  district: string
  phone: string
  email: string
  street: string
  city: string
}

export interface IRegisterResponseSuccess {
  access_token: string
  user: IUser
  profile: IUserProfile
  extra: IUserExtra
}