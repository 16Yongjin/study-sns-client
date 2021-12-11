import { CloseOutlined } from '@ant-design/icons'
import { Popconfirm } from 'antd'
import styled from 'styled-components'
import { Comment } from '../../api/study-records/entity'
import { store } from '../../store'
import { formatDateFull } from '../../utils/date/formatSchedule'

export const CommentCardContainer = styled.div`
  position: relative;
  margin: 1rem;

  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #ddd;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .info {
      display: flex;
      align-items: flex-end;
      gap: 0.5rem;
    }

    .name {
      font-weight: bold;
    }

    .title {
      font-size: 1.5rem;
    }

    .date {
      color: #777;
    }
  }

  .content {
    margin: 1rem 0;
    word-break: break-all;
    word-wrap: break-word;
    white-space: pre-wrap;
  }
`

export const CommentCard = ({
  comment,
  onDelete,
}: {
  comment: Comment
  onDelete: (commentId: number) => void
}) => {
  const isMyComment = store.userStore.user?.id === comment.user.id
  const deleteComment = () => onDelete(comment.id)

  return (
    <CommentCardContainer id={`comment-${comment.id}`}>
      <div className="header">
        <div className="info">
          <div className="name">{comment.user.fullname}</div>
          <div className="date">{formatDateFull(comment.createdAt)}</div>
        </div>
        {isMyComment && (
          <div className="action">
            <Popconfirm
              placement="topRight"
              title="삭제하시겠습니까?"
              onConfirm={deleteComment}
              okText="네"
              cancelText="아니오"
            >
              <CloseOutlined className="click" />
            </Popconfirm>
          </div>
        )}
      </div>
      <div className="content">{comment.content}</div>
    </CommentCardContainer>
  )
}
