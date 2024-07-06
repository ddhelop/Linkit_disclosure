import { JobAndSkillResponse, MemberNameResponse, MiniProfileResponse } from '@/lib/types'
import Image from 'next/image'

interface MyResumeNavProfileProps {
  data: MiniProfileResponse
  name: MemberNameResponse
  jobAndSkill: JobAndSkillResponse
}

export default function MyResumeNavProfile({ data, name, jobAndSkill }: MyResumeNavProfileProps) {
  return (
    <div className="flex w-full flex-col rounded-2xl bg-[#fff] px-[1.37rem] py-[0.77rem]">
      {/* 마감 날짜 */}
      <span className=" text-sm text-[#2563EB]">{data?.uploadDeadline ? '마감' : '마감 없음'}</span>

      {/* title */}
      <div className="flex w-full justify-between pt-[0.43rem]">
        <h3 className="text-grey-100 w-[60%] text-[1.149rem] font-bold">{data?.profileTitle}</h3>
      </div>

      <div className="flex flex-wrap gap-[0.26rem] py-4">
        {data.myKeywordNames.map((keyword, index) => (
          <span className="rounded-[0.45rem] bg-[#D3E1FE33] bg-opacity-20 px-[0.57rem] py-[0.18rem] text-[0.76rem] text-[#2563EB]">
            {keyword}
          </span>
        ))}
      </div>

      {/* profile */}
      <div className="flex w-full items-center gap-4 ">
        <Image
          src={data?.miniProfileImg ? data?.miniProfileImg : '/assets/images/DefaultProfile.png'}
          width={42}
          height={42}
          alt="profile"
          className="min-h-[42px] rounded-[0.86rem]"
        />

        <div className="flex flex-col justify-center">
          <span className=" text-sm font-semibold text-[#2563EB]">{name?.memberName}</span>
          <div className="flex gap-2">
            {jobAndSkill.jobRoleNames.map((job, index) => (
              <span key={index} className="text-xs text-grey60">
                {job}
                {index < jobAndSkill.jobRoleNames.length - 1 && ', '}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 flex w-full gap-3 bg-grey10 p-3">
        <span className="text-sm">💬</span>
        <div className="flex w-full justify-start">
          <span className="text-sm text-grey90">{data?.myValue}</span>
        </div>
      </div>
    </div>
  )
}
