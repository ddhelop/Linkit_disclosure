import { useEffect, useState } from 'react'
import { PrivateProfile } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'

interface TeamMemberMiniProfileProps {
  profile: PrivateProfile
}

export default function TeamMemberMiniProfile({ profile }: TeamMemberMiniProfileProps) {
  console.log(profile)
  return (
    <div className="flex w-[25rem] flex-col gap-[2rem] rounded-[0.63rem] bg-[#fff] p-5">
      <div className="flex w-full justify-between">
        <div className="w-[80%] text-xl font-semibold leading-8 opacity-80">{profile.profileTitle}</div>
        <Image src="/assets/icons/saveIcon.svg" width={17} height={20} alt="save" className="cursor-pointer" />
      </div>

      <div className="flex flex-col">
        <div className="flex flex-wrap gap-2">
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
              <p className="font-semibold text-grey70">{profile.memberName}</p>
              <p className="text-sm text-grey60">역할1, 역할2</p>
            </div>
          </div>
          <Link href={`/private/${profile.id}`}>
            <button className="rounded-[0.29rem] bg-grey100 px-7 py-[0.57rem] text-[#fff]">보기</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
