import styled from 'styled-components'
import { StudyGoalList } from '../../components/study-times/StudyGoalList'
import { observer } from 'mobx-react-lite'
import { store } from '../../store'
import { AddStudyGoalCard } from '../../components/study-times/AddStudyGoalCard'
import { useEffect } from 'react'

const Section = styled.section`
  margin-top: 2rem;
`

export const StudyGoalListView = observer(() => {
  useEffect(() => {
    store.studyTimeStore.init()
  }, [])

  useEffect(() => {
    return () => {
      store.studyTimeStore.stopStudy()
    }
  }, [])

  return (
    <Section>
      <StudyGoalList studyGoals={store.studyTimeStore.studyGoalAndTimes} />
      <AddStudyGoalCard />
    </Section>
  )
})
