import { APIClient } from '../apiClient'
import * as API from './api'

/** 공부 목표 가져오기 */
export const getStudyGoal = APIClient.of(API.GetStudyGoal)

/** 공부 목표 목록 가져오기 */
export const getStudyGoals = APIClient.of(API.GetStudyGoals)

/** 공부 목표 생성 */
export const createStudyGoal = APIClient.of(API.CreateStudyGoal)

/** 공부 목표 삭제 */
export const deleteStudyGoal = APIClient.of(API.DeleteStudyGoal)

/** 공부 목표 수정 */
export const updateStudyGoal = APIClient.of(API.UpdateStudyGoal)
