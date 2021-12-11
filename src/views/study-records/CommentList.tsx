import { useQuery } from 'react-query'
import { api } from '../../api'
import { CommentList } from '../../components/comments/CommentList'
import { Loading } from '../../components/common'
import { COMMENT, STUDY_RECORD } from '../../consts/queryKey'
import { queryClient } from '../../query/queryClient'

export const CommentListView = ({
  studyRecordId,
}: {
  studyRecordId: number
}) => {
  const { data: comments } = useQuery([COMMENT, studyRecordId], () =>
    api.studyRecords.getComments(studyRecordId)
  )

  const deleteComment = async (commentId: number) => {
    await api.studyRecords.deleteComment(studyRecordId, commentId)
    queryClient.invalidateQueries([COMMENT, studyRecordId])
    queryClient.invalidateQueries([STUDY_RECORD, studyRecordId])
  }

  if (!comments) return <Loading />

  return <CommentList comments={comments} onDelete={deleteComment} />
}
