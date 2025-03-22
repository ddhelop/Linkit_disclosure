'use client'
import Image from 'next/image'
import { MatchingMessage } from '../../types/MatchTypes'
import ChatButton from './ChatButton'
import { useState } from 'react'
import MatchDetailModal from '../../common/MatchDetailModal'

interface OutboxMessageProps {
  message: MatchingMessage
}

export default function OutboxMessage({ message }: OutboxMessageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const isCompleted = message.matchingStatusType === 'COMPLETED'
  const isSenderTeam = message.senderType === 'TEAM'
  const isReceiverTeam = message.receiverType === 'TEAM'
  const isReceiverAnnouncement = message.receiverType === 'ANNOUNCEMENT'

  const senderInfo = isSenderTeam
    ? {
        name: `${message.senderTeamInformation.teamName} 팀`,
        scale: message.senderTeamInformation.teamScaleItem.teamScaleName,
      }
    : {
        name: `${message.senderProfileInformation.memberName} 님`,
        position: message.senderProfileInformation.profilePositionDetail.majorPosition,
      }

  const receiverInfo = isReceiverAnnouncement
    ? {
        name: `${message.receiverAnnouncementInformation.teamName} 팀`,
        image: message.receiverAnnouncementInformation.teamLogoImagePath || '/common/default_profile.svg',

        position: message.receiverAnnouncementInformation.announcementPositionItem.majorPosition,
      }
    : isReceiverTeam
      ? {
          name: `${message.receiverTeamInformation.teamName} 팀`,
          image: message.receiverTeamInformation.teamLogoImagePath || '/common/default_profile.svg',
          scale: message.receiverTeamInformation.teamScaleItem.teamScaleName,
        }
      : {
          name: `${message.receiverProfileInformation.memberName} 님`,
          image: message.receiverProfileInformation.profileImagePath || '/common/default_profile.svg',
          position: message.receiverProfileInformation.profilePositionDetail.majorPosition,
        }

  const getMessageTitle = () => {
    if (isCompleted) {
      return `${receiverInfo.name} 과 매칭 성사!`
    }

    // 발신함 케이스별 메시지 처리
    if (isReceiverAnnouncement) {
      // 공고 지원의 경우
      return `${receiverInfo.name}의 ${receiverInfo.position} 공고에 지원 완료`
    } else if (!isSenderTeam && !isReceiverTeam) {
      // 개인 -> 개인
      return `${receiverInfo.name}에게 매칭 요청 전송 완료`
    } else if (!isSenderTeam && isReceiverTeam) {
      // 개인 -> 팀
      return `${receiverInfo.name}으로 매칭 요청 전송 완료`
    } else {
      // 팀 -> 팀, 팀 -> 개인
      return `${senderInfo.name}에서 ${receiverInfo.name}으로 매칭 요청 전송 완료`
    }
  }

  const chatButtonInfo = {
    senderInfo: isSenderTeam
      ? { teamCode: message.senderTeamInformation.teamCode }
      : { emailId: message.senderProfileInformation.emailId },
    receiverInfo: isReceiverAnnouncement
      ? { announcementId: message.receiverAnnouncementInformation.teamMemberAnnouncementId }
      : isReceiverTeam
        ? { teamCode: message.receiverTeamInformation.teamCode }
        : { emailId: message.receiverProfileInformation.emailId },
  }

  return (
    <>
      <div className="relative w-full">
        <div
          className="relative flex w-full cursor-pointer items-center gap-5 rounded-xl border border-grey30 bg-white px-5 py-5"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="relative h-[64px] w-[64px] flex-shrink-0 rounded-[0.63rem]">
            <Image
              src={receiverInfo.image || '/common/default_profile.svg'}
              alt={isReceiverTeam || isReceiverAnnouncement ? 'team' : 'profile'}
              fill
              className="rounded-lg object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className={`text-lg font-semibold ${isCompleted ? 'text-main' : 'text-grey80'}`}>
              {getMessageTitle()}
            </span>
            <span className="line-clamp-1 text-sm font-normal text-grey70">{message.requestMessage}</span>
          </div>
          <div className="absolute right-6 top-4 hidden flex-col items-end gap-2 sm:flex">
            <span className="text-xs font-normal text-grey80">{message.modifiedAt}</span>
          </div>
        </div>
        {isCompleted && (
          <div className="">
            <ChatButton isChatRoomCreated={message.isChatRoomCreated} chatRoomId={message.chatRoomId} />
          </div>
        )}
      </div>

      <MatchDetailModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} message={message} />
    </>
  )
}
