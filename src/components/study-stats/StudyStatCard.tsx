import styled from 'styled-components'
import { formatTimer } from '../../utils/date/formatSchedule'

export const StudyStatCardContainer = styled.div``

export const StudyStatCard = ({
  title,
  value,
}: {
  title: string
  value: number
}) => {
  return (
    <div className="card center pa-4">
      <div className="flex-col">
        <div className="md text">{title}</div>
        <div className="md time" style={{ lineHeight: 1.2 }}>
          {formatTimer(value)}
        </div>
      </div>
    </div>
  )
}
