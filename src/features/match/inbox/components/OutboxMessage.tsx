import Image from 'next/image'
import { MatchingMessage } from '../../types/MatchTypes'
import ChatButton from './ChatButton'

interface OutboxMessageProps {
  message: MatchingMessage
}

export default function OutboxMessage({ message }: OutboxMessageProps) {
  const isCompleted = message.matchingStatusType === 'COMPLETED'
  const receiverInfo =
    message.receiverType === 'TEAM' ? message.receiverTeamInformation : message.receiverProfileInformation

  return (
    <div className="relative w-full">
      <div className="relative flex w-full gap-5 rounded-xl border border-grey30 bg-white px-10 py-7">
        <div className="relative h-[64px] w-[64px] rounded-[0.63rem]">
          <Image
            src={
              message.receiverType === 'TEAM'
                ? message.receiverTeamInformation.teamLogoImagePath || '/common/default_profile.svg'
                : message.receiverProfileInformation.profileImagePath || '/common/default_profile.svg'
            }
            alt="profile"
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className={`text-lg font-semibold ${isCompleted ? 'text-main' : 'text-grey80'}`}>
            {isCompleted
              ? `${
                  message.receiverType === 'TEAM'
                    ? message.receiverTeamInformation.teamName + '팀'
                    : message.receiverProfileInformation.memberName + '님'
                }과 매칭 성사!`
              : `${
                  message.receiverType === 'TEAM'
                    ? message.receiverTeamInformation.teamName + '팀'
                    : message.receiverProfileInformation.memberName + '님'
                }에게 매칭 요청 전송 완료`}
          </span>
          <span className="line-clamp-1 text-sm font-normal text-grey70">{message.requestMessage}</span>
        </div>
        <span className="absolute right-6 top-6 text-xs font-normal text-grey80">
          {message.receiverType === 'TEAM'
            ? `${message.receiverTeamInformation.teamName} · ${message.modifiedAt}`
            : `${message.modifiedAt}`}
        </span>
      </div>
      {isCompleted && (
        <div className="absolute right-[-10px] top-0">
          <ChatButton
            chatRoomId={message.chatRoomId}
            matchingId={message.matchingId}
            senderType={message.senderType as 'TEAM' | 'PROFILE'}
            senderInfo={{
              emailId: message.senderProfileInformation?.emailId,
              teamCode: message.senderTeamInformation?.teamCode,
            }}
            receiverType={message.receiverType as 'TEAM' | 'PROFILE' | 'ANNOUNCEMENT'}
            receiverInfo={{
              emailId: message.receiverProfileInformation?.emailId,
              teamCode: message.receiverTeamInformation?.teamCode,
            }}
            isChatRoomCreated={message.isChatRoomCreated}
          />
        </div>
      )}
    </div>
  )
}
