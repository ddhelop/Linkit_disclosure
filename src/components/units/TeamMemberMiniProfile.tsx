import { useEffect, useState } from 'react'
import { PrivateProfile } from '@/lib/types'
import Image from 'next/image'

interface TeamMemberMiniProfileProps {
  profile: PrivateProfile
}

export default function TeamMemberMiniProfile({ profile }: TeamMemberMiniProfileProps) {
  const [dDay, setDDay] = useState<number | null>(null)

  useEffect(() => {
    const calculateDDay = () => {
      const uploadDate = new Date(profile.uploadPeriod)
      const currentDate = new Date()
      const diffTime = uploadDate.getTime() - currentDate.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      setDDay(diffDays)
    }

    calculateDDay()
  }, [profile.uploadPeriod])

  return (
    <div className="flex h-[18.5rem] w-[23rem] flex-col gap-[2.69rem] rounded-[0.63rem] bg-[#fff] p-5">
      <div className="flex w-full justify-between">
        <p className="text-sm font-semibold text-[#2563EB]">{dDay !== null ? `D-${dDay}` : 'D-Loading...'}</p>
        <Image src="/assets/icons/saveIcon.svg" width={17} height={20} alt="save" className="cursor-pointer" />
      </div>

      <div className="w-[80%] text-xl font-semibold leading-8 opacity-80">{profile.profileTitle}</div>

      <div className="flex flex-col">
        <div className="flex flex-wrap">
          {profile.myKeywordNames.map((keyword, index) => (
            <div
              key={index}
              className="rounded-[0.45rem] bg-[#D3E1FE33] bg-opacity-20 px-[0.57rem] py-1 text-[#2563EB]"
            >
              {keyword}
            </div>
          ))}
        </div>

        <div className="flex justify-between pt-[0.94rem]">
          <div className="flex gap-4">
            <Image
              src={profile.miniProfileImg || '/assets/images/DefaultProfile.png'}
              width={55}
              height={55}
              alt="Profile Image"
              className="rounded-full"
            />
            <div className="flex flex-col justify-center gap-1">
              <p className="font-semibold text-grey70">이름</p>
              <p className="text-sm text-grey60">역할1, 역할2</p>
            </div>
          </div>
          <button className="rounded-[0.29rem] bg-grey100 px-7 py-[0.57rem] text-[#fff]">보기</button>
        </div>
      </div>
    </div>
  )
}
