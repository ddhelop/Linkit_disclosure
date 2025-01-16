'use client'

import { useState, KeyboardEvent } from 'react'
import Image from 'next/image'

interface ChattingInputProps {
  onSendMessage: (content: string) => void
}

export default function ChattingInput({ onSendMessage }: ChattingInputProps) {
  const [message, setMessage] = useState('')

  const handleSubmit = () => {
    if (!message.trim()) return
    onSendMessage(message)
    setMessage('')
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
