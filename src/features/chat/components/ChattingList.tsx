'use client'

import { useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import ChattingListComponent from './ChattingListComponent'
import { getChattingList } from '../api/ChatApi'
import { useChatStore } from '../store/useChatStore'
import useWebSocketStore from '@/shared/store/useWebSocketStore'
import { getAccessToken } from '@/shared/store/useAuthStore'

export default function ChattingList({ onSelectChat }: { onSelectChat: (chatRoomId: number) => void }) {
  const { chatList, updateChatList, addMessage, updateLastMessage } = useChatStore()
  const { getClient } = useWebSocketStore()
  const subscriptionsRef = useRef<{ [key: number]: any }>({})
  const searchParams = useSearchParams()
  const currentRoomId = searchParams.get('room')

  useEffect(() => {
    const client = getClient()
    if (!client) return

    const initializeChats = async () => {
      try {
        const response = await getChattingList()
        updateChatList(response.result.chatRoomSummaries)

        // 기존 구독 해제
        Object.values(subscriptionsRef.current).forEach((sub) => sub?.unsubscribe())

        // 새로운 채팅방 목록에 대한 구독 설정
        response.result.chatRoomSummaries.forEach((chatRoom: any) => {
          const accessToken = getAccessToken()
          if (client.connected) {
            // client 연결 상태 확인
            subscriptionsRef.current[chatRoom.chatRoomId] = client.subscribe(
              `/user/sub/chat/${chatRoom.chatRoomId}`,
              (message) => {
                const receivedMessage = JSON.parse(message.body)
                addMessage(chatRoom.chatRoomId, {
                  messageId: receivedMessage.messageId,
                  chatRoomId: receivedMessage.chatRoomId,
                  content: receivedMessage.content,
                  timestamp: receivedMessage.timestamp,
                  isMyMessage: receivedMessage.isMyMessage,
                  messageSenderType: receivedMessage.messageSenderParticipantType,
                  messageSenderId: '',
                  read: receivedMessage.read,
                  messageSenderLogoImagePath: receivedMessage.messageSenderLogoImagePath,
                })
                updateLastMessage(chatRoom.chatRoomId, receivedMessage.content, receivedMessage.timestamp)
              },
              {
                Authorization: `Bearer ${accessToken}`,
              },
            )
          }
        })
      } catch (error) {
        console.error('Failed to initialize chats:', error)
      }
    }

    if (!client.connected) {
      client.onConnect = () => {
        initializeChats()
      }
      client.activate()
    } else {
      initializeChats()
    }

    // 채팅방 나가기 이벤트 구독
    let leaveSubscription: any
    if (client.connected) {
      leaveSubscription = client.subscribe('/sub/chat/leave', () => {
        initializeChats() // 채팅방 목록 새로고침
      })
    }

    return () => {
      Object.values(subscriptionsRef.current).forEach((sub) => sub?.unsubscribe())
      leaveSubscription?.unsubscribe()
    }
  }, [getClient, updateChatList, addMessage, updateLastMessage])

  return (
    <div className="flex min-h-[calc(100vh-10rem)] w-[22.5rem] flex-col gap-3 rounded-2xl border border-grey30 bg-white p-4">
      {chatList.map((chatting) => (
        <ChattingListComponent
          chattingList={chatting}
          key={chatting.chatRoomId}
          onClick={() => onSelectChat(chatting.chatRoomId)}
          isSelected={currentRoomId === chatting.chatRoomId.toString()}
        />
      ))}
    </div>
  )
}
