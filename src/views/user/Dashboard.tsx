import styled from 'styled-components'
import { Switch, Route } from 'react-router-dom'
import { MyPage } from './MyPage'
import { StudyTimeDashboard } from '../study-times'
import { StudyRecordDashboard, StudyRecordDetailView } from '../study-records'
import { StudyStatDashboard } from '../study-stats'

const Section = styled.section`
  position: relative;
  min-height: 100%;
`

export const Dashboard = () => {
  return (
    <Switch>
      <Section>
        <Route exact path="/">
          <StudyTimeDashboard />
        </Route>

        <Route exact path="/study-times">
          <StudyTimeDashboard />
        </Route>

        <Route exact path="/study-stats">
          <StudyStatDashboard />
        </Route>

        <Route exact path="/study-records">
          <StudyRecordDashboard />
        </Route>

        <Route exact path="/study-records/:id">
          <StudyRecordDetailView />
        </Route>

        <Route exact path="/my">
          <MyPage />
        </Route>

        <Route exact path="/appointments">
          {/* <AppointmentsSection />/ */}
        </Route>
      </Section>
    </Switch>
  )
}
