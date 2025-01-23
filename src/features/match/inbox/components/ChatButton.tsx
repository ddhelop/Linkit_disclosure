'use client'

import { usePathname, useRouter } from 'next/navigation'
import { createChatRoom } from '@/features/chat/api/ChatApi'
import Image from 'next/image'
import { useToast } from '@/shared/hooks/useToast'

interface ChatButtonProps {
  matchingId: number
  senderType: 'PROFILE' | 'TEAM'
  senderInfo: {
    emailId?: string
    teamCode?: string
  }
  receiverType: 'PROFILE' | 'TEAM' | 'ANNOUNCEMENT'
  receiverInfo: {
    emailId?: string
    teamCode?: string
    announcementId?: number
  }
  isChatRoomCreated?: boolean
  chatRoomId?: number
}

export default function ChatButton({
  matchingId,
  senderType,
  senderInfo,
  receiverType,
  receiverInfo,
  isChatRoomCreated,
  chatRoomId,
}: ChatButtonProps) {
  const router = useRouter()
  const pathname = usePathname()
  const toast = useToast()

  const handleCreateChatRoom = async () => {
    if (isChatRoomCreated) {
      router.push(`/chat/${chatRoomId}`)
      return
    }

    try {
      console.log('Creating chat room with data:', {
        matchingId,
        senderType,
        senderInfo,
        receiverType,
        receiverInfo,
      })

      const requestData = {
        matchingId,
        createChatLocation: pathname.includes('/match/inbox') ? ('RECEIVED' as const) : ('REQUESTED' as const),
        senderType,
        ...(senderType === 'PROFILE' ? { senderEmailId: senderInfo.emailId } : { senderTeamCode: senderInfo.teamCode }),
        receiverType,
        ...(receiverType === 'ANNOUNCEMENT'
          ? { receiverAnnouncementId: receiverInfo.announcementId }
          : receiverType === 'PROFILE'
            ? { receiverEmailId: receiverInfo.emailId }
            : { receiverTeamCode: receiverInfo.teamCode }),
      }

      const response = await createChatRoom(requestData)

      router.push(`/chat/${response.result.chatRoomId}`)
    } catch (error) {
      console.error('Detailed error:', error)
      if (error instanceof Error) {
        toast.alert(`채팅방 생성 실패: ${error.message}`)
      } else {
        toast.alert('채팅방 생성에 실패했습니다. 다시 시도해주세요.')
      }
    }
  }

  return (
    <div className="absolute right-[-124px] top-10 flex">
      <button
        onClick={handleCreateChatRoom}
        className=" flex items-center gap-2 rounded-full bg-[#3774F4] px-4 py-2 text-sm text-white hover:bg-blue-600"
      >
        <Image src="/common/icons/chat.svg" alt="chat" width={16} height={16} />
        채팅하기
      </button>
    </div>
  )
}
