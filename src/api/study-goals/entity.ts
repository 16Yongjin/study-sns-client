import { StudyTime } from '../study-times/entity'

export type StudyGoal = {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
  studyTime?: StudyTime
}

export type CreateStudyGoalRequest = {
  name: string
}

export type UpdateStudyGoalRequest = {
  name: string
}
