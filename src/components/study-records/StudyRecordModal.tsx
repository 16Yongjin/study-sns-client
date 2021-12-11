import { Button, Modal } from 'antd'
import { Formik } from 'formik'
import { useRef } from 'react'
import { StudyRecord } from '../../api/study-records/entity'
import { Form } from 'formik-antd'
import { TextAreaField } from '../form/InputField'
import { api } from '../../api'
import { store } from '../../store'

export const StudyRecordModal = ({
  show,
  onClose,
  studyTimeId,
  studyRecord,
  studyGoalName,
}: {
  show: boolean
  onClose: () => void
  studyGoalName?: string
  studyTimeId?: number
  studyRecord?: StudyRecord
}) => {
  const submitButton = useRef<HTMLButtonElement>(null)
  const submit = () => submitButton.current?.click()

  return (
    <Modal
      centered
      title={
        studyRecord
          ? '내용 수정'
          : `${studyGoalName ? studyGoalName + ' ' : ''}공부 내용 작성`
      }
      visible={show}
      onOk={submit}
      onCancel={() => onClose()}
    >
      <Formik
        enableReinitialize
        initialValues={studyRecord ?? { content: '' }}
        onSubmit={async (values, { setErrors, resetForm }) => {
          console.log(values)
          try {
            if (studyRecord)
              // 공부 내용 수정
              await api.studyRecords.updateStudyRecord(studyRecord.id, values)
            else if (studyTimeId) {
              // 공부 내용 생성
              await api.studyRecords.createStudyRecord({
                studyTimeId,
                ...values,
              })
              await store.studyTimeStore.loadStudyTimes()
            }

            onClose()
            resetForm()
          } catch (e: any) {
            setErrors(e.response.data?.errors)
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form layout="vertical">
            <TextAreaField
              name="content"
              placeholder="공부 내용 입력"
              label="공부 내용"
              type="name"
              rows={4}
              required
            />

            <Button
              style={{ display: 'none' }}
              ref={submitButton}
              htmlType="submit"
              type="primary"
              loading={isSubmitting}
            >
              Submit
            </Button>

            {studyRecord && (
              <Button
                onClick={async () => {
                  try {
                    // eslint-disable-next-line no-restricted-globals
                    if (confirm('삭제하시겠습니까?'))
                      await api.studyRecords.deleteStudyRecord(studyRecord.id)
                    onClose()
                  } catch (e) {
                    console.log(e)
                  }
                }}
                type="primary"
                danger
              >
                삭제
              </Button>
            )}
          </Form>
        )}
      </Formik>
    </Modal>
  )
}
