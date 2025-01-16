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
      <div className="flex h-[calc(100vh-4rem)] w-[48rem] items-center justify-center text-grey60">
        대화 내역이 없어요
      </div>
    )
  }

  if (isLoading) {
    return <div>로딩 중...</div>
  }

  return (
    <div className="flex flex-col">
      <div
        className="flex w-[48rem] flex-col rounded-t-[1.25rem] bg-grey10 px-5 py-6"
        style={{ boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)' }}
      >
        <ChattingBasicProfile />

        {/* 날짜 구분선 */}
        <div className="my-6 flex items-center">
          <div className="h-[1px] flex-1 bg-grey50"></div>
          <span className="mx-4 text-sm text-grey60">2025년 01월 01일</span>
          <div className="h-[1px] flex-1 bg-grey50"></div>
        </div>

        {/* 채팅 내용 */}
        <div className="flex flex-col gap-6">
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
      <div>
        <ChattingInput />
      </div>
    </div>
  )
}
