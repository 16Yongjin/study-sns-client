import React from 'react'
import { Col, Row } from 'antd'
import styled from 'styled-components'
import { useQuery } from 'react-query'
import { api } from '../../api'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'
import { APIError } from '../../api/interfaces/apiError'
import { Loading } from '../common'

const Section = styled.section`
  position: relative;
`

export const MaterialSection = ({ urlPrefix }: { urlPrefix?: string }) => {
  const { id } = useParams<{ id: string }>()
  const { data: studyRecord, error } = useQuery(`study-records/${id}`, () =>
    api.studyRecords.getStudyRecord(Number(id))
  )

  if (error) return <div>{(error as APIError).message}</div>

  if (!studyRecord) return <Loading />

  return (
    <Section className="section">
      <div className="container">
        <Row>
          <Col xs={24}>
            <Link to={`${urlPrefix || ''}/materials`}>
              <h1 className="title">Materials</h1>
            </Link>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          {/* {materials?.map((material) => (
            <Col key={material.id} xs={24} md={12} lg={8}>
              <MaterialCard material={material} urlPrefix={urlPrefix} />
            </Col>
          ))} */}
        </Row>
      </div>
    </Section>
  )
}
