import { Col, Row } from 'antd'
import { useQuery } from 'react-query'
import styled from 'styled-components'
import { api } from '../../api'
import { APIError } from '../../api/interfaces/apiError'
import { LoadingView } from '../../components/common'
import {
  StudyStatCalender,
  StudyStatChart,
  StudyStatSummary,
} from '../../components/study-stats'

const Section = styled.section`
  max-width: 1024px;
  margin: 0 auto;
  padding: 2rem;
`

export const StudyStatDashboard = () => {
  const { data: studyTimes, error } = useQuery(
    'my-study-times',
    api.studyTimes.getStudyTimes
  )

  if (error) return <div>{(error as APIError).message}</div>

  if (!studyTimes) return <LoadingView />

  return (
    <Section>
      <h1 className="lg title">공부 통계</h1>

      <StudyStatSummary studyTimes={studyTimes} />

      <Row gutter={[30, 30]} className="mt-8">
        <Col xs={24} md={12}>
          <StudyStatChart studyTimes={studyTimes} />
        </Col>
        <Col xs={24} md={12}>
          <StudyStatCalender studyTimes={studyTimes} />
        </Col>
      </Row>
    </Section>
  )
}
