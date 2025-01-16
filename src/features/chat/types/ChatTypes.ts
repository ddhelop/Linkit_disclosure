// 채팅방 생성

type ChatLocationType = 'RECEIVED' | 'REQUESTED'
type ReceiverType = 'PROFILE' | 'TEAM' | 'ANNOUNCEMENT'
type SenderType = 'PROFILE' | 'TEAM'

export interface CreateChatRoomRequest {
  matchingId: number
  createChatLocation: ChatLocationType
  senderType: SenderType
  senderEmailId?: string
  senderTeamCode?: string
  receiverType: ReceiverType
  receiverEmailId?: string
  receiverTeamCode?: string
  receiverAnnouncementId?: number
}

export interface ChattingListType {
  chatRoomId: number
  chatPartnerInformation: {
    chatPartnerName: string
    chatPartnerImageUrl: string
    partnerProfileDetailInformation: {
      profilePositionDetail: {
        majorPosition: string
        subPosition: string
      }
      regionDetail: {
        cityName: string
        divisionName: string
      }
    }
    partnerTeamDetailInformation: {
      teamScaleItem: {
        teamScaleName: string
      }
      regionDetail: {
        cityName: string
        divisionName: string
      }
    }
    lastMessage: string
    lastMessageTime: string
  }
  unreadCount: number | null
  online: boolean
}

export interface ChatMessage {
  messageId: string
  chatRoomId: number
  messageSenderType: 'TEAM' | 'PROFILE'
  messageSenderId: string
  content: string
  timestamp: string
  read: boolean
}

export interface ChatMessagesResponse {
  totalElements: number
  totalPages: number
  hasNext: boolean
  messages: ChatMessage[]
}
