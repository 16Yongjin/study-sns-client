import { APIClient } from '../apiClient'
import * as API from './api'

/** 모든 공부 시간 가져오기 */
export const getStudyTimes = APIClient.of(API.GetStudyTimes)

/** 오늘의 공부 시간 목록 가져오기 */
export const getTodayStudyTimes = APIClient.of(API.GetTodayStudyTimes)

/** 공부 시간 생성 */
export const createStudyTime = APIClient.of(API.CreateStudyTime)

/** 공부 시간 삭제 */
export const updateStudyTime = APIClient.of(API.UpdateStudyTime)

/** 공부 시간 수정 */
export const deleteStudyTime = APIClient.of(API.DeleteStudyTime)
