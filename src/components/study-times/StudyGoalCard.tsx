import { observer } from 'mobx-react-lite'
import {
  CheckOutlined,
  FormOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons'
import { store } from '../../store'
import { StudyGoal } from '../../api/study-goals/entity'
import { formatTimer } from '../../utils/date/formatSchedule'
import { useState } from 'react'
import { StudyGoalModal } from './StudyGoalModal'
import styled from 'styled-components'
import { Tooltip } from 'antd'
import { StudyRecordModal } from '../study-records/StudyRecordModal'
import { useHistory } from 'react-router'

export const StudyGoalCardContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  margin: 1rem;
  border-radius: 0.2rem;
  border: 1px solid rgba(0, 0, 0, 0.1);

  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2);
  font-size: 1.75rem;

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }

  &.playing {
    background-color: #e6f7fe;
  }

  .action {
    position: absolute;
    font-size: 0.75rem;
    top: 1rem;
    right: 1rem;
  }
`

export const StudyGoalCard = observer(
  ({ studyGoal }: { studyGoal: StudyGoal }) => {
    // 공부 목표 모달
    const [goalModal, setGoalModal] = useState(false)
    const closeStudyGoalModal = () => setGoalModal(false)
    const openStudyGoalModal = () => setGoalModal(true)

    // 공부 내용 모달
    const [recordModal, setRecordModal] = useState(false)
    const closeStudyRecordModal = () => setRecordModal(false)
    const openStudyRecordModal = () => setRecordModal(true)

    const isPlaying =
      store.studyTimeStore.currentStudyTime &&
      store.studyTimeStore.currentStudyTime.id === studyGoal.studyTime?.id

    const startStudy = () =>
      store.studyTimeStore.startStudy(studyGoal.id, studyGoal.studyTime?.id)
    const stopStudy = () => store.studyTimeStore.stopStudy()
    const duration = studyGoal.studyTime?.duration || 0

    const recordCompleted = !!studyGoal.studyTime?.studyRecord
    const canRecord = !!studyGoal.studyTime
    const studyRecordId = studyGoal.studyTime?.studyRecord?.id || ''

    const history = useHistory()
    const goToStudyRecord = () =>
      studyRecordId && history.push(`/study-records/${studyRecordId}`)

    return (
      <>
        <StudyGoalCardContainer className={`${isPlaying ? 'playing' : ''}`}>
          {isPlaying ? (
            <PauseCircleOutlined onClick={stopStudy} />
          ) : (
            <PlayCircleOutlined onClick={startStudy} />
          )}
          <div className="name" onClick={openStudyGoalModal}>
            {studyGoal.name}
          </div>
          <div className="divider">&#8203;</div>
          <div>{formatTimer(duration)}</div>
          <div className="action">
            {recordCompleted && (
              <Tooltip title="기록 완료">
                <CheckOutlined
                  style={{ color: '#1890ff' }}
                  onClick={goToStudyRecord}
                />
              </Tooltip>
            )}

            {canRecord && !recordCompleted && (
              <Tooltip title="기록">
                <FormOutlined
                  className="click"
                  onClick={openStudyRecordModal}
                />
              </Tooltip>
            )}
          </div>
        </StudyGoalCardContainer>
        <StudyGoalModal
          show={goalModal}
          onClose={closeStudyGoalModal}
          studyGoal={studyGoal}
        />
        {studyGoal.studyTime && (
          <StudyRecordModal
            show={recordModal}
            onClose={closeStudyRecordModal}
            studyTimeId={studyGoal.studyTime.id}
            studyGoalName={studyGoal.name}
          />
        )}
      </>
    )
  }
)
