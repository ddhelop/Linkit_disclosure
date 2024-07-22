'use client'
import { useState, useEffect } from 'react'
import { JobAndSkillResponse, MemberNameResponse, MiniProfileResponse } from '@/lib/types'
import { GetOnBoardingData } from '@/lib/action'
import Image from 'next/image'
import MiniProfileModal from './MiniProfileModal'
import { useRecoilState } from 'recoil'
import { accessTokenState } from '@/context/recoil-context'

interface MyResumeNavProfileProps {
  data: MiniProfileResponse
  name: MemberNameResponse
  jobAndSkill: JobAndSkillResponse
}

export default function MyResumeNavProfile({ data, name, jobAndSkill }: MyResumeNavProfileProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [profileData, setProfileData] = useState<MiniProfileResponse | null>(data)
  const [jobAndSkillData, setJobAndSkillData] = useState<JobAndSkillResponse | null>(jobAndSkill)
  const accessToken = useRecoilState(accessTokenState)[0] || ''

  const handleModalOpen = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    fetchProfileData() // 모달이 닫힐 때 데이터 리패칭
  }

  const fetchProfileData = async () => {
    if (!accessToken) return
    try {
      const response = await GetOnBoardingData(accessToken)
      if (response.miniProfileResponse && response.jobAndSkillResponse) {
        setProfileData(response.miniProfileResponse)
        setJobAndSkillData(response.jobAndSkillResponse)
      }
    } catch (error) {
      console.error('Failed to fetch updated profile data:', error)
    }
  }

  useEffect(() => {
    fetchProfileData()
  }, [accessToken])

  return (
    <div className="flex w-full flex-col rounded-2xl border border-grey30 bg-[#fff] px-[1.02rem] py-[0.77rem]">
      {/* title */}
      <div className="flex w-full justify-between pt-[0.43rem]">
        <h3 className="text-grey-100 w-[100%] text-[1.279rem] font-bold">{profileData?.profileTitle}</h3>
      </div>

      <div className="mt-[0.77rem] flex gap-[0.26rem]">
        {profileData?.myKeywordNames?.map((keyword, index) => (
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
          src={profileData?.miniProfileImg ? profileData.miniProfileImg : '/assets/images/DefaultProfile.png'}
          width={42}
          height={42}
          alt="profile"
          className="min-h-[42px] rounded-full"
        />

        <div className="flex flex-col justify-center">
          <span className=" text-[0.76rem] font-semibold text-grey90">{profileData?.memberName}</span>
          <div className="flex gap-2">
            {jobAndSkillData?.jobRoleNames?.map((job, index) => (
              <span key={index} className="text-xs text-grey60">
                {job}
                {index < jobAndSkillData.jobRoleNames.length - 1 && ', '}
              </span>
            ))}
          </div>
        </div>
      </div>
      <button onClick={handleModalOpen} className="mt-[0.88rem] rounded-[0.25rem] bg-grey20 py-[0.56rem] text-sm">
        수정하기
      </button>

      <MiniProfileModal isOpen={isModalOpen} onClose={handleModalClose} />
    </div>
  )
}
