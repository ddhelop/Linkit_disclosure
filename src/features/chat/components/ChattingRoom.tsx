'use client'

import { useEffect, useState } from 'react'
import { ChatMessage, ChatBasicProfileProps } from '../types/ChatTypes'
import { getChatMessages } from '../api/ChatApi'
import ChattingBasicProfile from './ChattingBasicProfile'
import ChattingInput from './ChattingInput'
import SendFromMessage from './SendFromMessage'
import SendToMessage from './SendToMessage'
import { useChatStore } from '../store/useChatStore'

interface ChattingRoomProps {
  chatRoomId?: number
}

export default function ChattingRoom({ chatRoomId }: ChattingRoomProps) {
  const { messages, setMessages } = useChatStore()
  const [chatPartnerData, setChatPartnerData] = useState()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!chatRoomId) return

    const initializeChat = async () => {
      try {
        setIsLoading(true)
        const response = await getChatMessages(chatRoomId)
        setMessages(chatRoomId, response.result.messages)
        setChatPartnerData(response.result.chatPartnerInformation)
      } catch (error) {
        console.error('Failed to initialize chat:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeChat()
  }, [chatRoomId, setMessages])

  const handleSendMessage = (content: string) => {
    if (!chatRoomId) return
    // 웹소켓을 통해 메시지를 전송만 하고,
    // 실제 메시지는 웹소켓 응답으로 받아서 표시
  }

  const getProfileData = (data: any): ChatBasicProfileProps => ({
    chatPartnerName: data.chatPartnerName,
    chatPartnerImageUrl: data.chatPartnerImageUrl,
    majorPosition: data.partnerProfileDetailInformation.profilePositionDetail.majorPosition,
    cityName: data.partnerProfileDetailInformation.regionDetail.cityName,
    divisionName: data.partnerProfileDetailInformation.regionDetail.divisionName,
    chatPartnerOnline: data.chatPartnerOnline,
  })

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-10rem)] w-[48rem] items-center justify-center rounded-2xl border border-grey30 bg-white">
        로딩 중...
      </div>
    )
  }

  if (!chatRoomId) {
    return (
      <div className="flex min-h-[calc(100vh-10rem)] w-[48rem] items-center justify-center rounded-2xl border border-grey30 bg-white text-grey60">
        대화 내역이 없어요
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100vh-10rem)] w-[48rem] flex-col rounded-2xl border border-grey30 bg-grey10">
      <div className="flex-shrink-0 border-b border-grey30 px-5 py-6">
        {chatPartnerData && <ChattingBasicProfile {...getProfileData(chatPartnerData)} chatRoomId={chatRoomId} />}
      </div>

      <div className="flex flex-1 flex-col overflow-hidden px-5">
        <div className="sticky top-0 z-10 my-6 flex items-center bg-grey10 py-2">
          <div className="h-[1px] flex-1 bg-grey50"></div>
          <span className="mx-4 text-sm text-grey60">2025년 01월 01일</span>
          <div className="h-[1px] flex-1 bg-grey50"></div>
        </div>

        <div className="flex flex-1 flex-col-reverse gap-6 overflow-y-auto">
          {messages[chatRoomId]?.map((message) =>
            message.isMyMessage ? (
              <SendToMessage key={message.messageId} message={message} />
            ) : (
              <SendFromMessage key={message.messageId} message={message} />
            ),
          )}
        </div>
      </div>

      <div className="flex-shrink-0 border-t border-grey30 p-4">
        <ChattingInput onMessageSent={handleSendMessage} />
      </div>
    </div>
  )
}
