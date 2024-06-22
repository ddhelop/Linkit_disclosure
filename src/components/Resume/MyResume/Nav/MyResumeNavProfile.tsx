import { MemberNameResponse, MiniProfileResponse } from '@/lib/types'
import Image from 'next/image'

interface MyResumeNavProfileProps {
  data: MiniProfileResponse
  name: MemberNameResponse
}

export default function MyResumeNavProfile({ data, name }: MyResumeNavProfileProps) {
  return (
    <div className="flex w-full flex-col rounded-2xl bg-[#fff] px-[1.37rem] py-[1.31rem]">
      {/* title */}
      <div className="flex w-full justify-between">
        <h3 className="w-[60%] text-lg font-bold text-grey90">{data.profileTitle}</h3>
        <Image src="/assets/icons/option.svg" width={24} height={24} alt="option" />
      </div>

      <span className="pt-[0.57rem] text-sm text-[#2563EB]">{data.uploadDeadline ? '마감' : '마감 없음'}</span>

      {/* profile */}
      <div className="flex w-full flex-col items-center pt-[1.56rem]">
        <Image
          src={data.miniProfileImg ? data.miniProfileImg : '/assets/images/DefaultProfile.png'}
          width={110}
          height={110}
          alt="profile"
          className="rounded-[2.1rem]"
        />

        <span className="pt-5 text-sm font-semibold text-[#2563EB]">{name.memberName}</span>
        <span className="pt-1 text-sm text-grey60 opacity-60">{data.skillSets}</span>
      </div>

      <div className="mt-5 flex w-full gap-2 bg-grey10 p-3">
        <span className="text-sm">💬</span>
        <div className="flex w-full justify-center">
          <span className="text-sm text-grey90">{data.myValue}</span>
        </div>
      </div>
    </div>
  )
}
