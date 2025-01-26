import Image from 'next/image'
import { ChattingListType } from '../types/ChatTypes'
import { formatDate } from '@/shared/utils/dateUtils'
import { useChatStore } from '../store/useChatStore'

export default function ChattingListComponent({
  chattingList,
  isSelected,
  onClick,
}: {
  chattingList: ChattingListType
  isSelected?: boolean
  onClick: () => void
}) {
  const { lastMessages } = useChatStore()
  const chatRoomId = chattingList.chatRoomId

  const lastMessage =
    chattingList.chatPartnerInformation.lastMessage || lastMessages[chatRoomId]?.content || '새로운 대화를 시작해보세요'

  const lastMessageTime = chattingList.chatPartnerInformation.lastMessageTime || lastMessages[chatRoomId]?.timestamp

  const formattedDate = formatDate(lastMessageTime)
  const hasUnreadMessages = chattingList.unreadChatMessageCount && chattingList.unreadChatMessageCount > 0

  return (
    <div
      onClick={onClick}
      className={`flex w-full cursor-pointer gap-3 rounded-xl border p-4 hover:bg-grey10
        ${isSelected ? 'border-main bg-grey10' : 'border-grey20'}
        ${hasUnreadMessages ? 'bg-[#EDF3FF]' : ''}`}
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
          <div className="flex items-center gap-2">
            <span className="font-semibold text-grey90">{chattingList.chatPartnerInformation.chatPartnerName}</span>
            <div className={`h-2 w-2 rounded-full ${chattingList.chatPartnerOnline ? 'bg-main' : 'bg-grey50'}`} />
          </div>
          <span className="text-xs font-normal text-grey70">{formattedDate}</span>
        </div>
        <div className="relative w-[90%] text-xs text-grey60">
          <span>{lastMessage}</span>
          {hasUnreadMessages && (
            <div className="bg-red absolute -right-6 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-xs text-white">
              {chattingList.unreadChatMessageCount}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
