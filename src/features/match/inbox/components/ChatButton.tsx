'use client'

import { usePathname, useRouter } from 'next/navigation'
import { createChatRoom } from '@/features/chat/api/ChatApi'
import Image from 'next/image'
import { useToast } from '@/shared/hooks/useToast'

interface ChatButtonProps {
  matchingId: number
  senderType: 'PROFILE' | 'TEAM' | undefined
  senderInfo: {
    emailId?: string
    teamCode?: string
  }
  receiverType: 'PROFILE' | 'TEAM' | 'ANNOUNCEMENT' | undefined
  receiverInfo: {
    emailId?: string
    teamCode?: string
    announcementId?: number
  }
  isChatRoomCreated?: boolean
  chatRoomId?: number
  receiverAnnouncementId?: number
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
      router.push(`/chat?room=${chatRoomId}`)
      return
    }
  }

  return (
    <div className="absolute right-4 top-[4.8rem] flex">
      <button
        onClick={handleCreateChatRoom}
        className=" flex items-center gap-2 rounded-full bg-[#3774F4] px-4 py-2 text-sm text-white hover:bg-blue-600"
      >
        <Image src="/common/icons/chat.svg" alt="chat" width={16} height={16} />
      </button>
    </div>
  )
}
