import Image from 'next/image'
import { MatchingMessage } from '../types/MatchTypes'

interface InBoxMessageProps {
  messages: MatchingMessage[]
}

export default function InBoxMessage({ messages }: InBoxMessageProps) {
  return (
    <div className="flex flex-col gap-4">
      {messages.map((message) => (
        <div key={message.matchingId} className="flex gap-3">
          <Image
            src={
              message.receiverReadStatus === 'UNREAD_REQUESTED_MATCHING'
                ? '/common/icons/empty_check.svg'
                : '/common/icons/filled_check.svg'
            }
            alt="inbox-message"
            width={20}
            height={20}
          />
          <div className="relative flex w-full cursor-pointer gap-5 rounded-xl border border-grey30 px-10 py-7 hover:bg-[#EDF3FF]">
            <Image
              src={message.senderProfileInformation.profileImagePath || '/common/default_profile.svg'}
              alt="profile"
              width={64}
              height={64}
            />
            <div className="flex flex-col justify-center">
              <span className="text-lg font-semibold text-grey80">
                {message.senderProfileInformation.memberName}님의 매칭 요청
              </span>
              <span className="line-clamp-1 text-sm font-normal text-grey70">{message.requestMessage}</span>
            </div>

            <span className="absolute right-6 top-6 text-xs font-normal text-grey80">
              {message.senderTeamInformation.teamName} · {message.matchingStatusType}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
