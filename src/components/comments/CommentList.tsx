import { Col, Row } from 'antd'
import { Comment } from '../../api/study-records/entity'
import { CommentCard } from './CommentCard'

export const CommentList = ({
  comments,
  onDelete,
}: {
  comments: Comment[]
  onDelete: (commentId: number) => void
}) => {
  return (
    <Row>
      {comments.map((comment) => (
        <Col key={comment.id} xs={24}>
          <CommentCard key={comment.id} comment={comment} onDelete={onDelete} />
        </Col>
      ))}
    </Row>
  )
}
