'use client'
import { useState } from 'react'
import { TeamMemberData } from '@/lib/types'

export default function TeamMember({ data }: { data: TeamMemberData }) {
  const [teamMembers, setTeamMembers] = useState<TeamMemberData[]>(Array.isArray(data) ? data : [])

  return (
    <div className="w-full rounded-2xl bg-[#fff] px-4 py-4 shadow-resume-box-shadow sm:px-[2.06rem] sm:py-[1.38rem]">
      {/* title */}
      <div className="flex items-center gap-[0.56rem]">
        <span className="text-lg font-semibold text-grey100">팀원 소개</span>
      </div>

      {teamMembers.length > 0 ? (
        teamMembers.map((member, index) => (
          <div
            key={member.id}
            className="mt-[0.94rem] flex items-center justify-between rounded-[0.31rem] border border-grey30 p-5"
          >
            <div className="flex flex-col justify-center">
              <p className="text-sm">
                {member.teamMemberName} | {member.teamMemberRole}
              </p>
              <div className="flex pt-[0.44rem]">
                <div className="text-xs text-grey60 sm:text-sm">{member.teamMemberIntroductionText}</div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="pt-4 text-grey50">팀원을 등록하지 않았어요.</div>
      )}
    </div>
  )
}
