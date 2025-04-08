export interface ProfileLogDetailType {
  profileLogId: number
  isLogPublic: boolean
  logType: 'REPRESENTATIVE_LOG' | 'GENERAL_LOG'
  modifiedAt: string
  createdAt: string
  logTitle: string
  logContent: string
  logViewCount: number
  commentCount: number
}
