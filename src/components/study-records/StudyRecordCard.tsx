import { LikeFilled } from '@ant-design/icons'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import { StudyRecord } from '../../api/study-records/entity'
import { formatDate, formatTimer } from '../../utils/date/formatSchedule'

export const StudyRecordCardContainer = styled.div`
  position: relative;
  margin: 1rem;
  border-radius: 0.2rem;

  display: flex;
  flex-direction: column;

  height: 16rem;

  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }

  .header {
    display: flex;
    align-items: flex-end;
    gap: 0.5rem;
    margin: 1rem;
    margin-bottom: 0.5rem;

    .title {
      font-size: 1.5rem;
    }

    .time {
      font-size: 1.2rem;
      color: #777;
    }
  }

  .content {
    word-break: break-word;
    overflow-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;

    margin: 0 1rem;
  }

  .spacer {
    flex-grow: 1;
  }

  .info {
    display: flex;
    gap: 0.25rem;

    margin: 0.5rem 1rem;

    color: #777;
  }

  .footer {
    padding: 0.5rem 1rem;
    display: flex;
    justify-content: space-between;

    border-top: 1px solid #ddd;
  }

  .name {
    font-weight: bold;
  }
`

export const StudyRecordCard = ({
  studyRecord,
}: {
  studyRecord: StudyRecord
}) => {
  const history = useHistory()
  const goToDetail = () => history.push(`/study-records/${studyRecord.id}`)

  return (
    <StudyRecordCardContainer onClick={goToDetail}>
      <div className="header">
        <div className="title">
          {studyRecord.studyTime?.studyGoal?.name || studyRecord.studyGoal}
        </div>
        <div className="time">
          {formatTimer(studyRecord.studyTime?.duration || studyRecord.duration)}
        </div>
      </div>
      <div className="content">{studyRecord.content}</div>
      <div className="spacer"></div>
      <div className="info">
        <div className="date">{formatDate(studyRecord.createdAt)}</div>
        <div>·</div>
        <div>댓글 {studyRecord.commentCount}개</div>
      </div>
      <div className="footer">
        <div className="name">{studyRecord.user.fullname}</div>
        <div>
          <span className="mr-2">
            <LikeFilled className={studyRecord.liked ? 'primary' : ''} />
          </span>
          <span>{studyRecord.likeCount}</span>
        </div>
      </div>
    </StudyRecordCardContainer>
  )
}
