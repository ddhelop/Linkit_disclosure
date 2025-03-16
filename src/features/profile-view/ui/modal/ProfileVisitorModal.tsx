'use client'
import Modal from '@/shared/ui/Modal/Modal'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { getProfileVisitors } from '../../api/ProfileViewApi'
import Link from 'next/link'

interface ProfileVisitorModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ProfileVisitorModal({ isOpen, onClose }: ProfileVisitorModalProps) {
  const { data: profileVisitors } = useQuery({
    queryKey: ['profileVisitors'],
    queryFn: () => getProfileVisitors(),
  })

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex h-[25rem] w-[22.8rem] flex-col overflow-y-auto px-5 pt-7">
        <h2 className="pl-2 text-sm text-grey90">나의 프로필을 방문한 사람들이에요</h2>

        {/* 방문자 목록 */}
        <div className="mt-5 flex flex-col gap-4">
          {/* 임시 데이터 - API 연동 필요 */}
          {profileVisitors?.result?.visitInforms.map((profileVisitor, index) => (
            <Link
              href={`/${profileVisitor.emailId}`}
              key={index}
              className="flex cursor-pointer items-center justify-between rounded-xl border border-grey30 p-4 hover:bg-grey10"
            >
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10">
                  <Image
                    src={profileVisitor.profileImagePath || '/common/default_profile.svg'}
                    alt="visitor profile"
                    fill
                    className="rounded-lg"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className=" text-grey90">{profileVisitor.memberName}</span>
                  <span className="text-xs text-grey60">
                    {profileVisitor.profilePositionDetail.majorPosition} | {profileVisitor.regionDetail.cityName}
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
