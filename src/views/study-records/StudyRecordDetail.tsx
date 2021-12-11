import { useQuery } from 'react-query'
import { useHistory, useParams } from 'react-router'
import styled from 'styled-components'
import { api } from '../../api'
import { APIError } from '../../api/interfaces/apiError'
import { CommentInput } from '../../components/comments/CommentInput'
import { LoadingView } from '../../components/common'
import { StudyRecordDetail } from '../../components/study-records'
import { COMMENT, STUDY_RECORD } from '../../consts/queryKey'
import { queryClient } from '../../query/queryClient'
import { CommentListView } from './CommentList'

const Section = styled.section`
  margin: 0 auto;
  margin-bottom: 2rem;
  padding: 1rem;
  max-width: 48rem;
  font-size: 1rem;
`

export const StudyRecordDetailView = () => {
  const history = useHistory()
  const { id } = useParams<{ id: string }>()
  const studyRecordId = Number(id)
  const { data: studyRecord, error } = useQuery(
    [STUDY_RECORD, studyRecordId],
    () => api.studyRecords.getStudyRecord(studyRecordId)
  )

  /** 댓글 추가하기 */
  const addComment = async (data: { content: string }) => {
    const comment = await api.studyRecords.createComment(studyRecordId, data)
    queryClient.invalidateQueries([COMMENT, studyRecordId])
    queryClient.invalidateQueries([STUDY_RECORD, studyRecordId])
    return comment
  }

  const deleteStudyRecord = async (studyRecordId: number) => {
    await api.studyRecords.deleteStudyRecord(studyRecordId)
    history.replace('/study-records')
  }

  if (error) return <div>{(error as APIError).message}</div>

  if (!studyRecord) return <LoadingView />

  return (
    <Section>
      <StudyRecordDetail
        studyRecord={studyRecord}
        onDelete={deleteStudyRecord}
      />

      <h3 className="title mt-8">{studyRecord.commentCount}개의 댓글</h3>

      <CommentInput onSubmit={addComment} />

      <CommentListView studyRecordId={studyRecord.id} />
    </Section>
  )
}
