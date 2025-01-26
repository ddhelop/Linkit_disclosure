import Image from 'next/image'
import { ChattingListType } from '../types/ChatTypes'
import { formatDate } from '@/shared/utils/dateUtils'
import { useChatStore } from '../store/useChatStore'
import { useEffect } from 'react'

export default function ChattingListComponent({
  chattingList,
  isSelected,
  onClick,
}: {
  chattingList: ChattingListType
  isSelected?: boolean
  onClick: () => void
}) {
  const { lastMessages, initializeLastMessage } = useChatStore()
  const chatRoomId = chattingList.chatRoomId

  // 컴포넌트 마운트 시 초기 메시지 설정
  useEffect(() => {
    if (chattingList.chatPartnerInformation.lastMessage) {
      initializeLastMessage(
        chatRoomId,
        chattingList.chatPartnerInformation.lastMessage,
        chattingList.chatPartnerInformation.lastMessageTime,
      )
    }
  }, [
    chatRoomId,
    chattingList.chatPartnerInformation.lastMessage,
    chattingList.chatPartnerInformation.lastMessageTime,
    initializeLastMessage,
  ])

  // 디버깅을 위한 콘솔 로그
  console.log('API lastMessage:', chattingList.chatPartnerInformation.lastMessage)
  console.log('Store lastMessage:', lastMessages[chatRoomId]?.content)

  const handleClick = () => {
    // 클릭 이벤트 발생 시 현재 메시지 상태 유지
    if (chattingList.chatPartnerInformation.lastMessage) {
      initializeLastMessage(
        chatRoomId,
        chattingList.chatPartnerInformation.lastMessage,
        chattingList.chatPartnerInformation.lastMessageTime,
      )
    }
    onClick()
  }

  const lastMessage =
    chattingList.chatPartnerInformation.lastMessage || lastMessages[chatRoomId]?.content || '새로운 대화를 시작해보세요'

  const lastMessageTime = chattingList.chatPartnerInformation.lastMessageTime || lastMessages[chatRoomId]?.timestamp

  const formattedDate = formatDate(lastMessageTime)

  return (
    <div
      onClick={handleClick}
      className={`flex w-full cursor-pointer gap-3 rounded-xl border p-4 hover:bg-grey10
        ${isSelected ? 'border-main bg-grey10' : 'border-grey20'}`}
    >
      <div className="h-[60px] w-[60px] flex-shrink-0">
        {chattingList.chatPartnerInformation.chatPartnerImageUrl ? (
          <Image
            src={chattingList.chatPartnerInformation.chatPartnerImageUrl}
            width={60}
            height={60}
            alt="Profile"
            className="rounded-lg object-cover"
            style={{ width: '60px', height: '60px' }}
          />
        ) : (
          <Image
            src={'/common/default_profile.svg'}
            width={60}
            height={60}
            alt="Profile"
            className="rounded-lg object-cover"
            style={{ width: '60px', height: '60px' }}
          />
        )}
      </div>

      <div className="flex w-full flex-col gap-[0.38rem]">
        <div className="flex w-full items-center justify-between">
          <span className="font-semibold text-grey90">{chattingList.chatPartnerInformation.chatPartnerName}</span>
          <span className="text-xs font-normal text-grey70">{formattedDate}</span>
        </div>
        <div className="w-[90%] text-xs text-grey60">{lastMessage}</div>
      </div>
    </div>
  )
}
