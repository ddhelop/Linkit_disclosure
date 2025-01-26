'use client'

import { useEffect, useState } from 'react'
import ChattingListComponent from './ChattingListComponent'
import { getChattingList } from '../api/ChatApi'

import { useChatStore } from '../store/useChatStore'

export default function ChattingList({ onSelectChat }: { onSelectChat: (chatRoomId: number) => void }) {
  const { chatList, updateChatList } = useChatStore()
  const [selectedChatId, setSelectedChatId] = useState<number>()

  useEffect(() => {
    const fetchChattingList = async () => {
      const response = await getChattingList()
      updateChatList(response.result.chatRoomSummaries)
    }
    fetchChattingList()
  }, [])

  return (
    <div className="flex min-h-[calc(100vh-10rem)] w-[22.5rem] flex-col gap-3 rounded-2xl border border-grey30 bg-white p-4">
      {chatList.map((chatting) => (
        <ChattingListComponent
          chattingList={chatting}
          key={chatting.chatRoomId}
          isSelected={selectedChatId === chatting.chatRoomId}
          onClick={() => {
            setSelectedChatId(chatting.chatRoomId)
            onSelectChat(chatting.chatRoomId)
          }}
        />
      ))}
    </div>
  )
}
