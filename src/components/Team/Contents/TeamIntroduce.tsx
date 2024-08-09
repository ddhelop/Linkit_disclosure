'use client'

import { TeamProfileIntroductionResponse } from '@/lib/types'
import { useState } from 'react'

interface TeamCompletionProps {
  data: TeamProfileIntroductionResponse
}

export default function TeamIntroduce({ data }: TeamCompletionProps) {
  const [teamIntroduction, setTeamIntroduction] = useState(data.teamIntroduction || '')

  return (
    <div className="w-full rounded-2xl bg-[#fff] px-4 py-4 shadow-resume-box-shadow sm:px-[2.06rem] sm:py-[1.38rem]">
      {/* title */}
      <div className="flex items-center gap-[0.56rem]">
        <span className="text-lg font-semibold text-grey100">팀 소개</span>
      </div>

      {/* contents */}
      <div className="pt-[0.94rem] text-sm">
        <span className={teamIntroduction ? 'text-[#000]' : 'text-grey50'}>
          {teamIntroduction || '팀 소개가 없습니다.'}
        </span>
      </div>

      {/* buttons */}
    </div>
  )
}
