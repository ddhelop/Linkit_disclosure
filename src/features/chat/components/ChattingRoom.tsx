'use client'

import { useEffect, useState } from 'react'
import { ChatMessage } from '../types/ChatTypes'
import { getChatMessages } from '../api/ChatApi'
import ChattingBasicProfile from './ChattingBasicProfile'
import ChattingInput from './ChattingInput'
import SendFromMessage from './SendFromMessage'
import SendToMessage from './SendToMessage'

interface ChattingRoomProps {
  chatRoomId?: number
}

export default function ChattingRoom({ chatRoomId }: ChattingRoomProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!chatRoomId) return

    const fetchMessages = async () => {
      try {
        setIsLoading(true)
        const response = await getChatMessages(chatRoomId)
        setMessages(response.result.messages)
      } catch (error) {
        console.error('Failed to fetch messages:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMessages()
  }, [chatRoomId])

  if (!chatRoomId) {
    return (
      <div className="flex min-h-[calc(100vh-10rem)] w-[48rem] items-center justify-center rounded-2xl border border-grey30 bg-white text-grey60">
        대화 내역이 없어요
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-10rem)] w-[48rem] items-center justify-center rounded-2xl border border-grey30 bg-grey10">
        로딩 중...
      </div>
    )
  }

  return (
    <div className="flex min-h-[calc(100vh-10rem)] w-[48rem] flex-col rounded-2xl border border-grey30 bg-grey10">
      <div className="flex-shrink-0 border-b border-grey30 px-5 py-6">
        <ChattingBasicProfile />
      </div>

      {/* 메시지 영역 */}
      <div className="flex flex-1 flex-col justify-end overflow-y-auto px-5">
        {/* 날짜 구분선 */}
        <div className="sticky top-0 my-6 flex items-center bg-grey10 py-2">
          <div className="h-[1px] flex-1 bg-grey50"></div>
          <span className="mx-4 text-sm text-grey60">2025년 01월 01일</span>
          <div className="h-[1px] flex-1 bg-grey50"></div>
        </div>

        {/* 채팅 내용 */}
        <div className="flex flex-col-reverse gap-6">
          {messages.map((message) =>
            message.messageSenderType === 'PROFILE' ? (
              <SendFromMessage key={message.messageId} message={message} />
            ) : (
              <SendToMessage key={message.messageId} message={message} />
            ),
          )}
        </div>
      </div>

      {/* 채팅입력창 */}
      <div className="flex-shrink-0 border-t border-grey30 p-4">
        <ChattingInput />
      </div>
    </div>
  )
}
