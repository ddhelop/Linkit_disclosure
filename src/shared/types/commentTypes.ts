export type CommentTargetType = 'PROFILE_LOG' | 'TEAM_POST' | 'TEAM_RECRUITMENT'

export interface Comment {
  id: number
  authorProfileImagePath?: string
  authorName: string
  emailId: string
  createdAt: string
  content: string
  isUpdated: boolean
  isDeleted: boolean
  isQuitAccount: boolean
  isAuthor: boolean
  replies?: Comment[]
}

export interface CommentResponse {
  isSuccess: boolean
  code: string
  message: string
  result: {
    content: Comment[]
    nextCursor: string
    hasNext: boolean
  }
}

export interface CreateCommentRequest {
  content: string
  parentCommentId?: number | null
}

export interface CreateCommentResponse {
  isSuccess: boolean
  code: string
  message: string
  result: {
    commentId: number
    profileLogId: number
    authorName: string
    authorProfileImagePath?: string
    emailId: string
    content: string
    createdAt: string
    isParentComment: boolean
    parentCommentId: number | null
  }
}

export interface DeleteCommentResponse {
  isSuccess: boolean
  code: string
  message: string
  result: {
    commentId: number
    profileLogId: number
  }
}
