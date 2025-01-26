'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { ChatMessage } from '../types/ChatTypes'
import { getChatMessages } from '../api/ChatApi'
import ChattingBasicProfile from './ChattingBasicProfile'
import ChattingInput from './ChattingInput'
import SendFromMessage from './SendFromMessage'
import SendToMessage from './SendToMessage'
import { useChatStore } from '../store/useChatStore'
import useWebSocketStore from '@/shared/store/useWebSocketStore'

interface ChattingRoomProps {
  chatRoomId?: number
}

export default function ChattingRoom({ chatRoomId }: ChattingRoomProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const { updateLastMessage } = useChatStore()
  const { getClient } = useWebSocketStore()
  const subscriptionRef = useRef<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  // 메시지 추가 함수
  const addMessage = useCallback((message: ChatMessage) => {
    // 유효한 메시지인지 확인
    if (!message.content?.trim()) return

    setMessages((prev) => [message, ...prev])
  }, [])

  useEffect(() => {
    if (!chatRoomId) return

    const client = getClient()
    if (!client) {
      console.log('No WebSocket client available')
      return
    }

    const initializeChat = async () => {
      try {
        setIsLoading(true)

        // 연결이 끊어진 경우 재연결 시도
        if (!client.connected) {
          await new Promise<void>((resolve) => {
            client.onConnect = () => {
              console.log('Reconnected to WebSocket')
              resolve()
            }
            client.activate()
          })
        }

        // 이전 메시지 로드
        const response = await getChatMessages(chatRoomId)
        setMessages(response.result.messages)

        // 채팅방 구독
        subscriptionRef.current = client.subscribe(`/sub/chat/${chatRoomId}`, (message) => {
          const receivedMessage = JSON.parse(message.body)
          // 받은 메시지는 항상 상대방 메시지로 처리
          const newMessage = {
            ...receivedMessage,
            isMyMessage: false,
          }
          addMessage(newMessage)
          updateLastMessage(chatRoomId, newMessage.content, new Date(newMessage.timestamp).toLocaleTimeString())
        })
      } catch (error) {
        console.error('Failed to initialize chat:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeChat()

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe()
      }
    }
  }, [chatRoomId, getClient, addMessage, updateLastMessage])

  // 메시지 전송 핸들러
  const handleSendMessage = useCallback(
    (content: string) => {
      const timestamp = new Date().toISOString()
      // UI에 즉시 내 메시지 추가
      const myMessage: ChatMessage = {
        messageId: Date.now().toString(),
        chatRoomId: Number(chatRoomId),
        content,
        timestamp,
        isMyMessage: true,
        messageSenderType: 'PROFILE',
        messageSenderId: '',
        read: false,
      }
      addMessage(myMessage)
      // Store 업데이트
      updateLastMessage(Number(chatRoomId), content, timestamp)
    },
    [chatRoomId, addMessage, updateLastMessage],
  )

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
        <ChattingBasicProfile />
      </div>

      <div className="flex flex-1 flex-col overflow-hidden px-5">
        <div className="sticky top-0 z-10 my-6 flex items-center bg-grey10 py-2">
          <div className="h-[1px] flex-1 bg-grey50"></div>
          <span className="mx-4 text-sm text-grey60">2025년 01월 01일</span>
          <div className="h-[1px] flex-1 bg-grey50"></div>
        </div>

        <div className="flex flex-1 flex-col-reverse gap-6 overflow-y-auto">
          {messages
            .filter((message) => message.content?.trim()) // 빈 메시지 필터링
            .map((message) =>
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
