type NotificationType =
  | 'MATCHING'
  | 'CHATTING'
  | 'TEAM_INVITATION'
  | 'TEAM'
  | 'SYSTEM'
  | 'ANNOUNCEMENT'
  | 'CERTIFICATION'
  | 'VISITOR'
type SubNotificationType =
  | 'MATCHING_REQUESTED'
  | 'MATCHING_ACCEPTED'
  | 'MATCHING_REJECTED'
  | 'NEW_CHAT'
  | 'TEAM_INVITATION_REQUESTED'
  | 'TEAM_MEMBER_JOINED'
  | 'REMOVE_TEAM_REQUESTED'
  | 'REMOVE_TEAM_REJECTED'
  | 'REMOVE_TEAM_COMPLETED'
  | 'COMPLETE_PROFILE'
  | 'WELCOME_LINKIT'
  | 'ETC'
  | 'ANNOUNCEMENT_REQUESTED'
  | 'ANNOUNCEMENT_ACCEPTED'
  | 'ANNOUNCEMENT_REJECTED'
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

interface NotificationDetails {
  matchingTargetName?: string
  chatSenderName?: string
  teamName?: string
  teamMemberName?: string
  itemType?: 'ACTIVITY' | 'EDUCATION' | 'AWARD' | 'LICENSE'
  visitorCount?: number
  visitedType?: 'PROFILE' | 'TEAM'
}

export const getNotificationMessage = (
  type: NotificationType,
  subType: SubNotificationType,
  details: NotificationDetails,
): string => {
  switch (type) {
    case 'MATCHING':
      switch (subType) {
        case 'MATCHING_REQUESTED':
          return `${details.matchingTargetName}님이 매칭을 요청했습니다.`
        case 'MATCHING_ACCEPTED':
          return `${details.matchingTargetName}님과 매칭 성사!`
        case 'MATCHING_REJECTED':
          return `${details.matchingTargetName}님이 매칭을 거절했습니다.`
        default:
          return '알 수 없는 매칭 알림입니다.'
      }

    case 'CHATTING':
      if (subType === 'NEW_CHAT') {
        return `${details.chatSenderName}님이 메시지를 보냈습니다.`
      }
      return '알 수 없는 채팅 알림입니다.'

    case 'TEAM_INVITATION':
      switch (subType) {
        case 'TEAM_INVITATION_REQUESTED':
          return `${details.teamName} 팀에서 초대했습니다.`
        case 'TEAM_MEMBER_JOINED':
          return `${details.teamMemberName}님이 ${details.teamName} 팀에 합류했습니다.`
        default:
          return '알 수 없는 팀 초대 알림입니다.'
      }

    case 'ANNOUNCEMENT':
      switch (subType) {
        case 'ANNOUNCEMENT_REQUESTED':
          return `${details.matchingTargetName}님의 공고 지원.`
        case 'ANNOUNCEMENT_ACCEPTED':
          return `${details.matchingTargetName}님의 공고 지원 수락!`
        case 'ANNOUNCEMENT_REJECTED':
          return `${details.matchingTargetName}님의 공고 지원 거절`
        default:
          return '알 수 없는 공고 알림입니다.'
      }

    case 'TEAM':
      switch (subType) {
        case 'REMOVE_TEAM_REQUESTED':
          return `${details.teamMemberName}님이 ${details.teamName} 팀 삭제를 요청했습니다.`
        case 'REMOVE_TEAM_REJECTED':
          return `${details.teamMemberName}님의 ${details.teamName} 팀 삭제가 거절되었습니다.`
        case 'REMOVE_TEAM_COMPLETED':
          return `${details.teamName} 팀 삭제가 완료되었습니다.`
        default:
          return '알 수 없는 팀 알림입니다.'
      }

    case 'SYSTEM':
      switch (subType) {
        case 'WELCOME_LINKIT':
          return '프로필을 완성하러 가볼까요?'
        case 'COMPLETE_PROFILE':
          return '프로필을 완성하여 기능을 활성화하세요!'
        case 'ETC':
          return '시스템 알림이 있습니다.'
        default:
          return '알 수 없는 시스템 알림입니다.'
      }

    case 'CERTIFICATION':
      switch (subType) {
        case 'ACTIVITY_CERTIFICATION_ACCEPTED':
          return '이력 인증 완료!'
        case 'ACTIVITY_CERTIFICATION_REJECTED':
          return '이력 인증 거절되었습니다.'
        case 'EDUCATION_CERTIFICATION_ACCEPTED':
          return '학력 인증 완료!'
        case 'EDUCATION_CERTIFICATION_REJECTED':
          return '학력 인증이 거절되었습니다.'
        case 'AWARDS_CERTIFICATION_ACCEPTED':
          return '수상 인증 완료!'
        case 'AWARDS_CERTIFICATION_REJECTED':
          return '수상 인증이 거절되었습니다.'
        case 'LICENSE_CERTIFICATION_ACCEPTED':
          return '자격증 인증 완료!'
        case 'LICENSE_CERTIFICATION_REJECTED':
          return '자격증 인증이 거절되었습니다.'
        default:
          return '알 수 없는 인증 알림입니다.'
      }

    case 'VISITOR':
      switch (subType) {
        case 'PROFILE_VISITOR':
          return `${details.visitorCount}명이 내 프로필을 조회했어요! 확인하러가볼까요?`
        case 'TEAM_VISITOR':
          return `${details.visitorCount}명이 ${details.teamName}을 조회했어요! 확인하러가볼까요?`
        default:
          return '알 수 없는 방문자 알림입니다.'
      }

    default:
      return '알 수 없는 알림입니다.'
  }
}
