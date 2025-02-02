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

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="메시지를 입력해 주세요"
        className="min-h-[6rem] w-full resize-none rounded-lg border border-grey30 bg-white px-4 py-3 text-sm outline-none focus:border-main"
      />
      <div className="flex w-full justify-end">
        <button
          onClick={handleSubmit}
          className="flex items-center justify-center rounded-lg bg-[#3774F4] px-6 py-2 font-semibold text-white hover:bg-main"
        >
          보내기
        </button>
      </div>
    </div>
  )
}
