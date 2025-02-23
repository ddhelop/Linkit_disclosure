// 채팅방 생성

type ChatLocationType = 'RECEIVED' | 'REQUESTED'
type ReceiverType = 'PROFILE' | 'TEAM' | 'ANNOUNCEMENT' | undefined
type SenderType = 'PROFILE' | 'TEAM' | undefined

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
  unreadChatMessageCount: number
  chatPartnerOnline: boolean
}

export interface ChatMessage {
  messageId: string
  messageSenderLogoImagePath: string
  chatRoomId: number
  messageSenderType: 'TEAM' | 'PROFILE'
  messageSenderId: string
  content: string
  timestamp: string
  read: boolean
  isMyMessage: boolean
}

export interface ChatBasicProfileProps {
  chatPartnerName: string
  chatPartnerImageUrl: string
  majorPosition: string
  cityName: string
  divisionName: string
  chatPartnerOnline: boolean
  teamScale: string
  teamCityName: string
  teamDivisionName: string
  emailId: string
  teamCode: string
}

export interface ChatMessagesResponse {
  totalElements: number
  totalPages: number
  hasNext: boolean
  chatPartnerInformation: {
    chatPartnerName: string
    chatPartnerImageUrl: string
    chatPartnerOnline: boolean
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
  }
  messages: ChatMessage[]
}
