export interface NotificationDetails {
  teamName?: string
  teamMemberName?: string
  chatSenderName?: string
  matchingTargetName?: string
  matchingTargetLogoImagePath?: string
  teamLogoImagePath?: string
  teamCode: string
  isTeamDeleted?: boolean
  itemId?: number
  itemType?: 'ACTIVITY' | 'EDUCATION' | 'AWARD' | 'LICENSE'
  emailId?: string
  visitorCount?: number
  visitedType?: 'PROFILE' | 'TEAM'
}

export interface NotificationItem {
  notificationType: 'TEAM_INVITATION' | 'CHATTING' | 'MATCHING' | 'TEAM' | 'SYSTEM' | 'CERTIFICATION' | 'VISITOR'
  subNotificationType:
    | 'TEAM_INVITATION_REQUESTED'
    | 'TEAM_MEMBER_JOINED'
    | 'NEW_CHAT'
    | 'MATCHING_REQUESTED'
    | 'MATCHING_ACCEPTED'
    | 'MATCHING_REJECTED'
    | 'REMOVE_TEAM_REQUESTED'
    | 'REMOVE_TEAM_REJECTED'
    | 'REMOVE_TEAM_COMPLETED'
    | 'WELCOME_LINKIT'
    | 'COMPLETE_PROFILE'
    //
    | 'ACTIVITY_CERTIFICATION_ACCEPTED'
    | 'ACTIVITY_CERTIFICATION_REJECTED'
    | 'EDUCATION_CERTIFICATION_ACCEPTED'
    | 'EDUCATION_CERTIFICATION_REJECTED'
    | 'AWARDS_CERTIFICATION_ACCEPTED'
    | 'AWARDS_CERTIFICATION_REJECTED'
    | 'LICENSE_CERTIFICATION_ACCEPTED'
    | 'LICENSE_CERTIFICATION_REJECTED'
    | 'PROFILE_VISITOR'
    | 'TEAM_VISITOR'
    | 'ETC'
  notificationReadStatus: 'READ' | 'UNREAD'
  notificationOccurTime: string
  notificationDetails: NotificationDetails
  notificationId: string
}

export interface Notifications {
  notificationItems: NotificationItem[]
}
