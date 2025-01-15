import { fetchWithAuth } from '@/shared/lib/api/fetchWithAuth'

type ChatLocationType = 'RECEIVED' | 'REQUESTED'
type ReceiverType = 'PROFILE' | 'TEAM' | 'ANNOUNCEMENT'
type SenderType = 'PROFILE' | 'TEAM'

interface CreateChatRoomRequest {
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

export const createChatRoom = async (requestData: CreateChatRoomRequest) => {
  const response = await fetchWithAuth('/api/v1/chat/room', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  })

  if (!response.ok) {
    throw new Error('Failed to create chat room')
  }

  return response.json()
}
