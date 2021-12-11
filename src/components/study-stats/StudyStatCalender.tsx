import { Calendar, Tooltip } from 'antd'
import dayjs from 'dayjs'
import _ from 'lodash'
import { useMemo } from 'react'
import styled from 'styled-components'
import { StudyTime } from '../../api/study-times/entity'
import { DATE_FORMAT, ONE_HOUR } from '../../utils/date/formatSchedule'

const StudyStatCalenderDiv = styled.div``

const MAX_HOURS = 8

const scaleColor = (duration: number) => {
  if (!duration) return 'white'

  const max = 45
  const hours = duration / ONE_HOUR
  const density = hours / MAX_HOURS
  const scale = 100 - Math.min(density * max, max)

  return `hsl(209, 100%, ${scale}%)`
}

export const StudyStatCalender = ({
  studyTimes,
}: {
  studyTimes: StudyTime[]
}) => {
  const month = useMemo(() => dayjs().startOf('month'), [])
  const data = useMemo(
    () =>
      _.chain(studyTimes)
        .filter((time) => dayjs(time.createdAt).isAfter(month))
        .groupBy((time) => dayjs(time.createdAt).format(DATE_FORMAT))
        .mapValues((times) => times.reduce((acc, v) => acc + v.duration, 0))
        .value(),
    [studyTimes, month]
  )

  return (
    <StudyStatCalenderDiv className="card pa-3 h-100">
      <Calendar
        mode="month"
        fullscreen={false}
        headerRender={({ value }) => (
          <div className="md title mb-2 ml-2">
            {value.year()}년 {value.month() + 1}월
          </div>
        )}
        dateFullCellRender={(value) => {
          const duration = data[value.format(DATE_FORMAT)]
          if (!duration)
            return (
              <div className="center" style={{ height: '4rem' }}>
                {value.date()}
              </div>
            )

          return (
            <Tooltip title={`${Math.round(duration / ONE_HOUR)}시간`}>
              <div
                className="center"
                style={{
                  height: '4rem',
                  backgroundColor: scaleColor(duration),
                }}
              >
                {value.date()}
              </div>
            </Tooltip>
          )
        }}
      />
      <div className="flex">
        <div>0시간</div>
        <div
          style={{
            flexGrow: 1,
            borderRadius: '4px',
            background: `linear-gradient(to right,  hsl(209, 100%, 100%),  hsl(209, 100%, 55%))`,
          }}
          className="ml-2 mr-2"
        >
          &#8203;
        </div>
        <div>{MAX_HOURS}시간</div>
      </div>
    </StudyStatCalenderDiv>
  )
}
