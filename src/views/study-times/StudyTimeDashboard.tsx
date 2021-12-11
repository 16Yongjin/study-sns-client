import styled from 'styled-components'
import { StudyTimeSumView } from './StudyTimeSum'
import { StudyGoalListView } from './StudyGoalList'

const Section = styled.section`
  padding: 1rem;
`

export const StudyTimeDashboard = () => {
  return (
    <Section>
      <StudyTimeSumView />
      <StudyGoalListView />
    </Section>
  )
}
