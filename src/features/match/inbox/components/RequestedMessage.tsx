'use client'

import Image from 'next/image'
import { MatchingMessage } from '../../types/MatchTypes'

interface RequestedMessageProps {
  message: MatchingMessage
  onClick?: () => void
}

export default function RequestedMessage({ message, onClick }: RequestedMessageProps) {
  return (
    <div className="w-full">
      <div
        role="button"
        onClick={onClick}
        className={`relative flex w-full cursor-pointer gap-5 rounded-xl border border-grey30 px-10 py-7 hover:bg-[#EDF3FF] ${
          message.receiverReadStatus === 'UNREAD_REQUESTED_MATCHING' ? 'bg-[#EDF3FF]' : 'bg-white'
        }`}
      >
        <div className="relative h-[64px] w-[64px] rounded-[0.63rem]">
          <Image
            src={message.senderProfileInformation.profileImagePath || '/common/default_profile.svg'}
            alt="profile"
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-lg font-semibold text-grey80">
            {message.senderProfileInformation.memberName}님의 매칭 요청
          </span>
          <span className="line-clamp-1 text-sm font-normal text-grey70">{message.requestMessage}</span>
        </div>
        <span className="absolute right-6 top-6 text-xs font-normal text-grey80">
          {message.senderTeamInformation.teamName} · {message.modifiedAt}
        </span>
      </div>
    </div>
  )
}
