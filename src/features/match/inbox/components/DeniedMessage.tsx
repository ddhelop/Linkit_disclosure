'use client'

import Image from 'next/image'
import { MatchingMessage } from '../../types/MatchTypes'
import { useState } from 'react'
import MatchDetailModal from '../../common/MatchDetailModal'

interface DeniedMessageProps {
  message: MatchingMessage
}

export default function DeniedMessage({ message }: DeniedMessageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const isSenderTeam = message.senderType === 'TEAM'
  const isAnnouncementReceiver = message.receiverType === 'ANNOUNCEMENT'

  const getMessageTitle = () => {
    if (isAnnouncementReceiver) {
      return `${message.senderProfileInformation?.memberName} 님의 ${message.receiverAnnouncementInformation?.teamName} 팀 ${message.receiverAnnouncementInformation?.announcementPositionItem?.majorPosition} 공고 지원 거절`
    }

    if (message.receiverType === 'TEAM') {
      return `${
        isSenderTeam
          ? `${message.senderTeamInformation?.teamName} 팀이`
          : ` ${message.receiverTeamInformation?.teamName} 팀이 ${message.senderProfileInformation?.memberName} 님의`
      } 매칭 거절`
    }
    return `${
      isSenderTeam
        ? `${message.senderTeamInformation?.teamName} 의`
        : `${message.senderProfileInformation?.memberName} 님의`
    } 매칭 거절`
  }

  return (
    <>
      <div
        className="w-full cursor-pointer rounded-xl border border-grey30 bg-white  px-5 py-5 hover:border-main"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex items-center gap-5">
          <div className="relative h-[64px] w-[64px] flex-shrink-0 rounded-[0.63rem]">
            <Image
              src={
                isSenderTeam
                  ? message.senderTeamInformation?.teamLogoImagePath || '/common/default_profile.svg'
                  : message.senderProfileInformation?.profileImagePath || '/common/default_profile.svg'
              }
              alt={isSenderTeam ? 'team' : 'profile'}
              fill
              className="rounded-lg object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-lg font-semibold text-grey80">{getMessageTitle()}</span>
            <span className="line-clamp-1 whitespace-pre-line text-sm font-normal text-grey70">
              {message?.requestMessage}
            </span>
          </div>
          <div className="absolute right-6 top-6 hidden flex-col items-end gap-2 sm:flex">
            <span className="text-xs font-normal text-grey80">{message?.modifiedAt}</span>
          </div>
        </div>
      </div>
      <MatchDetailModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} message={message} />
    </>
  )
}
