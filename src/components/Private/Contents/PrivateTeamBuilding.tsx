'use client'
import { accessTokenState } from '@/context/recoil-context'
import { PostProfileTeamBuildingField, TeamOnBoardingField } from '@/lib/action'
import { ProfileTeamBuildingFieldResponse } from '@/lib/types'
import { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil'

interface MyResumTeamBuildingFieldProps {
  data: ProfileTeamBuildingFieldResponse
}

export default function PrivateTeamBuilding({ data }: MyResumTeamBuildingFieldProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [options, setOptions] = useState(['해커톤', '공모전', '대회', '사이드 프로젝트', '포트폴리오'])

  useEffect(() => {
    setSelectedOptions(data.teamBuildingFieldNames)
    setOptions(options.filter((option) => !data.teamBuildingFieldNames?.includes(option)))
  }, [data.teamBuildingFieldNames, options])

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
