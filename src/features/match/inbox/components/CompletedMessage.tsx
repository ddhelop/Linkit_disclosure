import Image from 'next/image'
import { MatchingMessage } from '../../types/MatchTypes'
import ChatButton from './ChatButton'

interface CompletedMessageProps {
  message: MatchingMessage
}

export default function CompletedMessage({ message }: CompletedMessageProps) {
  return (
    <>
      <div className="relative w-full">
        <div className="relative flex w-full gap-5 rounded-xl border border-grey30 bg-white px-10 py-7">
          <div className="relative h-[64px] w-[64px] rounded-[0.63rem]">
            <Image
              src={
                message.senderType === 'TEAM'
                  ? message.senderTeamInformation.teamLogoImagePath || '/common/default_profile.svg'
                  : message.senderProfileInformation.profileImagePath || '/common/default_profile.svg'
              }
              alt="profile"
              fill
              className="rounded-lg object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-lg font-semibold text-main">
              {message.senderType === 'TEAM'
                ? `${message.senderTeamInformation.teamName}팀과 매칭 성사!`
                : `${message.senderProfileInformation.memberName}님과 매칭 성사!`}
            </span>
            <span className="line-clamp-1 text-sm font-normal text-grey70">{message.requestMessage}</span>
          </div>
          <div className="absolute right-6 flex flex-col items-end gap-2">
            <span className="text-xs font-normal text-grey80">
              {message.senderType === 'TEAM'
                ? `${message.senderTeamInformation.teamScaleItem.teamScaleName} · ${message.modifiedAt}`
                : `${message.modifiedAt}`}
            </span>
          </div>
        </div>
        {/* <div className="absolute right-[-124px] top-10 flex">
          <button className=" flex items-center gap-2 rounded-full bg-[#3774F4] px-4 py-2 text-sm text-white hover:bg-blue-600">
            <Image src="/common/icons/chat.svg" alt="chat" width={16} height={16} />
            채팅하기
          </button>
        </div> */}

        <ChatButton
          chatRoomId={message.chatRoomId}
          matchingId={message.matchingId}
          senderType={message.senderType}
          senderInfo={{
            emailId: message.senderProfileInformation?.emailId,
            teamCode: message.senderTeamInformation?.teamCode,
          }}
          receiverType={message.receiverType}
          receiverInfo={{
            emailId: message.receiverProfileInformation?.emailId,
            teamCode: message.receiverTeamInformation?.teamCode,
          }}
          isChatRoomCreated={message.isChatRoomCreated}
        />
      </div>
    </>
  )
}
