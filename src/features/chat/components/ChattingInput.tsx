'use client'

import { useState, KeyboardEvent } from 'react'
import Image from 'next/image'
import useWebSocketStore from '@/shared/store/useWebSocketStore'
import { useSearchParams } from 'next/navigation'

function getAccessToken() {
  if (typeof document === 'undefined') return null
  const cookies = document.cookie.split(';')
  const tokenCookie = cookies.find((cookie) => cookie.trim().startsWith('accessToken='))
  return tokenCookie ? tokenCookie.split('=')[1].trim() : null
}

interface ChattingInputProps {
  onMessageSent: (content: string) => void
}

export default function ChattingInput({ onMessageSent }: ChattingInputProps) {
  const [message, setMessage] = useState('')
  const { getClient } = useWebSocketStore()
  const searchParams = useSearchParams()
  const chatRoomId = searchParams.get('room')

  const handleSubmit = () => {
    if (!message.trim() || !chatRoomId) return

    const client = getClient()
    if (!client?.connected) {
      console.error('WebSocket is not connected')
      return
    }

    const accessToken = getAccessToken()
    if (!accessToken) {
      console.error('Access token is missing')
      return
    }

    try {
      client.publish({
        destination: `/pub/chat/send/${chatRoomId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          content: message.trim(),
        }),
      })

      onMessageSent(message.trim())
      setMessage('')
    } catch (error) {
      console.error('Failed to send message:', error)
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="메시지를 입력해 주세요"
        className="flex-1 rounded-lg border border-grey30 bg-white px-4 py-3 text-sm outline-none focus:border-main"
      />
      <button
        onClick={handleSubmit}
        className="flex h-11 w-11 items-center justify-center rounded-lg bg-main hover:bg-blue-600"
      >
        <Image src="/common/icons/send.svg" width={24} height={24} alt="send" />
      </button>
    </div>
  )
}
