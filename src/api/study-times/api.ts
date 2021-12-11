import { APIRequest } from '../interfaces/apiRequest'
import { HTTPMethod } from '../apiClient'
import * as E from './entity'

const endpoint = '/study-times'

/** 공부 전체 가져오기 */
export class GetStudyTimes<R extends E.StudyTime[]> implements APIRequest<R> {
  method = HTTPMethod.GET
  path = `${endpoint}/`
  response!: R
  auth = true
}

/** 오늘의 공부 시간 가져오기  */
export class GetTodayStudyTimes<R extends E.StudyTime[]>
  implements APIRequest<R>
{
  method = HTTPMethod.GET
  path = `${endpoint}/today/`
  response!: R
  auth = true
}

/** 공부 시간 생성 */
export class CreateStudyTime<R extends E.StudyTime> implements APIRequest<R> {
  method = HTTPMethod.POST
  response!: R
  auth = true
  path = `${endpoint}/`
  constructor(public data: E.CreateStudyTimeRequest) {}
}

/** 공부 시간 업데이트 */
export class UpdateStudyTime<R extends E.StudyTime> implements APIRequest<R> {
  method = HTTPMethod.PATCH
  response!: R
  auth = true
  path = `${endpoint}/:id`
  constructor(id: number, public data: E.UpdateStudyTimeRequest) {
    this.path = `${endpoint}/${id}`
  }
}

/** 공부 삭제 업데이트 */
export class DeleteStudyTime<R extends {}> implements APIRequest<R> {
  method = HTTPMethod.DELETE
  response!: R
  auth = true
  path = `${endpoint}/:id`
  constructor(id: number) {
    this.path = `${endpoint}/${id}`
  }
}
