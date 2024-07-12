'use client'

import { TeamMemberAnnouncementResponse } from '@/lib/types'

interface teamMemberAnnouncementProps {
  data: TeamMemberAnnouncementResponse[]
}

export default function TeamMemberAnnouncement({ data }: teamMemberAnnouncementProps) {
  return (
    <div className="flex w-full flex-col gap-[0.94rem] rounded-2xl bg-[#fff] px-[2.06rem] py-[1.38rem] shadow-resume-box-shadow">
      {/* title */}
      <div className="flex items-center gap-[0.56rem]">
        <span className="text-lg font-semibold text-grey100">팀원 공고</span>
      </div>
    </div>
  )
}
