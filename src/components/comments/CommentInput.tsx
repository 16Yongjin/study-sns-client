import { Button } from 'antd'
import { Formik } from 'formik'
import { Form } from 'formik-antd'
import styled from 'styled-components'
import { TextAreaField } from '../form/InputField'

export const CommentInputContainer = styled.div`
  position: relative;
  margin-bottom: 1rem;

  display: flex;
  flex-direction: column;

  .textarea {
    padding: 1rem;
    resize: none;
  }

  .right {
    display: flex;
    justify-content: right;
  }
`

export const CommentInput = ({ onSubmit }: { onSubmit: Function }) => {
  const scrollToComment = (commentId: string) =>
    setTimeout(() => {
      document.getElementById(`comment-${commentId}`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      })
    })

  return (
    <CommentInputContainer>
      <Formik
        initialValues={{ content: '' }}
        onSubmit={async (values, { setErrors, resetForm }) => {
          console.log(values)
          try {
            const comment = await onSubmit(values)
            scrollToComment(comment.id)
            resetForm()
          } catch (e: any) {
            setErrors(e.errors)
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form layout="vertical">
            <TextAreaField
              className="textarea"
              name="content"
              placeholder="댓글을 작성하세요"
              type="name"
              rows={3}
              required
            />

            <div className="right">
              <Button htmlType="submit" type="primary" loading={isSubmitting}>
                댓글 작성
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </CommentInputContainer>
  )
}
