import styled from 'styled-components'
import { store } from '../../store'
import { observer } from 'mobx-react-lite'
import { formatTimer } from '../../utils/date/formatSchedule'

const Section = styled.section`
  line-height: 1;
  margin: 1rem;
`

export const StudyTimeSumView = observer(() => {
  return (
    <Section>
      <h1 className="lg title mb-0">오늘 공부한 시간</h1>
      <h2 className="lg time">
        {formatTimer(store.studyTimeStore.totalStudyTime)}
      </h2>
    </Section>
  )
})
