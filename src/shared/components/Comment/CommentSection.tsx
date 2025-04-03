'use client'

import { useState, useEffect } from 'react'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { useToast } from '@/shared/hooks/useToast'
import { createComment, deleteComment, getComments, updateComment } from '@/shared/api/commentApi'
import { Comment, CommentResponse, CommentTargetType } from '@/shared/types/commentTypes'
import CommentInput from './CommentInput'
import CommentList from './CommentList'

interface CommentSectionProps {
  targetId: number
  targetType: CommentTargetType
  onCommentCountChange?: (count: number) => void
}

export default function CommentSection({ targetId, targetType, onCommentCountChange }: CommentSectionProps) {
  const [hasMore, setHasMore] = useState(true)
  const pageSize = 10
  const toast = useToast()
  const queryClient = useQueryClient()
  const queryKey = ['comments', targetId, targetType]

  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: () => getComments(targetId, targetType, pageSize),
    staleTime: 30 * 1000, // 30초간 캐시 유지
  })

  // 댓글 생성 mutation
  const createCommentMutation = useMutation({
    mutationFn: ({ content, parentCommentId }: { content: string; parentCommentId?: number | null }) =>
      createComment(targetId, targetType, { content, parentCommentId }),
    onSuccess: (data) => {
      if (data.isSuccess) {
        queryClient.invalidateQueries({ queryKey })
        toast.success('댓글이 등록되었습니다.')
      } else {
        toast.alert('댓글 등록에 실패했습니다.')
      }
    },
    onError: () => {
      toast.alert('댓글 등록에 실패했습니다.')
    },
  })

  // 댓글 수정 mutation
  const updateCommentMutation = useMutation({
    mutationFn: ({ commentId, content }: { commentId: number; content: string }) =>
      updateComment(commentId, targetType, content),
    onSuccess: (data) => {
      if (data.isSuccess) {
        queryClient.invalidateQueries({ queryKey })
        toast.success('댓글이 수정되었습니다.')
      } else {
        toast.alert('댓글 수정에 실패했습니다.')
      }
    },
    onError: () => {
      toast.alert('댓글 수정에 실패했습니다.')
    },
  })

  // 댓글 삭제 mutation
  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: number) => deleteComment(commentId, targetType),
    onSuccess: (data) => {
      if (data.isSuccess) {
        queryClient.invalidateQueries({ queryKey })
        toast.success('댓글이 삭제되었습니다.')
      } else {
        toast.alert('댓글 삭제에 실패했습니다.')
      }
    },
    onError: () => {
      toast.alert('댓글 삭제에 실패했습니다.')
    },
  })

  const handleSubmitComment = async (content: string) => {
    try {
      const response = await createComment(targetId, targetType, { content })

      if (response.isSuccess) {
        // 새 댓글 생성 후 캐시 직접 업데이트
        queryClient.setQueryData(queryKey, (oldData: any) => {
          if (!oldData) {
            // 이전 데이터가 없을 경우 새로운 데이터 구조 생성
            return {
              isSuccess: true,
              code: '1000',
              message: '요청에 성공하였습니다.',
              result: {
                content: [
                  {
                    id: response.result.commentId,
                    authorName: response.result.authorName,
                    authorProfileImagePath: response.result.authorProfileImagePath,
                    emailId: response.result.emailId,
                    content: response.result.content,
                    createdAt: response.result.createdAt,
                    isUpdated: false,
                    isDeleted: false,
                    isQuitAccount: false,
                    isAuthor: true,
                    replies: [],
                  },
                ],
                nextCursor: '',
                hasNext: false,
              },
            }
          }

          // 기존 댓글 목록에 새 댓글 추가
          return {
            ...oldData,
            result: {
              ...oldData.result,
              content: [
                {
                  id: response.result.commentId,
                  authorName: response.result.authorName,
                  authorProfileImagePath: response.result.authorProfileImagePath,
                  emailId: response.result.emailId,
                  content: response.result.content,
                  createdAt: response.result.createdAt,
                  isUpdated: false,
                  isDeleted: false,
                  isQuitAccount: false,
                  isAuthor: true,
                  replies: [],
                },
                ...oldData.result.content,
              ],
            },
          }
        })

        // 백그라운드에서 쿼리 갱신
        queryClient.invalidateQueries({ queryKey })
        toast.success('댓글이 등록되었습니다.')
      } else {
        toast.alert('댓글 등록에 실패했습니다.')
      }
    } catch (error) {
      toast.alert('댓글 등록에 실패했습니다.')
      console.error(error)
    }
  }

  const handleSubmitReply = async (content: string, parentCommentId: number) => {
    try {
      const response = await createComment(targetId, targetType, { content, parentCommentId })

      if (response.isSuccess) {
        // 답글 생성 후 캐시 직접 업데이트
        queryClient.setQueryData(queryKey, (oldData: any) => {
          if (!oldData?.result?.content) return oldData

          // 부모 댓글을 찾아서 답글 추가
          const updatedComments = oldData.result.content.map((comment: Comment) => {
            if (comment.id === parentCommentId) {
              // 기존 답글이 없으면 빈 배열 생성
              const replies = comment.replies || []

              return {
                ...comment,
                replies: [
                  ...replies,
                  {
                    id: response.result.commentId,
                    authorName: response.result.authorName,
                    authorProfileImagePath: response.result.authorProfileImagePath,
                    emailId: response.result.emailId,
                    content: response.result.content,
                    createdAt: response.result.createdAt,
                    isUpdated: false,
                    isDeleted: false,
                    isQuitAccount: false,
                    isAuthor: true,
                  },
                ],
              }
            }
            return comment
          })

          return {
            ...oldData,
            result: {
              ...oldData.result,
              content: updatedComments,
            },
          }
        })

        // 백그라운드에서 쿼리 갱신
        queryClient.invalidateQueries({ queryKey })
        toast.success('답글이 등록되었습니다.')
      } else {
        toast.alert('답글 등록에 실패했습니다.')
      }
    } catch (error) {
      toast.alert('답글 등록에 실패했습니다.')
      console.error(error)
    }
  }

  const handleEditComment = async (commentId: number, content: string) => {
    try {
      const response = await updateComment(commentId, targetType, content)

      if (response.isSuccess) {
        // 즉시 UI 업데이트를 위해 기존 쿼리 데이터 업데이트
        queryClient.setQueryData(queryKey, (oldData: any) => {
          if (!oldData?.result?.content) return oldData

          // 댓글 업데이트 함수
          const updateCommentInList = (comments: Comment[]) => {
            return comments.map((comment) => {
              // 수정된 댓글 찾기
              if (comment.id === commentId) {
                return { ...comment, content, isUpdated: true }
              }

              // 답글 내에서 찾기
              if (comment.replies && comment.replies.length > 0) {
                return {
                  ...comment,
                  replies: comment.replies.map((reply) =>
                    reply.id === commentId ? { ...reply, content, isUpdated: true } : reply,
                  ),
                }
              }

              return comment
            })
          }

          return {
            ...oldData,
            result: {
              ...oldData.result,
              content: updateCommentInList(oldData.result.content),
            },
          }
        })

        // 백그라운드에서 쿼리를 무효화하여 최신 데이터로 업데이트
        queryClient.invalidateQueries({ queryKey })
        toast.success('댓글이 수정되었습니다.')
      } else {
        toast.alert('댓글 수정에 실패했습니다.')
      }
    } catch (error) {
      toast.alert('댓글 수정에 실패했습니다.')
      console.error(error)
    }
  }

  const handleDeleteComment = async (commentId: number) => {
    try {
      await deleteComment(commentId, targetType)
      // 즉시 쿼리 무효화 및 다시 가져오기
      queryClient.invalidateQueries({ queryKey })
      toast.success('댓글이 삭제되었습니다.')
    } catch (error) {
      toast.alert('댓글 삭제에 실패했습니다.')
      console.error(error)
    }
  }

  const comments = data?.result?.content || []
  const hasNext = data?.result?.hasNext || false
  const commentCount = comments.reduce((total, comment) => total + 1 + (comment.replies?.length || 0), 0)

  // 댓글 수가 변경되면 콜백 호출
  useEffect(() => {
    onCommentCountChange?.(commentCount)
  }, [commentCount, onCommentCountChange])

  // 더 보기 버튼 클릭 처리
  const handleLoadMore = async () => {
    if (hasNext) {
      try {
        const nextCursor = data?.result?.nextCursor
        const nextPage = await getComments(targetId, targetType, pageSize)

        if (nextPage.isSuccess) {
          const newComments = [...comments, ...nextPage.result.content]
          queryClient.setQueryData(queryKey, {
            ...data,
            result: {
              ...nextPage.result,
              content: newComments,
            },
          })
          setHasMore(nextPage.result.hasNext)
        }
      } catch (error) {
        console.error('Failed to load more comments:', error)
        toast.alert('댓글을 더 불러오는데 실패했습니다.')
      }
    }
  }

  return (
    <div className="flex w-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-grey80">댓글 {commentCount}</h3>
      </div>

      <CommentInput
        onSubmit={handleSubmitComment}
        placeholder="댓글을 입력하세요"
        disabled={createCommentMutation.isPending}
      />

      <div className="mt-6">
        {isLoading && <div className="py-4 text-center text-grey60">댓글을 불러오는 중...</div>}

        {error && <div className="py-4 text-center text-red-500">댓글을 불러오는데 실패했습니다.</div>}

        {!isLoading && !error && (
          <>
            <CommentList
              comments={comments}
              onReply={handleSubmitReply}
              onEdit={handleEditComment}
              onDelete={handleDeleteComment}
              isPending={{
                reply: createCommentMutation.isPending,
                edit: updateCommentMutation.isPending,
                delete: deleteCommentMutation.isPending,
              }}
            />

            {hasNext && (
              <div className="mt-6 text-center">
                <button
                  onClick={handleLoadMore}
                  className="rounded-lg border border-grey30 px-4 py-2 text-sm font-medium text-grey60 hover:bg-grey10"
                >
                  더 보기
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
