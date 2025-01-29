'use client'

import Image from 'next/image'
import { MatchingMessage } from '../../types/MatchTypes'

interface RequestedMessageProps {
  message: MatchingMessage
  onClick?: () => void
}

export default function RequestedMessage({ message, onClick }: RequestedMessageProps) {
  const isSenderTeam = message.senderType === 'TEAM'
  const isAnnouncementReceiver = message.receiverType === 'ANNOUNCEMENT'

  const getMessageTitle = () => {
    if (isAnnouncementReceiver) {
      return `${message.senderProfileInformation.memberName} 님이 ${message.receiverAnnouncementInformation.teamName} 팀 ${message.receiverAnnouncementInformation.announcementPositionItem.majorPosition} 공고에 지원!`
    }

    if (message.receiverType === 'TEAM') {
      return `${
        isSenderTeam
          ? `${message.senderTeamInformation.teamName} 팀에서`
          : `${message.senderProfileInformation.memberName} 님이`
      } ${message.receiverTeamInformation.teamName} 팀으로 매칭 요청`
    }
    return `${
      isSenderTeam
        ? `${message.senderTeamInformation.teamName} 팀의`
        : `${message.senderProfileInformation.memberName} 님의`
    } 매칭 요청`
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
            src={
              isSenderTeam
                ? message.senderTeamInformation.teamLogoImagePath
                : message.senderProfileInformation.profileImagePath || '/common/default_profile.svg'
            }
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
