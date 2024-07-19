import React, { useEffect } from 'react'
import { TeamMemberAnnouncementResponse } from '@/lib/types'
import Image from 'next/image'

interface ModalProps {
  onClose: () => void
  data: TeamMemberAnnouncementResponse
}

const TeamAnnouncementModal: React.FC<ModalProps> = ({ onClose, data }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#000] bg-opacity-50"
      onClick={handleClickOutside}
    >
      <div className="flex w-[47rem] flex-col rounded-lg bg-[#fff] p-6 shadow-lg">
        <div className="flex justify-between">
          <h1 className="text-lg font-semibold">팀원 공고</h1>
          <button onClick={onClose} className="text-xl">
            &times;
          </button>
        </div>
        <div className="mt-4 rounded-[0.63rem] border border-grey30 p-5">
          <p className="text-sm text-grey60">{data.teamName}</p>
          <h2 className=" pt-[0.44rem] font-semibold">{data.jobRoleName}</h2>
          <div className="mt-[0.88rem] flex gap-2">
            {data.skillNames.map((skill, index) => (
              <span className="rounded-[0.31rem] border border-grey40 px-[0.88rem] py-1">{skill}</span>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4">
            <div>
              <h3 className="font-semibold">주요 업무</h3>
              <p className="mt-2 min-h-28 w-full rounded-[0.38rem] border border-grey30 p-[0.56rem] text-sm text-grey80">
                {data.mainBusiness}
              </p>
            </div>
            <div>
              <h3 className="mt-[1.38rem] font-semibold">지원 절차</h3>
              <p className="mt-2 min-h-28 w-full rounded-[0.38rem] border border-grey30 p-[0.56rem] text-sm text-grey80">
                {data.applicationProcess}
              </p>
            </div>
          </div>

          <div className="flex w-full justify-end">
            <button onClick={onClose} className="mt-6 rounded-lg bg-[#2563EB] px-4 py-2 text-[#fff]">
              지원하기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamAnnouncementModal
