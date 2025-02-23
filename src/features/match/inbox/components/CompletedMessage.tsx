import Image from 'next/image'
import { MatchingMessage } from '../../types/MatchTypes'
import ChatButton from './ChatButton'
import { useState } from 'react'
import MatchDetailModal from '../../common/MatchDetailModal'

interface CompletedMessageProps {
  message: MatchingMessage
}

export default function CompletedMessage({ message }: CompletedMessageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const isSenderTeam = message.senderType === 'TEAM'
  const isReceiverTeam = message.receiverType === 'TEAM'
  const isAnnouncementReceiver = message.receiverType === 'ANNOUNCEMENT'

  const senderInfo = isSenderTeam
    ? {
        name: `${message.senderTeamInformation?.teamName} 팀`,
        image: message.senderTeamInformation?.teamLogoImagePath || '/common/default_profile.svg',
        scale: message.senderTeamInformation?.teamScaleItem?.teamScaleName,
      }
    : {
        name: `${message.senderProfileInformation?.memberName} 님`,
        image: message.senderProfileInformation?.profileImagePath || '/common/default_profile.svg',
        position: message.senderProfileInformation?.profilePositionDetail.majorPosition,
      }

  const receiverInfo = isReceiverTeam
    ? {
        name: `${message.receiverTeamInformation?.teamName} 팀`,
        scale: message.receiverTeamInformation?.teamScaleItem?.teamScaleName,
      }
    : {
        name: `${message.receiverProfileInformation?.memberName} 님`,
        position: message.receiverProfileInformation?.profilePositionDetail.majorPosition,
      }

  const getMessageTitle = () => {
    if (isAnnouncementReceiver) {
      return `${message.senderProfileInformation?.memberName} 님의 ${message.receiverAnnouncementInformation.teamName}팀 ${message.receiverAnnouncementInformation.announcementPositionItem.majorPosition} 공고 지원 수락!`
    }
    if (isSenderTeam && isReceiverTeam) {
      return `${senderInfo.name}과 ${receiverInfo.name} 매칭 성사!`
    }
    return `${senderInfo.name}과 매칭 성사!`
  }

  const chatButtonProps = {
    chatRoomId: message.chatRoomId,
    matchingId: message.matchingId,
    senderType: message.senderType as 'TEAM' | 'PROFILE',
    senderInfo: {
      emailId: message.senderProfileInformation?.emailId,
      teamCode: message.senderTeamInformation?.teamCode,
    },
    receiverType: message.receiverType as 'TEAM' | 'PROFILE' | 'ANNOUNCEMENT',
    receiverInfo: {
      emailId: message.receiverProfileInformation?.emailId,
      teamCode: message.receiverTeamInformation?.teamCode,
      announcementId: message.receiverAnnouncementInformation?.teamMemberAnnouncementId,
    },
    isChatRoomCreated: message.isChatRoomCreated,
  }

  return (
    <div className="relative w-full">
      <div
        className="relative flex w-full cursor-pointer items-center gap-5 rounded-xl border border-grey30 bg-white p-3 px-5 py-5 hover:border-main"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="relative h-[64px] w-[64px] flex-shrink-0  rounded-[0.63rem]">
          <Image
            src={senderInfo.image || '/common/default_profile.svg'}
            alt={isSenderTeam ? 'team' : 'profile'}
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col justify-center">
          <span className="text-lg font-semibold text-main">{getMessageTitle()}</span>
          <span className="line-clamp-1 text-sm font-normal text-grey70">{message.requestMessage}</span>
        </div>
        <div className="absolute right-6 hidden flex-shrink-0 flex-col items-end gap-2 sm:flex">
          <span className="whitespace-pre-line text-xs font-normal text-grey80">{message.modifiedAt}</span>
        </div>
      </div>
      <ChatButton {...chatButtonProps} />
      <MatchDetailModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} message={message} />
    </div>
  )
}
