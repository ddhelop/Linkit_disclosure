import Image from 'next/image'
import { MatchingMessage } from '../../types/MatchTypes'

interface DeniedMessageProps {
  message: MatchingMessage
}

export default function DeniedMessage({ message }: DeniedMessageProps) {
  return (
    <div className="w-full">
      <div className="relative flex w-full gap-5 rounded-xl border border-grey30 bg-grey10 px-10 py-7">
        <div className="absolute inset-0 z-10 rounded-xl bg-grey20 opacity-10" />
        <div className="relative h-[64px] w-[64px] rounded-[0.63rem]">
          <Image
            src={
              message.senderType === 'TEAM'
                ? message.senderTeamInformation.teamLogoImagePath || '/common/default_profile.svg'
                : message.senderProfileInformation.profileImagePath || '/common/default_profile.svg'
            }
            alt="profile"
            fill
            className="relative z-20 rounded-lg object-cover"
          />
        </div>
        <div className="relative z-20 flex flex-col justify-center">
          <span className="text-lg font-semibold text-grey60">
            {message.senderType === 'TEAM'
              ? `${message.senderTeamInformation.teamName}팀의 매칭 요청 거절`
              : `${message.senderProfileInformation.memberName}님의 매칭 요청 거절`}
          </span>
          <span className="line-clamp-1 text-sm font-normal text-grey50">{message.requestMessage}</span>
        </div>
        <span className="absolute right-6 top-6 z-20 text-xs font-normal text-grey80">
          {message.senderType === 'TEAM'
            ? `${message.senderTeamInformation.teamScaleItem.teamScaleName} · ${message.modifiedAt}`
            : `${message.modifiedAt}`}
        </span>
      </div>
    </div>
  )
}
