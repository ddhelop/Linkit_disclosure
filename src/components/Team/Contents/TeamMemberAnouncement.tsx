'use client'

import TeamAnnouncementModal from '@/components/common/component/Team/TeamAnnouncementModal'
import { TeamMemberAnnouncementResponse } from '@/lib/types'
import { useState } from 'react'

interface TeamMemberAnnouncementProps {
  data: TeamMemberAnnouncementResponse[]
}

export default function TeamMemberAnnouncement({ data }: TeamMemberAnnouncementProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<TeamMemberAnnouncementResponse | null>(null)

  const handleModalOpen = (announcement: TeamMemberAnnouncementResponse) => {
    setSelectedAnnouncement(announcement)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedAnnouncement(null)
  }

  return (
    <div className="flex w-full flex-col gap-[0.94rem] rounded-2xl bg-[#fff] px-[2.06rem] py-[1.38rem] shadow-resume-box-shadow">
      {/* title */}
      <div className="flex items-center gap-[0.56rem]">
        <span className="text-lg font-semibold text-grey100">팀원 공고</span>
      </div>

      <div className="flex cursor-pointer flex-col gap-[0.94rem] ">
        {data.map((announcement) => (
          <div
            key={announcement.id}
            onClick={() => handleModalOpen(announcement)}
            className="flex flex-col rounded-lg border border-grey30 p-[1.25rem] hover:bg-grey10"
          >
            <p className="text-sm text-grey60">{announcement?.teamName}</p>
            <p className="mt-[0.44rem] font-semibold text-grey100">{announcement.jobRoleName}</p>

            <div className="flex justify-between">
              <div className="mt-[0.88rem] flex gap-2">
                {announcement?.skillNames?.map((skill, index) => (
                  <div
                    key={index}
                    className="rounded-[0.31rem] border border-grey40 px-[0.88rem] py-[0.88rem] text-sm text-grey60 "
                  >
                    {skill}
                  </div>
                ))}
              </div>
              <p className="cursor-pointer text-sm text-grey60">자세히 보기 </p>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && selectedAnnouncement && (
        <TeamAnnouncementModal onClose={handleModalClose} data={selectedAnnouncement} />
      )}
    </div>
  )
}
