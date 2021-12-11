import React from 'react'
import { useIsAuth } from '../../utils/auth/useIsAuth'
import { Button, notification } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { InputField } from '../../components/form/InputField'
import { Form } from 'formik-antd'

const PasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Too Short')
    .max(100, 'Too Long')
    .required('Required'),
})

export const ChangePasswordModal = ({
  username,
  show,
  changePassword,
  onClose,
}: {
  username: string
  show: boolean
  changePassword: Function
  onClose: Function
}) => {
  useIsAuth()

  return (
    <Modal
      title="Change Password"
      visible={show}
      onCancel={() => onClose()}
      footer={null}
    >
      <Formik
        validationSchema={PasswordSchema}
        initialValues={{
          username,
          password: '',
        }}
        onSubmit={async (values, { setErrors, resetForm }) => {
          try {
            await changePassword(values)
            onClose(true)
            resetForm()
            notification.success({
              message: 'Changed password successfully',
              duration: 5,
            })
          } catch (e: any) {
            setErrors(e.response.data.errors)
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form layout="vertical">
            <InputField
              name="password"
              placeholder="password"
              label="Password"
              type="password"
              required
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button htmlType="submit" type="primary" loading={isSubmitting}>
                Change
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}
