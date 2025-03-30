'use client'
import Link from 'next/link'
import Image from 'next/image'

interface ChatButtonProps {
  unreadChatCount: number
}

export default function ChatButton({ unreadChatCount }: ChatButtonProps) {
  return (
    <Link href="/chat">
      <div className="relative flex cursor-pointer items-center">
        <Image src={'/common/icons/chat_circle.svg'} width={32} height={32} alt="chat" />
        {unreadChatCount > 0 && <div className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500" />}
      </div>
    </Link>
  )
}
