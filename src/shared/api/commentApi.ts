import { fetchWithCSR } from './fetchData'
import {
  CommentResponse,
  CommentTargetType,
  CreateCommentRequest,
  CreateCommentResponse,
  DeleteCommentResponse,
} from '../types/commentTypes'

/**
 * 댓글 목록을 가져옵니다.
 */
export const getComments = async (
  targetId: number,
  targetType: CommentTargetType,
  size = 10,
): Promise<CommentResponse> => {
  const endpoints = {
    PROFILE_LOG: `/profile/log/${targetId}/comments?size=${size}`,
    TEAM_LOG: `/team/log/${targetId}/comments?size=${size}`,
  }

  return fetchWithCSR<CommentResponse>(endpoints[targetType], {
    method: 'GET',
  })
}

/**
 * 새 댓글을 작성합니다.
 */
export const createComment = async (
  targetId: number,
  targetType: CommentTargetType,
  request: CreateCommentRequest,
): Promise<CreateCommentResponse> => {
  const endpoints = {
    PROFILE_LOG: `/profile/log/${targetId}/comment`,
    TEAM_LOG: `/team/log/${targetId}/comment`,
  }

  return fetchWithCSR<CreateCommentResponse>(endpoints[targetType], {
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
export const updateComment = async (
  commentId: number,
  targetType: CommentTargetType,
  content: string,
): Promise<CreateCommentResponse> => {
  const endpoints = {
    PROFILE_LOG: `/profile/log/comment/${commentId}`,
    TEAM_LOG: `/team/log/comment/${commentId}`,
  }

  return fetchWithCSR<CreateCommentResponse>(endpoints[targetType], {
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
export const deleteComment = async (
  commentId: number,
  targetType: CommentTargetType,
): Promise<DeleteCommentResponse> => {
  const endpoints = {
    PROFILE_LOG: `/profile/log/comment/${commentId}/delete`,
    TEAM_LOG: `/team/log/comment/${commentId}/delete`,
  }

  return fetchWithCSR<DeleteCommentResponse>(endpoints[targetType], {
    method: 'POST',
  })
}

/**
 * 댓글에 좋아요를 토글합니다.
 */
export const toggleCommentLike = async (commentId: number): Promise<{ isSuccess: boolean; isLiked: boolean }> => {
  return fetchWithCSR<{ isSuccess: boolean; isLiked: boolean }>(`/comments/${commentId}/like`, { method: 'POST' })
}
