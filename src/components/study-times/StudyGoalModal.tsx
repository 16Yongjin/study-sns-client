import { Button, Modal } from 'antd'
import { Formik } from 'formik'
import { useRef } from 'react'
import { StudyGoal } from '../../api/study-goals/entity'
import { store } from '../../store'
import { Form } from 'formik-antd'
import { InputField } from '../form/InputField'

export const StudyGoalModal = ({
  show,
  onClose,
  studyGoal,
}: {
  show: boolean
  onClose: () => void
  studyGoal?: StudyGoal
}) => {
  const submitButton = useRef<HTMLButtonElement>(null)
  const submit = () => submitButton.current?.click()

  return (
    <Modal
      centered
      title={studyGoal ? '목표 수정' : '목표 추가'}
      visible={show}
      onOk={submit}
      onCancel={() => onClose()}
    >
      <Formik
        enableReinitialize
        initialValues={studyGoal ?? { name: '' }}
        onSubmit={async (values, { setErrors, resetForm }) => {
          console.log(values)
          try {
            if (studyGoal)
              await store.studyTimeStore.updateStudyGoal(studyGoal.id, values)
            else await store.studyTimeStore.createStudyGoal(values)

            onClose()
            resetForm()
          } catch (e: any) {
            setErrors(e.response.data?.errors)
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form layout="vertical">
            <InputField
              name="name"
              placeholder="목표 입력"
              label="목표"
              type="name"
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

            {studyGoal && (
              <Button
                onClick={async () => {
                  try {
                    // eslint-disable-next-line no-restricted-globals
                    if (confirm('삭제하시겠습니까?'))
                      await store.studyTimeStore.deleteStudyGoal(studyGoal.id)
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
