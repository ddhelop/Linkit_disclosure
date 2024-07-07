import { useEffect, useState } from 'react'
import { TeamProfile } from '@/lib/types'
import Image from 'next/image'

interface TeamMemberMiniProfileProps {
  profile: TeamProfile
}

export default function TeamMemberMiniProfile({ profile }: TeamMemberMiniProfileProps) {
  const [dDay, setDDay] = useState<number | null>(null)

  useEffect(() => {
    const calculateDDay = () => {
      if (typeof profile.teamUploadDeadline === 'string' || typeof profile.teamUploadDeadline === 'number') {
        const uploadDate = new Date(profile.teamUploadDeadline)
        const currentDate = new Date()
        const diffTime = uploadDate.getTime() - currentDate.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        setDDay(diffDays)
      } else {
        setDDay(null) // teamUploadDeadline이 유효한 날짜가 아닌 경우
      }
    }

    calculateDDay()
  }, [profile.teamUploadDeadline])

  return (
    <div className="flex h-[17.6rem] w-[41.5rem] flex-col rounded-[0.63rem] bg-[#fff] p-5">
      <div className="flex w-full justify-between">
        <p className="text-sm font-semibold text-[#2563EB]">{dDay !== null ? `D-${dDay}` : 'D-Loading...'}</p>
        <Image src="/assets/icons/saveIcon.svg" width={17} height={20} alt="save" className="cursor-pointer" />
      </div>

      <div className="w-[80%] pt-[0.42rem] text-xl font-semibold leading-8 opacity-80">{profile.miniProfileTitle}</div>

      <div className="flex flex-col">
        <div className="flex flex-wrap py-4">
          {profile.teamKeywordNames.map((keyword, index) => (
            <div
              key={index}
              className="rounded-[0.45rem] bg-[#D3E1FE33] bg-opacity-20 px-[0.57rem] py-1 text-[#2563EB]"
            >
              {keyword}
            </div>
          ))}
        </div>

        <div className="flex justify-between rounded-[0.44rem] bg-grey10 p-[0.62rem]">
          <div className="flex gap-4">
            <Image
              src={profile.teamLogoImageUrl || '/assets/images/DefaultProfile.png'}
              width={46}
              height={46}
              alt="Team Image"
              className="rounded-full"
            />
            <div className="flex flex-col justify-center gap-1">
              <p className="text-sm font-semibold text-[#2563EB] ">{profile.teamName}</p>
              <div className="flex gap-3 text-xs text-grey60">
                <p className="">분야 | {profile.sectorName}</p>
                <p className="">규모 | {profile.sizeType}</p>
              </div>
            </div>
          </div>
          <Image src="/assets/icons/>.svg" width={6} height={10} alt="arrow" />
        </div>

        <div className="mt-4 flex justify-end gap-[0.38rem] ">
          <button className="rounded-[0.28rem] bg-grey20 px-8 py-[0.56rem] text-sm">찜하기</button>
          <button className="rounded-[0.28rem] bg-grey100 px-8 py-[0.56rem] text-sm text-[#fff] ">열람하기</button>
        </div>
      </div>
    </div>
  )
}
