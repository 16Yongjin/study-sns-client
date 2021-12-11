import { APIClient } from '../apiClient'
import * as AuthAPI from './api'

/** 로그인 */
export const login = APIClient.of(AuthAPI.Login)

/** 회원가입 */
export const signup = APIClient.of(AuthAPI.Signup)

/** 비밀번호 변경 */
export const changePassword = APIClient.of(AuthAPI.ChangePassword)

/** 현재 유저 정보 */
export const me = APIClient.of(AuthAPI.Me)
