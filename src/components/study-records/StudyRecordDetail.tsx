import { Popconfirm } from 'antd'
import styled from 'styled-components'
import { StudyRecord } from '../../api/study-records/entity'
import { store } from '../../store'
import { formatDateFull, formatTimer } from '../../utils/date/formatSchedule'
import { LikeButton } from './LikeButton'

export const StudyRecordDetailContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  .header {
    display: flex;
    align-items: flex-end;
    gap: 0.5rem;

    .title {
      font-size: 2.25rem;
    }

    .time {
      font-size: 2rem;
      color: #777;
    }
  }

  .content {
    margin: 1rem 0;
    word-break: break-all;
    word-wrap: break-word;
    white-space: pre-wrap;
  }

  .spacer {
    flex-grow: 1;
  }

  .info {
    display: flex;
    justify-content: space-between;
    margin: 0.5rem 0;

    color: #777;

    .left {
      gap: 0.5rem;
      display: flex;
    }
  }

  .name {
    color: black;
    font-weight: 600;
  }

  .likes {
    display: flex;
  }

  .footer {
    padding: 0.5rem 1rem;
    display: flex;
    justify-content: space-between;

    border-top: 1px solid #777;
  }
`

export const StudyRecordDetail = ({
  studyRecord,
  onDelete,
}: {
  studyRecord: StudyRecord
  onDelete: Function
}) => {
  const isMyStudyRecord = store.userStore.user?.id === studyRecord.user.id

  return (
    <StudyRecordDetailContainer>
      <div className="header">
        <div className="title">
          {studyRecord.studyTime?.studyGoal?.name || studyRecord.studyGoal}
        </div>
        <div className="time">
          {formatTimer(studyRecord.studyTime?.duration || studyRecord.duration)}
        </div>
      </div>

      <div className="info">
        <div className="left">
          <div className="name">{studyRecord.user.fullname}</div>
          <div>·</div>
          <div className="date">{formatDateFull(studyRecord.createdAt)}</div>
          {isMyStudyRecord && (
            <>
              <div>·</div>
              <Popconfirm
                placement="bottom"
                title="삭제하시겠습니까?"
                onConfirm={() => onDelete(studyRecord.id)}
                okText="네"
                cancelText="아니오"
              >
                <div className="click">삭제</div>
              </Popconfirm>
            </>
          )}
        </div>

        <LikeButton studyRecord={studyRecord} />
      </div>

      <div className="content">{studyRecord.content}</div>
    </StudyRecordDetailContainer>
  )
}
