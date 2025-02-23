'use client'
import ChattingList from '@/features/chat/components/ChattingList'
import { useRouter, usePathname } from 'next/navigation'

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const isMainChatPage = pathname === '/chat'

  const handleSelectChat = (selectedChatRoomId: number) => {
    router.push(`/chat/${selectedChatRoomId}`)
  }

  return (
    <div className="flex w-full justify-center gap-[2.12rem] lg:pt-[3.63rem]">
      <div className={`${isMainChatPage ? 'block w-full lg:w-[22.5rem]' : 'hidden lg:block'}`}>
        <ChattingList onSelectChat={handleSelectChat} />
      </div>
      <div className={`${isMainChatPage ? 'hidden lg:flex' : 'flex w-full lg:w-auto'}`}>{children}</div>
    </div>
  )
}
