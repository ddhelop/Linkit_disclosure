'use client'
import { PostProfileTeamBuildingField, PostTeamBuildingField } from '@/lib/action'
import { TeamProfileTeamBuildingFieldResponse } from '@/lib/types'

import { useState, useEffect } from 'react'

interface TeamResumTeamBuildingProps {
  data: TeamProfileTeamBuildingFieldResponse
}

export default function TeamBuildingComponent({ data }: TeamResumTeamBuildingProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [options, setOptions] = useState(['해커톤', '공모전', '대회', '사이드 프로젝트', '포트폴리오'])

  useEffect(() => {
    if (data.teamProfileTeamBuildingFieldNames) {
      setSelectedOptions(data.teamProfileTeamBuildingFieldNames)
      setOptions(options.filter((option) => !data.teamProfileTeamBuildingFieldNames.includes(option)))
    }
  }, [data.teamProfileTeamBuildingFieldNames, options])

  return (
    <div className="w-full rounded-2xl bg-[#fff] px-[2.06rem] py-[1.38rem] shadow-resume-box-shadow">
      {/* title */}
      <div className="flex items-center gap-[0.56rem]">
        <span className="text-lg font-semibold text-grey100">희망 팀빌딩 분야</span>
      </div>

      {/* contents */}

      <div className="flex flex-wrap gap-2 pt-[1.56rem]">
        {selectedOptions?.map((option, index) => (
          <div key={index} className="flex items-center rounded-lg border border-grey40 px-3 py-1">
            <span className="text-grey60">{option}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
