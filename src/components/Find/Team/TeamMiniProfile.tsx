import TeamAnnouncementModal from '@/components/common/component/Team/TeamAnnouncementModal'
import { FindTeamInterface } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface TeamMemberMiniProfileProps {
  profile: FindTeamInterface
}

export default function TeamMiniProfile({ profile }: TeamMemberMiniProfileProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleModalOpen = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="flex w-[42.5rem] flex-col rounded-[0.63rem] bg-[#fff] p-5">
      <Link href={`/team/${profile.teamMiniProfileResponse.id}`}>
        <div className="flex cursor-pointer flex-col rounded-lg p-2 hover:bg-grey10">
          <div className="flex w-full items-center justify-between ">
            <div className="flex items-center gap-2">
              <Image
                src={profile.teamMiniProfileResponse.teamLogoImageUrl || '/assets/images/DefaultProfile.png'}
                width={34}
                height={34}
                alt="TeamLogo"
                className="rounded-full"
              />

              <p className="text-sm font-semibold text-[#2563EB]">{profile.teamMiniProfileResponse.teamName}</p>
              <p className="pl-2 text-xs text-grey50">
                분야 | {profile.teamMiniProfileResponse.sectorName} 규모 | {profile.teamMiniProfileResponse.sizeType}
              </p>
            </div>
            <div className="flex cursor-pointer gap-2 text-xs text-grey60">
              <p>자세히 보기</p>
              <Image src="/assets/icons/gray>.svg" width={6} height={10} alt="arrow" />
            </div>
          </div>

          <div className="py-4 text-sm">{profile.teamMiniProfileResponse.teamProfileTitle}</div>
          <div className="flex flex-col">
            <div className="flex flex-wrap gap-2">
              {profile?.teamMiniProfileResponse.teamKeywordNames?.map((keyword, index) => (
                <div
                  key={index}
                  className="rounded-[0.45rem] bg-grey30 bg-opacity-20 px-[0.57rem] py-1 text-xs text-grey60"
                >
                  {keyword}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Link>

      {/* 구분선 */}
      <div className="my-4 w-full border border-grey30"></div>

      <div className="flex items-center gap-2 py-3">
        <Image src="/assets/icons/drawingPin.svg" width={14} height={14} alt="calendar" />
        <p className="text-xs font-bold text-[#2563EB]">모집중인 공고</p>
      </div>

      {/* 공고 컴포넌트 */}
      <div
        className="flex cursor-pointer flex-col rounded-lg border border-grey30 p-4 hover:bg-grey10"
        onClick={handleModalOpen}
      >
        <div className="mb-4 flex items-center justify-between text-sm font-semibold">
          <p>{profile.teamMemberAnnouncementResponse.mainBusiness}</p>
          <Image src="/assets/icons/saveIcon.svg" width={18} height={18} alt="arrow" className="cursor-pointer" />
        </div>

        <div className="flex gap-2">
          <div className="rounded-[0.45rem] bg-grey10 px-2 py-1 text-xs text-grey60">
            {profile.teamMemberAnnouncementResponse.skillNames.join(' ')}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <TeamAnnouncementModal onClose={handleModalClose} data={profile.teamMemberAnnouncementResponse} />
      )}
    </div>
  )
}
