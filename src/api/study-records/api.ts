import { APIRequest } from '../interfaces/apiRequest'
import { HTTPMethod } from '../apiClient'
import * as E from './entity'

const endpoint = '/study-records'
const comments = 'comments'
const likes = 'likes'

/** 공부 내용 목록 가져오기 */
export class GetStudyRecords<R extends E.StudyRecord[]>
  implements APIRequest<R>
{
  method = HTTPMethod.GET
  response!: R
  auth = true
  path = `${endpoint}/`
}

/** 내가 작성한 공부 내용 가져오기 */
export class GetMyStudyRecords extends GetStudyRecords<E.StudyRecord[]> {
  path = `${endpoint}/my`
}

/** 공부 내용 가져오기 */
export class GetStudyRecord<R extends E.StudyRecord> implements APIRequest<R> {
  method = HTTPMethod.GET
  response!: R
  auth = true
  path = `${endpoint}/:id`
  constructor(id: number) {
    this.path = `${endpoint}/${id}`
  }
}

/** 공부 내용 생성하기 */
export class CreateStudyRecord<R extends E.StudyRecord>
  implements APIRequest<R>
{
  method = HTTPMethod.POST
  response!: R
  auth = true
  path = `${endpoint}/`
  constructor(public data: E.CreateStudyRecordRequest) {}
}

/** 공부 내용 수정하기 */
export class UpdateStudyRecord<R extends E.StudyRecord>
  implements APIRequest<R>
{
  method = HTTPMethod.PATCH
  response!: R
  auth = true
  path = `${endpoint}/:id`
  constructor(id: number, public data: E.UpdateStudyRecordRequest) {
    this.path = `${endpoint}/${id}`
  }
}

/** 공부 내용 삭제하기 */
export class DeleteStudyRecord<R extends {}> implements APIRequest<R> {
  method = HTTPMethod.DELETE
  response!: R
  auth = true
  path = `${endpoint}/:id`
  constructor(id: number) {
    this.path = `${endpoint}/${id}`
  }
}

/** 댓글 목록 가져오기 */
export class GetComments<R extends E.Comment[]> implements APIRequest<R> {
  method = HTTPMethod.GET
  response!: R
  auth = true
  path = `${endpoint}/:id/${comments}`
  constructor(id: number) {
    this.path = `${endpoint}/${id}/${comments}`
  }
}

/** 댓글 생성하기 */
export class CreateComment<R extends E.Comment> implements APIRequest<R> {
  method = HTTPMethod.POST
  response!: R
  auth = true
  path = `${endpoint}/:id/${comments}`
  constructor(id: number, public data: E.CreateCommentRequest) {
    this.path = `${endpoint}/${id}/${comments}`
  }
}

/** 댓글 삭제하기 */
export class DeleteComment<R extends {}> implements APIRequest<R> {
  method = HTTPMethod.DELETE
  response!: R
  auth = true
  path = `${endpoint}/:id/${comments}/:commentId`
  constructor(id: number, commentId: number) {
    this.path = `${endpoint}/${id}/${comments}/${commentId}`
  }
}

/** 좋아요 생성하기 */
export class CreateLike<R extends E.Like> implements APIRequest<R> {
  method = HTTPMethod.POST
  response!: R
  auth = true
  path = `${endpoint}/:id/${likes}`
  constructor(id: number) {
    this.path = `${endpoint}/${id}/${likes}`
  }
}

/** 좋아요 삭제하기 */
export class DeleteLike<R extends {}> implements APIRequest<R> {
  method = HTTPMethod.DELETE
  response!: R
  auth = true
  path = `${endpoint}/:id/${likes}`
  constructor(id: number) {
    this.path = `${endpoint}/${id}/${likes}`
  }
}
