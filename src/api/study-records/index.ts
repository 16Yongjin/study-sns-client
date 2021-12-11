import { APIClient } from '../apiClient'
import * as API from './api'

/** 공부 내용 목록 가져오기 */
export const getStudyRecords = APIClient.of(API.GetStudyRecords)

/** 내가 작성한 공부 내용 가져오기 */
export const getMyStudyRecords = APIClient.of(API.GetMyStudyRecords)

/** 공부 내용 가져오기 */
export const getStudyRecord = APIClient.of(API.GetStudyRecord)

/** 공부 내용 생성하기 */
export const createStudyRecord = APIClient.of(API.CreateStudyRecord)

/** 공부 내용 수정하기 */
export const updateStudyRecord = APIClient.of(API.UpdateStudyRecord)

/** 공부 내용 삭제하기 */
export const deleteStudyRecord = APIClient.of(API.DeleteStudyRecord)

/** 댓글 가져오기 */
export const getComments = APIClient.of(API.GetComments)

/** 댓글 생성하기 */
export const createComment = APIClient.of(API.CreateComment)

/** 댓글 삭제하기 */
export const deleteComment = APIClient.of(API.DeleteComment)

/** 좋아요 달기 */
export const createLike = APIClient.of(API.CreateLike)

/** 좋아요 취소 */
export const deleteLike = APIClient.of(API.DeleteLike)
