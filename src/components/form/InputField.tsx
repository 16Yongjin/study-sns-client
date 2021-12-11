import React, { InputHTMLAttributes } from 'react'
import { Form, Input } from 'antd'
import { useField } from 'formik'

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  name: string
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  size: _,
  ...props
}) => {
  const [field, { error }] = useField(props)
  return (
    <Form.Item label={label} validateStatus={error ? 'error' : ''} help={error}>
      <Input {...field} {...props} id={field.name} />
    </Form.Item>
  )
}

type TextAreaFieldProps = InputHTMLAttributes<HTMLTextAreaElement> & {
  label?: string
  name: string
  rows: number
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  size: _,
  ...props
}) => {
  const [field, { error }] = useField(props)
  return (
    <Form.Item label={label} validateStatus={error ? 'error' : ''} help={error}>
      <Input.TextArea {...field} {...props} id={field.name} />
    </Form.Item>
  )
}
