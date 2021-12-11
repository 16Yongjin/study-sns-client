import { useState } from 'react'
import { Alert, Card } from 'antd'
import { Form } from 'formik-antd'
import { Button, Typography } from 'antd'
import { Formik } from 'formik'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { api } from '../../api'
import { InputField } from '../../components/form/InputField'
import * as Yup from 'yup'

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

const ErrorAlert = ({ message }: { message: string }) =>
  message ? (
    <Alert message="Error" description={message} type="error" showIcon />
  ) : null

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, 'Too Short')
    .max(50, 'Too Long')
    .required('입력해주세요'),
  password: Yup.string()
    .min(6, 'Too Short')
    .max(100, 'Too Long')
    .required('입력해주세요'),
  fullname: Yup.string()
    .min(2, 'Too Short!')
    .max(100, 'Too Long!')
    .required('입력해주세요'),
  email: Yup.string().email('Enter valid email').required('입력해주세요'),
})

export const Signup = () => {
  const history = useHistory()
  const [errorMsg, setErrorMsg] = useState('')

  return (
    <Section className="section">
      <div className="container">
        <div className="header">
          <Title level={2}>회원가입</Title>
          <Paragraph>
            또는 <Link to="/login">로그인</Link>
          </Paragraph>
        </div>
        <Card>
          <ErrorAlert message={errorMsg} />

          <Formik
            validationSchema={SignupSchema}
            initialValues={{
              username: '',
              email: '',
              fullname: '',
              password: '',
              language: '',
            }}
            onSubmit={async (values, { setErrors }) => {
              setErrorMsg('')

              try {
                await api.auth.signup(values)
                history.push('/login?afterSignup=1')
              } catch (e: any) {
                setErrorMsg(e.response.data.message)
                setErrors(e.response.data.errors)
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
                  name="fullname"
                  placeholder="이름"
                  label="이름"
                  type="text"
                  required
                />
                <InputField
                  name="email"
                  placeholder="이메일"
                  label="이메일"
                  type="email"
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
                  회원가입
                </Button>
              </Form>
            )}
          </Formik>
        </Card>
      </div>
    </Section>
  )
}
