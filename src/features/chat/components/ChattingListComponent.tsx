import Image from 'next/image'
import { ChattingListType } from '../types/ChatTypes'

export default function ChattingListComponent({
  chattingList,
  isSelected,
  onClick,
}: {
  chattingList: ChattingListType
  isSelected?: boolean
  onClick: () => void
}) {
  return (
    <div
      onClick={onClick}
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
          <span className="text-xs font-normal text-grey70">{chattingList.chatPartnerInformation.lastMessageTime}</span>
        </div>

        <div className="w-[90%] text-xs text-grey60">{chattingList.chatPartnerInformation.lastMessage}</div>
      </div>
    </div>
  )
}
