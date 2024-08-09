'use client'
import { accessTokenState } from '@/context/recoil-context'
import { GetOnBoardingData, PostRoleData } from '@/lib/action'
import { JobAndSkillResponse } from '@/lib/types'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

interface MyResumeCompletionProps {
  data: JobAndSkillResponse
}

export default function PrivateRole({ data }: MyResumeCompletionProps) {
  const [skills, setSkills] = useState<string[]>([])
  const [inputValue, setInputValue] = useState('')
  const [filteredSkills, setFilteredSkills] = useState<string[]>([])

  const [roleFields, setSelectedRoleFields] = useState<string[]>([])
  const accessToken = useRecoilValue(accessTokenState) || ''

  // 온보딩 데이터 fetch
  useEffect(() => {
    console.log('data', data)
    if (accessToken) {
      const profileRegionResponse = data
      if (profileRegionResponse) {
        setSelectedRoleFields(profileRegionResponse.jobRoleNames || [])
        setSkills(profileRegionResponse.skillNames || [])
      }
    }
  }, [accessToken, data])

  return (
    <div className="w-full rounded-2xl bg-[#fff] px-4 py-4 shadow-resume-box-shadow sm:px-[2.06rem] sm:py-[1.38rem]">
      {/* contents */}

      <>
        {/* 희망 역할 */}
        <div className="flex flex-col gap-[1.56rem]">
          <div className="flex flex-col gap-1">
            <span className="text-base font-semibold text-grey100 sm:text-lg">희망 역할</span>
            <div className="flex flex-wrap gap-2 pt-2">
              {roleFields.map((role, index) => (
                <div
                  key={index}
                  className="flex items-center rounded-[0.31rem] border border-grey40 px-3 py-2 text-sm sm:text-base"
                >
                  <span className="text-grey60">{role}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 보유 기술 */}
          <div className="flex flex-col gap-1">
            <span className="text-base font-semibold text-grey100 sm:text-lg">보유 역량</span>
            <div className="flex flex-wrap gap-2 pt-2">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center rounded-[0.31rem] border border-grey40 px-[0.88rem] py-2 text-sm sm:text-base"
                >
                  <span className="text-grey60">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    </div>
  )
}
