import { useQuery } from 'react-query'
import styled from 'styled-components'
import { api } from '../../api'
import { Loading } from '../../components/common'
import { StudyRecordList } from '../../components/study-records'
const Section = styled.section``

export const StudyRecordListView = () => {
  const { data: studyRecords } = useQuery(
    'public-study-records',
    api.studyRecords.getStudyRecords
  )

  if (!studyRecords) return <Loading />

  return (
    <Section>
      <h1 className="lg title ma-4 mb-0">공부 내용</h1>
      <StudyRecordList studyRecords={studyRecords} />
    </Section>
  )
}
