import Image from 'next/image'
import React from 'react'

export default function MiniProfileCard_2() {
  return (
    <div className="flex w-[17.5rem] cursor-pointer flex-col rounded-xl bg-[#EDF3FF] p-[1.37rem] hover:border hover:border-main">
      {/* 첫째줄 */}
      <div className="flex justify-between">
        <div className="flex gap-2">
          <div className="rounded-[0.38rem] bg-white px-2 py-1 text-xs text-grey90">팀 찾는 중</div>
          <div className="rounded-[0.38rem] bg-white px-2 py-1 text-xs text-grey90">팀 찾는 중</div>
          <div className="rounded-[0.38rem] bg-white px-2 py-1 text-xs text-grey90">+2</div>
        </div>

        <Image src="/common/icons/save.svg" width={16} height={16} alt="save" />
      </div>

      <div className="mt-[1.59rem] flex gap-3">
        <Image src="/common/default_profile.svg" width={80} height={80} alt="profile" />
        <div className="flex flex-col justify-center">
          <span className="text-xs text-grey70">스크랩 수 50</span>
          <span className="text-lg font-bold text-grey90">김링킷</span>
          <span className="flex gap-1">
            <span className="text-xs text-grey50">포지션</span>
            <span className="text-xs text-grey50">|</span>
            <span className="text-xs text-grey70">기획</span>
          </span>
          <span className="flex gap-1">
            <span className="text-xs text-grey50">지역</span>
            <span className="pl-[0.655rem] text-xs text-grey50">|</span>
            <span className="text-xs text-grey70">서울시 마포구</span>
          </span>
        </div>
      </div>
      <hr className="my-3 border-grey40" />

      {/* 팀 목록 */}
      <div className="flex gap-4">
        <Image src="/common/default_profile.svg" width={40} height={40} alt="team" />
        <Image src="/common/default_profile.svg" width={40} height={40} alt="team" />
        <Image src="/common/default_profile.svg" width={40} height={40} alt="team" />
      </div>
    </div>
  )
}
