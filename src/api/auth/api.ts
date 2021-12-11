import { APIRequest } from '../interfaces/apiRequest'
import { HTTPMethod } from '../apiClient'
import {
  ChangePasswordRequest,
  ChangePasswordResponse,
  LoginRequest,
  LoginResponse,
  MeResponse,
  SignupRequest,
  SignupResponse,
} from './entity'

const endpoint = '/auth'

export class Login<R extends LoginResponse> implements APIRequest<R> {
  method = HTTPMethod.POST
  path = `${endpoint}/login/`
  response!: R
  auth = false
  constructor(public data: LoginRequest) {}
}

export class Signup<R extends SignupResponse> implements APIRequest<R> {
  method = HTTPMethod.POST
  path = `${endpoint}/signup/`
  response!: R
  auth = false
  constructor(public data: SignupRequest) {}
}

export class ChangePassword<R extends ChangePasswordResponse>
  implements APIRequest<R>
{
  method = HTTPMethod.POST
  path = `${endpoint}/change-password/`
  response!: R
  auth = true
  constructor(public data: ChangePasswordRequest) {}
}

export class Me<R extends MeResponse> implements APIRequest<R> {
  method = HTTPMethod.GET
  path = `${endpoint}/me/`
  response!: R
  auth = true
}
