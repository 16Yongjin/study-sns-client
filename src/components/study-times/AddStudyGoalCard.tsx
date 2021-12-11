import { PlusCircleOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { StudyGoalCardContainer } from './StudyGoalCard'
import { StudyGoalModal } from './StudyGoalModal'

export const AddStudyGoalCard = () => {
  const [modal, setModal] = useState(false)

  const openModal = () => setModal(true)
  const closeModal = () => setModal(false)

  return (
    <>
      <StudyGoalCardContainer className="click" onClick={openModal}>
        <div>
          <PlusCircleOutlined />
        </div>
        <div>목표 추가</div>
      </StudyGoalCardContainer>
      <StudyGoalModal show={modal} onClose={closeModal} />
    </>
  )
}
