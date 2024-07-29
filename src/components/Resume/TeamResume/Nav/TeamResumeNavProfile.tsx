import { TeamMiniProfileResponse } from '@/lib/types'
import Image from 'next/image'
import { useState } from 'react'
import TeamProfileModal from './TeamProfileModal'
import { TeamMiniProfilePlusResponse } from '@/lib/types'

interface TeamResumNavProps {
  data: TeamMiniProfileResponse | null
}

export default function TeamResumeNavProfile({ data }: TeamResumNavProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [profileData, setProfileData] = useState<TeamMiniProfilePlusResponse | null>(
    data
      ? {
          ...data,
          teamBuildingFieldNames: data.teamBuildingFieldNames ? [data.teamBuildingFieldNames] : [],
        }
      : null,
  )

  const handleModalOpen = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const handleProfileUpdate = (updatedData: TeamMiniProfilePlusResponse) => {
    setProfileData(updatedData)
  }

  return (
    <div className="flex w-full flex-col rounded-2xl bg-[#fff] p-5 shadow-resume-box-shadow">
      <div className="pt-[0.42rem] text-[1.25rem] font-bold leading-[1.375rem]">
        {profileData ? profileData.teamProfileTitle : 'null'}
      </div>

      <div className="mt-3 flex w-full gap-2">
        {profileData?.teamKeywordNames.map((keyword, index) => (
          <span
            key={index}
            className="rounded-[0.44rem] bg-[#D3E1FE33] bg-opacity-20 px-[0.56rem] py-1 text-sm text-grey60"
          >
            {keyword}
          </span>
        ))}
      </div>

      <div className="mt-8 flex w-full items-center gap-4 rounded-[0.44rem] p-[0.62rem]">
        <div className="relative w-auto rounded-[14.8rem] bg-grey30 ">
          <Image
            src={profileData?.teamLogoImageUrl || '/assets/icons/flag.svg'}
            width={41}
            height={41}
            alt="flag"
            className="rounded-full"
          />
        </div>

        <div className="flex flex-col gap-[0.12rem] pr-9">
          <p className="text-sm font-semibold text-[#2563EB]">{profileData ? profileData.teamName : 'null'}</p>
          <div className="flex gap-3">
            <p className="text-sm text-grey60">분야 | {profileData ? profileData.sectorName : 'null'}</p>
            <p className="text-sm text-grey60">규모 | {profileData ? profileData.sizeType : 'null'}</p>
          </div>
        </div>
      </div>
      <button onClick={handleModalOpen} className="mt-[0.88rem] rounded-[0.25rem] bg-grey20 py-[0.56rem] text-sm">
        수정하기
      </button>

      <TeamProfileModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        data={profileData}
        onUpdate={handleProfileUpdate}
      />
    </div>
  )
}
