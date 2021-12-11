import { Role } from '../auth/entity'

export type User = {
  id: number
  role: Role
  createdAt: Date
  updatedAt: Date
  username: string
  fullname: string
  email: string
  language: string
  image: string
}

export type UpdateUserRequest = {
  id: string
  username: string
  fullname: string
}
