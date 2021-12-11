import { Col, Row } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import { useMemo } from 'react'
import { StudyTime } from '../../api/study-times/entity'
import { StudyStatCard } from './StudyStatCard'

export const StudyStatSummary = ({
  studyTimes,
}: {
  studyTimes: StudyTime[]
}) => {
  const today = useMemo(() => dayjs().startOf('day'), [])
  const week = useMemo(() => dayjs().subtract(1, 'week'), [])
  const month = useMemo(() => dayjs().subtract(1, 'month'), [])

  const calcDuration = (studyTimes: StudyTime[], after: Dayjs) =>
    studyTimes
      .filter((time) => dayjs(time.createdAt).isAfter(after))
      .reduce((acc, v) => acc + v.duration, 0)

  const dailyDuration = useMemo(
    () => calcDuration(studyTimes, today),
    [studyTimes, today]
  )

  const weeklyDuration = useMemo(
    () => calcDuration(studyTimes, week),
    [studyTimes, week]
  )

  const monthlyDuration = useMemo(
    () => calcDuration(studyTimes, month),
    [studyTimes, month]
  )

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={8}>
        <StudyStatCard title="오늘" value={dailyDuration} />
      </Col>
      <Col xs={12} md={8}>
        <StudyStatCard title="주간" value={weeklyDuration} />
      </Col>
      <Col xs={12} md={8}>
        <StudyStatCard title="월간" value={monthlyDuration} />
      </Col>
    </Row>
  )
}
