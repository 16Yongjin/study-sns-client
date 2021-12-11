import styled from 'styled-components'
import { StudyRecordListView } from './StudyRecordList'

const Section = styled.section`
  padding: 1rem;
`

export const StudyRecordDashboard = () => {
  return (
    <Section>
      <StudyRecordListView />
    </Section>
  )
}
