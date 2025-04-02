import { TeamData } from '@/features/team/types/team.types'
import Image from 'next/image'
import Link from 'next/link'

export default function TeamViewWideInfo({ teamInfo }: { teamInfo: TeamData }) {
  const { teamInformMenu } = teamInfo

  return (
    <Link
      href={`/team/${teamInformMenu.teamCode}/log`}
      className="flex w-full cursor-pointer justify-center bg-[#EDF3FF] px-6 py-8 hover:bg-grey10"
    >
      <div className="flex w-full flex-col gap-3 lg:w-[90%]">
        <div className="flex items-center gap-4">
          <div className="relative h-[46px] w-[46px]">
            <Image src={teamInformMenu.teamLogoImagePath || '/common/default_profile.svg'} alt="team logo" fill />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-sm font-semibold text-grey90">{teamInformMenu.teamName}</h1>
            <div className="flex items-center gap-2 text-xs">
              <p className="text-grey70">{teamInformMenu.teamScaleItem.teamScaleName}</p>
              <p className="text-grey50">|</p>
              <p className="text-grey70">
                {teamInformMenu.regionDetail.cityName} {teamInformMenu.regionDetail.divisionName}
              </p>
            </div>
          </div>
        </div>

        <p className="text-xs text-grey70">{teamInformMenu.teamShortDescription}</p>
      </div>
    </Link>
  )
}
