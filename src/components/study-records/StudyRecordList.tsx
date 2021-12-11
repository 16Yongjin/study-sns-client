import { Col, Row } from 'antd'
import { StudyRecord } from '../../api/study-records/entity'
import { StudyRecordCard } from './StudyRecordCard'

export const StudyRecordList = ({
  studyRecords,
}: {
  studyRecords: StudyRecord[]
}) => {
  return (
    <Row>
      {studyRecords.map((studyRecord) => (
        <Col key={studyRecord.id} xs={24} sm={24} md={12} lg={8} xxl={6}>
          <StudyRecordCard key={studyRecord.id} studyRecord={studyRecord} />
        </Col>
      ))}
    </Row>
  )
}
