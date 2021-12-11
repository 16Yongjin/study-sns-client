import { APIResponse } from '../interfaces/apiResponse'

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

export type LoginRequest = {
  username: string
  password: string
}

export interface UserInfo {
  id: number
  username: string
  email: string
  token: string
  role: Role
}

export interface LoginResponse extends APIResponse, UserInfo {}

export type SignupRequest = {
  username: string
  email: string
  password: string
  fullname: string
}

export type SignupResponse = LoginResponse
export type MeResponse = LoginResponse

export type ChangePasswordRequest = {
  username: string
  password: string
}

export type ChangePasswordResponse = LoginResponse
