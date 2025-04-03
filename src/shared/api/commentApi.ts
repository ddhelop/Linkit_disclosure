import { fetchWithCSR } from './fetchData'
import {
  CommentResponse,
  CreateCommentRequest,
  CreateCommentResponse,
  DeleteCommentResponse,
} from '../types/commentTypes'

/**
 * 특정 프로필 로그의 댓글 목록을 가져옵니다.
 */
export const getComments = async (profileLogId: number, size = 10): Promise<CommentResponse> => {
  return fetchWithCSR<CommentResponse>(`/profile/log/${profileLogId}/comments?size=${size}`, {
    method: 'GET',
  })
}

/**
 * 새 댓글을 작성합니다.
 */
export const createComment = async (
  profileLogId: number,
  request: CreateCommentRequest,
): Promise<CreateCommentResponse> => {
  return fetchWithCSR<CreateCommentResponse>(`/profile/log/${profileLogId}/comment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })
}

/**
 * 댓글을 수정합니다.
 */
export const updateComment = async (commentId: number, content: string): Promise<CreateCommentResponse> => {
  return fetchWithCSR<CreateCommentResponse>(`/profile/log/comment/${commentId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  })
}

/**
 * 댓글을 삭제합니다.
 */
export const deleteComment = async (commentId: number): Promise<DeleteCommentResponse> => {
  return fetchWithCSR<DeleteCommentResponse>(`/profile/log/comment/${commentId}/delete`, {
    method: 'POST',
  })
}

/**
 * 댓글에 좋아요를 토글합니다.
 */
export const toggleCommentLike = async (commentId: number): Promise<{ isSuccess: boolean; isLiked: boolean }> => {
  return fetchWithCSR<{ isSuccess: boolean; isLiked: boolean }>(`/comments/${commentId}/like`, { method: 'POST' })
}
