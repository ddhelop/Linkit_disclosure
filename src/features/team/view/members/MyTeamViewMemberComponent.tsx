import Image from 'next/image'
import { TeamMember } from '../../types/teamView.types'
import Link from 'next/link'

export default function MyTeamViewMemberComponent({ member }: { member: TeamMember }) {
  const hasProfileInfo = member.majorPosition?.length > 0 && member?.regionDetail?.cityName !== null

  return (
    <Link
      href={`/${member.emailId}`}
      className="w-full cursor-pointer rounded-xl border border-transparent hover:border-main"
    >
      <div className="flex rounded-xl bg-white px-8 py-6" style={{ boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)' }}>
        <div className={`flex  gap-5 ${!hasProfileInfo ? 'w-full items-center' : ''}`}>
          <div className="relative aspect-square h-[80px] w-[80px] rounded-lg">
            <Image
              src={hasProfileInfo ? member.profileImagePath : '/common/default_profile.svg'}
              alt="default-profile"
              fill
              className="rounded-lg object-cover"
            />
          </div>
          <div className={`flex flex-col ${!hasProfileInfo ? 'w-full justify-center' : ''}`}>
            <div className={`flex items-center gap-2 ${!hasProfileInfo ? '' : ''}`}>
              <span className="text-xl font-semibold text-grey90">{member.memberName}</span>
            </div>

            {hasProfileInfo && (
              <div className="mt-2 flex items-center gap-2 text-xs text-grey50">
                포지션 | <span className="text-sm text-grey70">{member.majorPosition}</span>
              </div>
            )}
            {hasProfileInfo && (
              <div className=" flex items-center gap-2 text-xs text-grey50">
                지역 | <span className="text-sm text-grey70">{member.regionDetail?.cityName}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
