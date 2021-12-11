import { useState } from 'react'
import { Alert, Card } from 'antd'
import { Form } from 'formik-antd'
import { Button, Typography } from 'antd'
import { Formik } from 'formik'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { InputField } from '../../components/form/InputField'
import { useQueryParam } from '../../utils/router/useQueryParams'
import { APIError } from '../../api/interfaces/apiError'

const { Title, Paragraph } = Typography

const Section = styled.section`
  max-width: 400px;
  margin: 0 auto;
  margin-top: 1rem;

  .header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }
`
const SignupSuccessAlert = ({ show }: { show: boolean }) =>
  show ? (
    <Alert
      style={{ margin: '1rem 0' }}
      message="회원가입 성공"
      description="회원가입에 성공했습니다. 로그인 해주세요."
      type="success"
    />
  ) : null

const ErrorAlert = ({ message }: { message: string }) =>
  message ? (
    <Alert message="Error" description={message} type="error" showIcon />
  ) : null

export const Login = ({
  title,
  login,
  signupUrl,
}: {
  title: string
  login: Function
  signupUrl: string
}) => {
  const history = useHistory()
  const queryParam = useQueryParam()
  const [errorMsg, setErrorMsg] = useState('')

  const next = queryParam.get('next')
  const afterSignup = !!queryParam.get('afterSignup')

  return (
    <Section className="section">
      <div className="container">
        <div className="header">
          <Title level={2}>{title}</Title>
          <Paragraph>
            또는 <Link to={signupUrl}>회원가입</Link>
          </Paragraph>
        </div>
        <SignupSuccessAlert show={afterSignup} />

        <Card>
          <ErrorAlert message={errorMsg} />

          <Formik
            initialValues={{ username: '', password: '' }}
            onSubmit={async (values, { setErrors }) => {
              setErrorMsg('')

              try {
                await login(values)
                if (next) {
                  history.push(next)
                } else {
                  history.push('/')
                }
              } catch (e: unknown) {
                setErrorMsg((e as APIError).message)
                setErrors((e as APIError).errors)
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form layout="vertical">
                <InputField
                  name="username"
                  placeholder="아이디"
                  label="아이디"
                  type="text"
                  required
                />
                <InputField
                  name="password"
                  placeholder="비밀번호"
                  label="비밀번호"
                  type="password"
                  required
                />

                <Button htmlType="submit" type="primary" loading={isSubmitting}>
                  Login
                </Button>
              </Form>
            )}
          </Formik>
        </Card>
      </div>
    </Section>
  )
}
