import { APIClient } from '../apiClient'
import * as API from './api'

export const getUsers = APIClient.of(API.GetUsers)

export const getUser = APIClient.of(API.GetUser)

export const updateUser = APIClient.of(API.UpdateUser)
