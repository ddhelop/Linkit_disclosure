'use client'
import { useState } from 'react'
import ApplyModal from './ApplyModal'

import MiniTeamCard from '@/shared/components/MiniTeamCard'
import { useParams, useRouter } from 'next/navigation'
import { useToast } from '@/shared/hooks/useToast'
import { useAuthStore } from '@/shared/store/useAuthStore'
import { getTeamCard, getTeamRecruitment } from '../../api/TeamDataViewApi'
import { useQuery } from '@tanstack/react-query'
import TeamViewRecruitDetail from './TeamViewRecruitDetail'

export default function TeamViewRecruitmentProvider() {
  const [showApplyModal, setShowApplyModal] = useState(false)
  const router = useRouter()
  const toast = useToast()
  const { isLogin } = useAuthStore()
  const { teamName, id } = useParams()

  // 팀 카드 조회
  const { data } = useQuery({
    queryKey: ['teamInformMenu'],
    queryFn: () => getTeamCard(teamName as string),
  })
  const teamInfo = data?.result

  // 팀 채용 공고 상세 조회
  const { data: recruitmentDetailData } = useQuery({
    queryKey: ['teamRecruitment', teamName, id],
    queryFn: () => getTeamRecruitment(teamName as string, Number(id)),
  })
  const recruitmentDetail = recruitmentDetailData?.result

  const handleApply = () => {
    if (!isLogin) {
      toast.alert('로그인이 필요한 기능입니다.')
      router.push('/login')
      return
    }
    setShowApplyModal(true)
  }

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center gap-8 lg:w-[83%] lg:flex-row lg:items-start ">
        <div className="lg:w-[49rem]0 w-full">
          {recruitmentDetail && (
            <TeamViewRecruitDetail
              recruitmentDetail={recruitmentDetail}
              isTeamManager={teamInfo?.isTeamManager ?? false}
            />
          )}
        </div>

        <div className="">
          <div>{teamInfo && <MiniTeamCard teamInfo={teamInfo?.teamInformMenu} />}</div>
        </div>
      </div>

      {/* 플로팅 버튼 */}
      {!teamInfo?.isMyTeam && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2">
          <button
            className="w-[12.5rem] rounded-full bg-[#3774F4] py-4 text-base font-semibold text-white hover:bg-[#486FEE]"
            style={{ boxShadow: '0px 0px 6px 1px rgba(0, 0, 0, 0.20)' }}
            onClick={handleApply}
          >
            지원하기
          </button>
        </div>
      )}

      {/* 지원하기 모달 */}
      {showApplyModal && teamInfo && recruitmentDetail && (
        <ApplyModal
          teamInfo={teamInfo.teamInformMenu}
          recruitmentDetail={recruitmentDetail}
          onClose={() => setShowApplyModal(false)}
        />
      )}
    </>
  )
}
