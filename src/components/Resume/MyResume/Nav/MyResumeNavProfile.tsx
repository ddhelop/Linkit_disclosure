import { JobAndSkillResponse, MemberNameResponse, MiniProfileResponse } from '@/lib/types'
import Image from 'next/image'

interface MyResumeNavProfileProps {
  data: MiniProfileResponse
  name: MemberNameResponse
  jobAndSkill: JobAndSkillResponse
}

export default function MyResumeNavProfile({ data, name, jobAndSkill }: MyResumeNavProfileProps) {
  return (
    <div className="flex w-full flex-col rounded-2xl border border-grey30 bg-[#fff] px-[1.02rem] py-[0.77rem]">
      {/* title */}
      <div className="flex w-full justify-between pt-[0.43rem]">
        <h3 className="text-grey-100 w-[60%] text-[1.279rem] font-bold">{data?.profileTitle}</h3>
      </div>

      <div className="mt-[0.77rem] flex gap-[0.26rem]">
        {data.myKeywordNames?.map((keyword, index) => (
          <span
            key={index}
            className="mb-[2rem] rounded-[0.45rem] bg-grey10 px-[0.57rem] py-[0.18rem] text-[0.89rem] text-grey60"
          >
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
          className="min-h-[42px] rounded-full"
        />

        <div className="flex flex-col justify-center">
          <span className=" text-[0.76rem] font-semibold text-grey90">{data?.memberName}</span>
          <div className="flex gap-2">
            {jobAndSkill.jobRoleNames?.map((job, index) => (
              <span key={index} className="text-xs text-grey60">
                {job}
                {index < jobAndSkill.jobRoleNames.length - 1 && ', '}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
