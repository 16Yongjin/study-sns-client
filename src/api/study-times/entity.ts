import { StudyGoal } from '../study-goals/entity'
import { StudyRecord } from '../study-records/entity'

/** 공부 시간 */
export type StudyTime = {
  id: number
  duration: number
  studyGoal: StudyGoal
  studyRecord?: StudyRecord
  createdAt: Date
  updatedAt: Date
}

export type CreateStudyTimeRequest = {
  studyGoalId: number
}

export type UpdateStudyTimeRequest = {
  duration: number
}
