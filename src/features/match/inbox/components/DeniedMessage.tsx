'use client'

import Image from 'next/image'
import { MatchingMessage } from '../../types/MatchTypes'

interface DeniedMessageProps {
  message: MatchingMessage
}

export default function DeniedMessage({ message }: DeniedMessageProps) {
  const isSenderTeam = message.senderType === 'TEAM'
  const isAnnouncementReceiver = message.receiverType === 'ANNOUNCEMENT'

  const getMessageTitle = () => {
    if (isAnnouncementReceiver) {
      return `${message.senderProfileInformation.memberName} 님의 ${message.receiverAnnouncementInformation.teamName} 팀 ${message.receiverAnnouncementInformation.announcementPositionItem.majorPosition} 공고 지원 거절`
    }

    if (message.receiverType === 'TEAM') {
      return `${
        isSenderTeam
          ? `${message.senderTeamInformation.teamName} 팀이`
          : `${message.senderProfileInformation.memberName}님이`
      } ${message.receiverTeamInformation.teamName}팀으로 매칭 거절`
    }
    return `${
      isSenderTeam
        ? `${message.senderTeamInformation.teamName} 의`
        : `${message.senderProfileInformation.memberName} 님의`
    } 매칭 거절`
  }

  return (
    <div className="w-full rounded-xl border border-grey30 bg-white px-10 py-7 hover:border-main">
      <div className="flex gap-5">
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
