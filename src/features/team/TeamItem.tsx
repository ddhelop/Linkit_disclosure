import Image from 'next/image'
import { TeamData } from './types/team.types'

interface TeamItemProps {
  team: TeamData
  onClick?: () => void
}

export default function TeamItem({ team, onClick }: TeamItemProps) {
  const { teamName, teamLogoImagePath, teamScaleItem, regionDetail } = team.teamInformMenu
  const location = `${regionDetail.cityName} ${regionDetail.divisionName}`

  return (
    <div
      className="w-full cursor-pointer rounded-xl border border-grey30 bg-grey10 px-7 py-[1.12rem] hover:border-main"
      onClick={onClick}
    >
      <div className="flex gap-4">
        <div className="relative h-[70px] w-[70px] rounded-lg">
          <Image
            src={teamLogoImagePath || '/common/default_profile.svg'}
            alt="team-logo"
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <span className="font-semibold text-grey90">{teamName}</span>
          <div className="mt-1 flex items-center gap-1">
            <span className="text-xs text-grey50">팀원</span>
            <span className="text-[0.6rem] text-grey50">|</span>
            <span className="text-xs text-grey70">{teamScaleItem.teamScaleName}</span>
          </div>
          <div className="mt-1 flex items-center gap-1">
            <span className="text-xs text-grey50">지역</span>
            <span className="text-[0.6rem] text-grey50">|</span>
            <span className="text-xs text-grey70">{location}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
