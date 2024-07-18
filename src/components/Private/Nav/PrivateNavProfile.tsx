'use client'
import RequestMatchModal from '@/components/Match/common/RequestMatchModal'
import { JobAndSkillResponse, MemberNameResponse, MiniProfileResponse } from '@/lib/types'
import Image from 'next/image'
import { useState } from 'react'

interface MyResumeNavProfileProps {
  data: MiniProfileResponse
  name: MemberNameResponse
  jobAndSkill: JobAndSkillResponse
}

export default function PrivateNavProfile({ data, name, jobAndSkill }: MyResumeNavProfileProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleMatchButtonClick = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="flex w-full flex-col rounded-2xl bg-[#fff] px-[1.37rem] py-[0.77rem]">
      {/* title */}
      <div className="flex w-full justify-between pt-[0.43rem]">
        <h3 className="text-grey-100 w-[60%] text-[1.149rem] font-bold">{data?.profileTitle}</h3>
        <Image src="/assets/icons/saveIcon.svg" width={16} height={16} alt="edit" className="cursor-pointer" />
      </div>

      <div className="flex flex-wrap gap-[0.26rem] py-4">
        {data.myKeywordNames?.map((keyword, index) => (
          <span
            key={index}
            className="rounded-[0.45rem] bg-[#D3E1FE33] bg-opacity-20 px-[0.57rem] py-[0.18rem] text-[0.76rem] text-[#2563EB]"
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
          className="min-h-[42px] rounded-[0.86rem]"
        />

        <div className="flex flex-col justify-center gap-1">
          <span className=" text-sm font-semibold text-grey70">{data?.memberName}</span>
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

      <button
        className="mt-[0.88rem] w-full rounded bg-grey100 py-[0.56rem] text-center text-sm text-[#fff]"
        onClick={handleMatchButtonClick}
      >
        매칭하기
      </button>

      {isModalOpen && <RequestMatchModal onClose={closeModal} />}
    </div>
  )
}
