'use client'

import { Comment } from '@/shared/types/commentTypes'
import CommentItem from './CommentItem'

interface CommentListProps {
  comments: Comment[]
  onReply: (content: string, parentCommentId: number) => Promise<void>
  onEdit: (commentId: number, content: string) => Promise<void>
  onDelete: (commentId: number) => Promise<void>
  isPending?: {
    reply?: boolean
    edit?: boolean
    delete?: boolean
  }
}

export default function CommentList({
  comments,
  onReply,
  onEdit,
  onDelete,
  isPending = { reply: false, edit: false, delete: false },
}: CommentListProps) {
  if (comments.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-grey60">아직 댓글이 없습니다. 첫 번째 댓글을 작성해보세요!</div>
    )
  }

  return (
    <div className="space-y-9">
      {comments.map((comment) => (
        <div key={comment.id}>
          <CommentItem comment={comment} onReply={onReply} onEdit={onEdit} onDelete={onDelete} disabled={isPending} />
        </div>
      ))}
    </div>
  )
}
