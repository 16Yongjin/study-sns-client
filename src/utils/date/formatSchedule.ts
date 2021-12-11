import dayjs from 'dayjs'

export const daysKR = ['일', '월', '화', '수', '목', '금', '토']
export const ONE_HOUR = 3600
export const ONE_MINUTE = 60
export const DATE_FORMAT = 'YYYY-MM-DD'

export const formatSchedule = ({
  startTime,
  endTime,
}: {
  startTime: string
  endTime: string
}) =>
  `${dayjs(startTime).format('YYYY. MM. DD. dddd HH:mm')} ~ ${dayjs(
    endTime
  ).format('HH:mm')}`

export const formatDateWithSlash = (time: string) =>
  dayjs(time).format('YYYY/MM/DD/ddd')

export const formatDate = (time: string | Date) =>
  new Date(time).toLocaleDateString('ko-KR', {
    weekday: 'narrow',
    month: 'long',
    day: 'numeric',
  })

export const formatDateFull = (time: string | Date) =>
  new Date(time).toLocaleDateString('ko-KR', {
    weekday: 'narrow',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h24',
  })

export const formatTimeRange = ({
  startTime,
  endTime,
}: {
  startTime: string
  endTime: string
}) => `${dayjs(startTime).format('HH:mm')} ~ ${dayjs(endTime).format('HH:mm')}`

export const formatTimer = (seconds: number) => {
  const date = new Date(0)
  date.setSeconds(seconds)
  return date.toISOString().substr(11, 8)
}
