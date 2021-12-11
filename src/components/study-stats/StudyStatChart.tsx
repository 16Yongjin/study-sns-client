import dayjs from 'dayjs'
import _ from 'lodash'
import { useMemo } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { StudyTime } from '../../api/study-times/entity'
import { stringToHslColor } from '../../utils/color/stringToColor'
import {
  DATE_FORMAT,
  daysKR,
  ONE_MINUTE,
} from '../../utils/date/formatSchedule'

export const StudyStatChart = ({ studyTimes }: { studyTimes: StudyTime[] }) => {
  const aWeekAgo = dayjs().startOf('day').subtract(6, 'days')

  const weeklystudyTime = useMemo(
    () => studyTimes.filter((time) => dayjs(time.createdAt).isAfter(aWeekAgo)),
    [studyTimes, aWeekAgo]
  )

  const dailyStudyTimeMap = _.chain(weeklystudyTime)
    .groupBy((v) => dayjs(v.createdAt).format(DATE_FORMAT))
    .mapValues((times) =>
      _.mapValues(
        _.groupBy(times, (time) => time.studyGoal?.name || '기타'),
        (times) =>
          Math.round(times.reduce((acc, v) => acc + v.duration, 0) / ONE_MINUTE)
      )
    )
    .mapValues((times) => times)
    .value()

  const studyGoals = useMemo(
    () => _.uniq(weeklystudyTime.map((time) => time.studyGoal?.name || '기타')),
    [weeklystudyTime]
  )

  const days = useMemo(
    () => _.range(7).map((v) => aWeekAgo.add(v, 'days')),
    [aWeekAgo]
  )

  const data = days.map((day) => ({
    ...(dailyStudyTimeMap[day.format(DATE_FORMAT)] || {}),
    name: daysKR[day.day()],
  }))

  return (
    <div style={{ height: '556px' }} className="card">
      <h3 className="abs md title" style={{ top: '1rem', left: '2rem' }}>
        주간 통계 (분)
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ right: 32, top: 96, bottom: 32 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {studyGoals.map((studyGoal) => (
            <Bar
              dataKey={studyGoal}
              stackId="a"
              fill={stringToHslColor(studyGoal, 70, 80)}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
