import { APIRequest } from '../interfaces/apiRequest'
import { HTTPMethod } from '../apiClient'
import * as E from './entity'

const endpoint = '/study-goals'

/** 공부 목표 가져오기 */
export class GetStudyGoal<R extends E.StudyGoal> implements APIRequest<R> {
  method = HTTPMethod.GET
  response!: R
  auth = true
  path = `${endpoint}/:id`
  constructor(id: number) {
    this.path = `${endpoint}/${id}`
  }
}

/** 공부 목표 목록 가져오기 */
export class GetStudyGoals<R extends E.StudyGoal[]> implements APIRequest<R> {
  method = HTTPMethod.GET
  response!: R
  auth = true
  path = `${endpoint}/`
}

/** 공부 목표 생성 */
export class CreateStudyGoal<R extends E.StudyGoal> implements APIRequest<R> {
  method = HTTPMethod.POST
  response!: R
  auth = true
  path = `${endpoint}/`
  constructor(public data: E.CreateStudyGoalRequest) {}
}

/** 공부 목표 수정 */
export class UpdateStudyGoal<R extends E.StudyGoal> implements APIRequest<R> {
  method = HTTPMethod.PATCH
  response!: R
  auth = true
  path = `${endpoint}/:id`
  constructor(id: number, public data: E.UpdateStudyGoalRequest) {
    this.path = `${endpoint}/${id}`
  }
}

/** 공부 목표 삭제 */
export class DeleteStudyGoal<R extends {}> implements APIRequest<R> {
  method = HTTPMethod.DELETE
  response!: R
  auth = true
  path = `${endpoint}/:id`
  constructor(id: number) {
    this.path = `${endpoint}/${id}`
  }
}
