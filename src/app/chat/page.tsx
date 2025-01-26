'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import ChattingList from '@/features/chat/components/ChattingList'
import ChattingRoom from '@/features/chat/components/ChattingRoom'

export default function ChatPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const chatRoomId = searchParams.get('room') ? Number(searchParams.get('room')) : undefined

  const handleSelectChat = (selectedChatRoomId: number) => {
    router.push(`/chat?room=${selectedChatRoomId}`)
  }

  return (
    <div className="flex justify-center gap-[2.12rem] pt-[3.63rem]">
      <ChattingList onSelectChat={handleSelectChat} />
      <ChattingRoom chatRoomId={chatRoomId} />
    </div>
  )
}
