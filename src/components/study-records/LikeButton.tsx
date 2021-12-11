import { LikeFilled } from '@ant-design/icons'
import { Tooltip } from 'antd'
import { useState } from 'react'
import styled from 'styled-components'
import { api } from '../../api'
import { StudyRecord } from '../../api/study-records/entity'
import { STUDY_RECORD } from '../../consts/queryKey'
import { queryClient } from '../../query/queryClient'
import { Loading } from '../common'

export const LikeContainer = styled.div`
  display: flex;
  cursor: pointer;
`

export const LikeButton = ({ studyRecord }: { studyRecord: StudyRecord }) => {
  const [loading, setLoading] = useState(false)

  const afterLike = () =>
    queryClient.invalidateQueries([STUDY_RECORD, studyRecord.id])

  const like = async () => {
    setLoading(true)
    await api.studyRecords.createLike(studyRecord.id).catch(console.log)
    afterLike()
    setLoading(false)
  }
  const unlike = async () => {
    setLoading(true)

    await api.studyRecords.deleteLike(studyRecord.id).catch(console.log)
    afterLike()
    setLoading(false)
  }
  const toggleLike = () => (studyRecord.liked ? unlike() : like())

  return (
    <Tooltip title={studyRecord.liked ? '좋아요 취소' : '좋아요'}>
      <LikeContainer onClick={toggleLike}>
        {loading && <Loading />}
        <span className="ml-4 mr-2">
          <LikeFilled className={studyRecord.liked ? 'primary' : ''} />
        </span>
        <span>{studyRecord.likeCount}</span>
      </LikeContainer>
    </Tooltip>
  )
}
