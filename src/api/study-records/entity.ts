import { StudyTime } from '../study-times/entity'
import { User } from '../users/entity'

export type StudyRecord = {
  id: number
  content: string
  user: User
  studyGoal: string
  studyTime?: StudyTime
  duration: number
  comments?: Comment[]
  commentCount: number
  likeCount: number
  createdAt: Date
  updatedAt: Date
  liked: boolean
}

export type Comment = {
  id: number
  content: string
  user: User
  studyRecord: StudyRecord
  createdAt: Date
  updatedAt: Date
}

export type Like = {
  id: number
  user: User
  studyRecord: StudyRecord
  createdAt: Date
}

export type CreateStudyRecordRequest = {
  studyTimeId: number
  content: string
}

export type UpdateStudyRecordRequest = {
  content: string
}

export type CreateCommentRequest = {
  content: string
}
