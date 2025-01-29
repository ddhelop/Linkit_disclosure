'use client'

import Image from 'next/image'
import { MatchingMessage } from '../../types/MatchTypes'

interface RequestedMessageProps {
  message: MatchingMessage
  onClick?: () => void
}

export default function RequestedMessage({ message, onClick }: RequestedMessageProps) {
  const isSenderTeam = message.senderType === 'TEAM'
  const isReceiverTeam = message.receiverType === 'TEAM'

  const senderInfo = isSenderTeam
    ? {
        name: `${message.senderTeamInformation.teamName}팀`,
        image: message.senderTeamInformation.teamLogoImagePath,
        scale: message.senderTeamInformation.teamScaleItem.teamScaleName,
      }
    : {
        name: `${message.senderProfileInformation.memberName}님`,
        image: message.senderProfileInformation.profileImagePath,
        position: message.senderProfileInformation.profilePositionDetail.majorPosition,
      }

  const receiverInfo = isReceiverTeam
    ? {
        name: `${message.receiverTeamInformation.teamName}팀`,
        scale: message.receiverTeamInformation.teamScaleItem.teamScaleName,
      }
    : {
        name: `${message.receiverProfileInformation.memberName}님`,
        position: message.receiverProfileInformation.profilePositionDetail.majorPosition,
      }

  const getMessageTitle = () => {
    if (isReceiverTeam) {
      return `${senderInfo.name}에서 ${receiverInfo.name}으로 매칭 요청`
    }
    return `${senderInfo.name}의 매칭 요청`
  }

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
            src={senderInfo.image || '/common/default_profile.svg'}
            alt={isSenderTeam ? 'team' : 'profile'}
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-lg font-semibold text-grey80">{getMessageTitle()}</span>
          <span className="line-clamp-1 text-sm font-normal text-grey70">{message.requestMessage}</span>
        </div>
        <div className="absolute right-6 top-6 flex flex-col items-end gap-2">
          <span className="text-xs font-normal text-grey80">{message.modifiedAt}</span>
        </div>
      </div>
    </div>
  )
}
