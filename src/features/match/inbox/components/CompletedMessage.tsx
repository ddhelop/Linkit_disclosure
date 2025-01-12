import Image from 'next/image'
import { MatchingMessage } from '../../types/MatchTypes'

interface CompletedMessageProps {
  message: MatchingMessage
}

export default function CompletedMessage({ message }: CompletedMessageProps) {
  return (
    <div className="flex gap-3">
      <Image src="/common/icons/empty_check.svg" alt="completed" width={20} height={20} />
      <div className="relative flex w-full gap-5 rounded-xl border border-grey30 bg-white px-10 py-7">
        <Image
          src={message.senderProfileInformation.profileImagePath || '/common/default_profile.svg'}
          alt="profile"
          width={64}
          height={64}
        />
        <div className="flex flex-col justify-center">
          <span className="text-lg font-semibold text-main">
            {message.senderProfileInformation.memberName}님과 매칭 성사!
          </span>
          <span className="line-clamp-1 text-sm font-normal text-grey70">{message.requestMessage}</span>
        </div>
        <span className="absolute right-6 top-6 text-xs font-normal text-grey80">
          {message.senderTeamInformation.teamName} · {message.requestedDate}
        </span>
      </div>
    </div>
  )
}
