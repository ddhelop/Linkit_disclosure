'use client'
import { getTeamVisitors } from '@/features/team-view/api/TeamDataViewApi'
import Modal from '@/shared/ui/Modal/Modal'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'

import Link from 'next/link'
import { useParams } from 'next/navigation'

interface TeamVisitorModalProps {
  isOpen: boolean
  onClose: () => void
  teamName: string
}

export function TeamVisitorModal({ isOpen, onClose, teamName }: TeamVisitorModalProps) {
  // url params
  const { teamName: teamCode } = useParams()

  const { data: teamVisitors } = useQuery({
    queryKey: ['teamVisitors'],
    queryFn: () => getTeamVisitors(teamCode as string),
  })

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex h-[25rem] w-[22.8rem] flex-col overflow-y-auto px-5 pt-7">
        <h2 className="pl-2 text-sm text-grey90">{teamName}을 방문한 사람들이에요</h2>

        {/* 방문자 목록 */}
        <div className="mt-5 flex flex-col gap-4">
          {/* 임시 데이터 - API 연동 필요 */}
          {teamVisitors?.result?.visitInforms.map((teamVisitor, index) => (
            <Link
              href={`/${teamVisitor.emailId}`}
              key={index}
              className="flex cursor-pointer items-center justify-between rounded-xl border border-grey30 p-4 hover:bg-grey10"
            >
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10">
                  <Image
                    src={teamVisitor.profileImagePath || '/common/default_profile.svg'}
                    alt="visitor profile"
                    fill
                    className="rounded-lg"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className=" text-grey90">{teamVisitor.memberName}</span>
                  <span className="text-xs text-grey60">
                    {teamVisitor.profilePositionDetail.majorPosition} | {teamVisitor.regionDetail.cityName}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Modal>
  )
}
