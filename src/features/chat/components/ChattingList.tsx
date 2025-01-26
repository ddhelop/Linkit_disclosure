'use client'

import { useEffect, useRef } from 'react'
import ChattingListComponent from './ChattingListComponent'
import { getChattingList } from '../api/ChatApi'
import { useChatStore } from '../store/useChatStore'
import useWebSocketStore from '@/shared/store/useWebSocketStore'
import { getAccessToken } from '@/shared/store/useAuthStore'

export default function ChattingList({ onSelectChat }: { onSelectChat: (chatRoomId: number) => void }) {
  const { chatList, updateChatList, addMessage, updateLastMessage } = useChatStore()
  const { getClient } = useWebSocketStore()
  const subscriptionsRef = useRef<{ [key: number]: any }>({})

  useEffect(() => {
    const client = getClient()
    if (!client) return

    const initializeChats = async () => {
      try {
        const response = await getChattingList()
        updateChatList(response.result.chatRoomSummaries)

        Object.values(subscriptionsRef.current).forEach((sub) => sub?.unsubscribe())

        response.result.chatRoomSummaries.forEach((chatRoom: any) => {
          const accessToken = getAccessToken()

          subscriptionsRef.current[chatRoom.chatRoomId] = client.subscribe(
            `/sub/chat/${chatRoom.chatRoomId}`,
            (message) => {
              const receivedMessage = JSON.parse(message.body)
              // 새 메시지를 store에 추가
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
              // 마지막 메시지 정보 업데이트
              updateLastMessage(chatRoom.chatRoomId, receivedMessage.content, receivedMessage.timestamp)
            },
            {
              Authorization: `Bearer ${accessToken}`,
            },
          )
        })
      } catch (error) {
        console.error('Failed to initialize chats:', error)
      }
    }

    if (!client.connected) {
      client.onConnect = () => {
        console.log('Reconnected to WebSocket')
        initializeChats()
      }
      client.activate()
    } else {
      initializeChats()
    }

    return () => {
      Object.values(subscriptionsRef.current).forEach((sub) => sub?.unsubscribe())
    }
  }, [getClient, updateChatList, addMessage, updateLastMessage])

  return (
    <div className="flex min-h-[calc(100vh-10rem)] w-[22.5rem] flex-col gap-3 rounded-2xl border border-grey30 bg-white p-4">
      {chatList.map((chatting) => (
        <ChattingListComponent
          chattingList={chatting}
          key={chatting.chatRoomId}
          onClick={() => onSelectChat(chatting.chatRoomId)}
        />
      ))}
    </div>
  )
}
