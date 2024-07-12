'use client'
import { useState } from 'react'
import { TeamMemberData } from '@/lib/types'

interface TeamMemberProps {
  data: TeamMemberData[]
}

export default function TeamMember({ data }: TeamMemberProps) {
  const [teamMembers, setTeamMembers] = useState<TeamMemberData[]>(Array.isArray(data) ? data : [])

  return (
    <div className="w-full rounded-2xl bg-[#fff] px-[2.06rem] py-[1.38rem] shadow-resume-box-shadow">
      {/* title */}
      <div className="flex items-center gap-[0.56rem]">
        <span className="text-lg font-semibold text-grey100">팀원 소개</span>
      </div>

      {teamMembers.length > 0 ? (
        teamMembers.map((member, index) => (
          <div key={member.id} className="mt-[0.94rem] flex items-center justify-between border border-grey30 p-5">
            <div className="flex flex-col">
              <p className="text-sm text-grey60">(주)링킷</p>
              <p className="pt-[0.44rem]">
                {member.teamMemberName} | {member.teamMemberRole}
              </p>
              <div className="flex pt-[0.44rem]">
                <div className="text-sm text-grey60">{member.teamMemberIntroductionText}</div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="pt-4 text-grey60">팀원을 등록하지 않았어요.</div>
      )}
    </div>
  )
}
