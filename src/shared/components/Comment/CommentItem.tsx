'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Comment } from '@/shared/types/commentTypes'
import { useDateFormat } from '@/shared/hooks/useDateFormat'
import CommentInput from './CommentInput'
import { useRouter } from 'next/navigation'

interface CommentItemProps {
  comment: Comment
  onReply: (content: string, parentCommentId: number) => Promise<void>
  onEdit: (commentId: number, content: string) => Promise<void>
  onDelete: (commentId: number) => Promise<void>
  isReply?: boolean
  disabled?: {
    reply?: boolean
    edit?: boolean
    delete?: boolean
  }
}

export default function CommentItem({
  comment,
  onReply,
  onEdit,
  onDelete,
  isReply = false,
  disabled = { reply: false, edit: false, delete: false },
}: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isReplying, setIsReplying] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const optionsRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { formatToKorean } = useDateFormat()

  // 드롭다운 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
        setShowOptions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleEditSubmit = async (content: string) => {
    await onEdit(comment.id, content)
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
  }

  const handleReplySubmit = async (content: string) => {
    await onReply(content, comment.id)
    setIsReplying(false)
  }

  const handleCancelReply = () => {
    setIsReplying(false)
  }

  const handleDelete = async () => {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      await onDelete(comment.id)
    }
  }

  const hasReplies = comment.replies && comment.replies.length > 0

  const navigateToProfile = () => {
    if (comment.emailId) {
      router.push(`/${comment.emailId}`)
    }
  }

  return (
    <div className="relative">
      {/* 세로선 - 댓글부터 마지막 답글까지 연결 */}
      {!isReply && (isReplying || hasReplies) && (
        <>
          <div
            className="absolute left-[16px] top-[32px] z-0 w-[1px] bg-grey30"
            style={{
              height: `calc(100% - 32px)`,
            }}
          ></div>
          {/* 수직선 하단 라운드 처리 */}
          <div className="absolute bottom-0 left-[13.5px] z-0 h-[5px] w-[5px] rounded-full bg-grey30"></div>
        </>
      )}

      <div className="flex items-start gap-3">
        {/* 프로필 이미지 */}
        <div className="relative flex-shrink-0">
          <div className="h-8 w-8 cursor-pointer overflow-hidden rounded-lg bg-grey10" onClick={navigateToProfile}>
            <Image
              src={comment.authorProfileImagePath || '/common/default_profile.svg'}
              alt={`${comment.authorName}의 프로필`}
              width={32}
              height={32}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* 댓글 내용 영역 - 고정된 너비로 설정 */}
        <div className="min-w-0 flex-1 pr-10">
          <div className="flex items-center gap-2">
            <span
              className="cursor-pointer text-sm font-semibold text-grey90 hover:underline"
              onClick={navigateToProfile}
            >
              {comment.authorName}
            </span>
            <span className="text-xs text-grey50">{formatToKorean(comment.createdAt)}</span>
            {comment.isUpdated && <span className="text-xs text-grey50">(수정됨)</span>}
          </div>

          {isEditing ? (
            <CommentInput
              initialValue={comment.content}
              onSubmit={handleEditSubmit}
              onCancel={handleCancelEdit}
              submitLabel="수정"
              disabled={disabled.edit}
            />
          ) : (
            <p className="mt-2 whitespace-pre-wrap rounded-lg bg-grey10 p-3 text-sm text-grey80">{comment.content}</p>
          )}

          {/* 답글 달기 버튼 */}
          {!isReply && !isEditing && (
            <div className="mt-2 flex justify-end">
              <button
                disabled={disabled.reply}
                onClick={() => setIsReplying(!isReplying)}
                className="flex items-center gap-1 rounded-full px-[0.62rem] py-1 hover:bg-grey10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Image src="/common/icons/icn_chat.svg" alt="답글 달기" width={16} height={16} />
                <span className="text-xs text-main">답글 달기</span>
              </button>
            </div>
          )}
        </div>

        {/* 옵션 버튼 - 삭제된 댓글이 아니고 작성자인 경우에만 표시 (절대 위치로 설정) */}
        {!comment.isDeleted && comment.isAuthor && (
          <div className="absolute right-0 top-0" ref={optionsRef}>
            <button
              onClick={() => setShowOptions(!showOptions)}
              className="flex h-8 w-8  items-center justify-center rounded-full text-grey50 hover:bg-grey10 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={disabled.edit || disabled.delete}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <circle cx="8" cy="3" r="1.5" />
                <circle cx="8" cy="8" r="1.5" />
                <circle cx="8" cy="13" r="1.5" />
              </svg>
            </button>

            {showOptions && (
              <div className="absolute right-0 top-8 z-10 min-w-[120px] rounded-lg border border-grey20 bg-white py-1 shadow-md">
                <button
                  onClick={() => {
                    setIsEditing(true)
                    setShowOptions(false)
                  }}
                  className="flex w-full items-center px-4 py-2 text-sm text-grey70 hover:bg-grey10 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={disabled.edit}
                >
                  수정하기
                </button>
                <button
                  onClick={() => {
                    handleDelete()
                    setShowOptions(false)
                  }}
                  className="flex w-full items-center px-4 py-2 text-sm text-red-500 hover:bg-grey10 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={disabled.delete}
                >
                  삭제하기
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 대댓글 컨테이너 */}
      {(isReplying || hasReplies) && (
        <div className="relative mt-4">
          {/* 답글 입력 영역 */}
          {isReplying && (
            <div className="mb-4">
              <div className="pl-[44px]">
                <CommentInput
                  onSubmit={handleReplySubmit}
                  onCancel={handleCancelReply}
                  placeholder="답글을 입력하세요"
                  submitLabel="답글 달기"
                  disabled={disabled.reply}
                />
              </div>
            </div>
          )}

          {/* 답글 목록 */}
          {hasReplies && comment.replies && (
            <div className="space-y-9">
              {comment.replies.map((reply) => (
                <div key={reply.id} className="pl-[44px]">
                  <CommentItem
                    comment={reply}
                    onReply={onReply}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    isReply={true}
                    disabled={disabled}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
