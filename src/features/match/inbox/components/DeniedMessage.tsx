import Image from 'next/image'
import { MatchingMessage } from '../../types/MatchTypes'

interface DeniedMessageProps {
  message: MatchingMessage
}

export default function DeniedMessage({ message }: DeniedMessageProps) {
  const isSenderTeam = message.senderType === 'TEAM'
  const isReceiverTeam = message.receiverType === 'TEAM'

  const senderInfo = isSenderTeam
    ? {
        name: `${message.senderTeamInformation.teamName}팀`,
        image: message.senderTeamInformation.teamLogoImagePath,
        scale: message.senderTeamInformation.teamScaleItem.teamScaleName,
      }
    : {
        name: `${message.senderProfileInformation.memberName}님`,
        image: message.senderProfileInformation.profileImagePath,
        position: message.senderProfileInformation.profilePositionDetail.majorPosition,
      }

  const receiverInfo = isReceiverTeam
    ? {
        name: `${message.receiverTeamInformation.teamName}팀`,
        scale: message.receiverTeamInformation.teamScaleItem.teamScaleName,
      }
    : {
        name: `${message.receiverProfileInformation.memberName}님`,
        position: message.receiverProfileInformation.profilePositionDetail.majorPosition,
      }

  const getMessageTitle = () => {
    if (isSenderTeam && isReceiverTeam) {
      return `${senderInfo.name}에서 ${receiverInfo.name}으로의 매칭 요청 거절`
    }
    return `${senderInfo.name}의 매칭 요청 거절`
  }

  return (
    <div className="w-full">
      <div className="relative flex w-full gap-5 rounded-xl border border-grey30 bg-grey10 px-10 py-7">
        <div className="absolute inset-0 z-10 rounded-xl bg-grey20 opacity-10" />
        <div className="relative h-[64px] w-[64px] rounded-[0.63rem]">
          <Image
            src={senderInfo.image || '/common/default_profile.svg'}
            alt={isSenderTeam ? 'team' : 'profile'}
            fill
            className="relative z-20 rounded-lg object-cover"
          />
        </div>
        <div className="relative z-20 flex flex-col justify-center">
          <span className="text-lg font-semibold text-grey60">{getMessageTitle()}</span>
          <span className="line-clamp-1 text-sm font-normal text-grey50">{message.requestMessage}</span>
        </div>
        <div className="absolute right-6 top-6 z-20 flex flex-col items-end gap-2">
          {isSenderTeam && <span className="text-xs font-normal text-grey80">{senderInfo.scale}</span>}
          <span className="text-xs font-normal text-grey80">{message.modifiedAt}</span>
        </div>
      </div>
    </div>
  )
}
