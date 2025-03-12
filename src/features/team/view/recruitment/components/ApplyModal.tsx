'use client'

import { useRef, useState } from 'react'
import { useOnClickOutside } from '@/shared/hooks/useOnClickOutside'
import Image from 'next/image'

import { Button } from '@/shared/ui/Button/Button'
import Textarea from '@/shared/ui/TextArea/TextArea'
import { TeamAnnouncementDetail } from '@/features/team/api/teamApi'
import { sendMatchingRequest } from '@/features/match/api/MatchApi'
import { useAuthStore } from '@/shared/store/useAuthStore'
import { useToast } from '@/shared/hooks/useToast'
import { TeamData } from '@/features/team/types/team.types'

interface ApplyModalProps {
  teamInfo: TeamData['teamInformMenu']
  recruitmentDetail: TeamAnnouncementDetail['result']
  onClose: () => void
}

export default function ApplyModal({ teamInfo, recruitmentDetail, onClose }: ApplyModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [applyMessage, setApplyMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { emailId } = useAuthStore()
  const toast = useToast()

  useOnClickOutside({
    refs: [modalRef],
    handler: onClose,
    isEnabled: true,
  })

  const handleApply = async () => {
    if (!emailId) return

    try {
      setIsLoading(true)
      await sendMatchingRequest({
        senderType: 'PROFILE',
        receiverType: 'ANNOUNCEMENT',
        senderEmailId: emailId,
        receiverTeamCode: teamInfo.teamCode,
        receiverAnnouncementId: recruitmentDetail.teamMemberAnnouncementId,
        requestMessage: applyMessage,
      })

      toast.success('지원 요청이 완료되었습니다.')
      onClose()
    } catch (error) {
      console.error('Failed to send matching request:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
      <div ref={modalRef} className="z-50 w-[42rem] rounded-2xl bg-white p-8">
        {/* 팀 정보 헤더 */}
        <div className="flex items-center gap-4">
          <Image
            src={teamInfo.teamLogoImagePath || '/common/images/default_team.svg'}
            alt="team profile"
            width={56}
            height={56}
            className="h-14 w-14 rounded-lg object-cover"
          />
          <div>
            <p className="text-sm text-grey60">
              {teamInfo.teamScaleItem.teamScaleName} · {teamInfo.regionDetail.cityName}{' '}
              {teamInfo.regionDetail.divisionName}
            </p>
          </div>
        </div>

        {/* 공고 제목 */}
        <h2 className="mt-3 font-semibold text-grey90">{recruitmentDetail.announcementTitle}</h2>

        {/* 기술 스택 */}
        <div className="mt-3 flex flex-wrap gap-2">
          <div className="rounded-[0.38rem] bg-[#D3E1FE] px-4 py-1 text-sm text-[#2563EB]">
            {recruitmentDetail.announcementPositionItem.majorPosition}
          </div>
          {recruitmentDetail.announcementSkillNames.map((skill) => (
            <div
              key={skill.announcementSkillName}
              className="rounded-[0.38rem] bg-[#EDF3FF] px-4 py-1 text-sm text-[#2563EB]"
            >
              {skill.announcementSkillName}
            </div>
          ))}
        </div>

        {/* 안내 메시지 입력창 */}
        <div className="mt-5">
          <Textarea
            value={applyMessage}
            onChange={(e) => setApplyMessage(e.target.value)}
            placeholder={`나를 어필할 수 있는 내용을 입력해 주세요\n페이지를 떠나면 내용이 저장되지 않으니 미리 복사해 두었다가 붙여넣어 사용할 수 있어요`}
            className="h-[160px] max-h-[5.25rem] min-h-[5.25rem] w-full resize-none overflow-y-auto rounded-xl bg-[#F8F9FD] p-4 text-sm text-grey80"
          />
        </div>

        {/* 버튼 영역 */}
        <div className="mt-8 flex gap-3">
          <Button
            mode="custom"
            size="custom"
            className="flex-1 rounded-xl bg-grey30 py-4 text-base font-normal text-grey80"
            onClick={onClose}
          >
            취소하기
          </Button>
          <Button
            mode="main"
            size="custom"
            className="flex-1 rounded-xl py-4 text-base font-semibold"
            disabled={isLoading}
            onClick={handleApply}
          >
            {isLoading ? '지원 중...' : '공고 지원하기'}
          </Button>
        </div>
      </div>
    </div>
  )
}
