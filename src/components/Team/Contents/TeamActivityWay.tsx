'use client'

import { ActivityResponse } from '@/lib/types'
import Image from 'next/image'

interface TeamResumTeamBuildingProps {
  data: ActivityResponse
}

export default function TeamActivityWay({ data }: TeamResumTeamBuildingProps) {
  return (
    <div className="w-full rounded-2xl bg-[#fff] px-[2.06rem] py-[1.38rem] shadow-resume-box-shadow">
      {/* title */}
      <div className="flex items-center gap-[0.56rem]">
        <span className="text-lg font-semibold text-grey100">활동 방식</span>
      </div>

      {/* contents */}

      <>
        {/* 활동 방식 */}
        <div className="flex w-full gap-x-2 pt-4">
          {data?.activityTagName.map((tag, index) => (
            <span key={index} className="w-auto rounded-[0.31rem] border border-grey40 px-[0.88rem] py-2 text-grey60">
              {tag}
            </span>
          ))}
        </div>
        {/* 활동 지역/위치 */}
        <div className="flex flex-col pt-[2.19rem]">
          <p className="text-lg font-semibold">활동지역/위치</p>
          <div className="flex gap-[0.38rem] pt-4">
            <Image src="/assets/icons/location.svg" width={24} height={24} alt="location" />
            <p>
              {data?.cityName}, {data?.divisionName}
            </p>
          </div>
        </div>
      </>
    </div>
  )
}
