'use client'

import ChattingRoom from '@/features/chat/components/ChattingRoom'

export default function ChatPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex w-full">
      <ChattingRoom chatRoomId={Number(params.id)} />
    </div>
  )
}
