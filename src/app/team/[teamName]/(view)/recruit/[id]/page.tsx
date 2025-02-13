'use client'

import MiniTeamCard from '@/shared/components/MiniTeamCard'
import { Button } from '@/shared/ui/Button/Button'
import { getTeamInfo, getTeamAnnouncement, TeamAnnouncementDetail } from '@/features/team/api/teamApi'
import TeamViewRecruitDetail from '@/features/team/view/recruitment/TeamViewRecruitDetail'
import { useEffect, useState } from 'react'
import { TeamInfoResponse } from '@/features/team/types/team.types'
import ApplyModal from '@/features/team/view/recruitment/components/ApplyModal'
import { useAuthStore } from '@/shared/store/useAuthStore'
import { useRouter } from 'next/navigation'
import { useToast } from '@/shared/hooks/useToast'

export default function TeamViewRecruitDetailPage({ params }: { params: { teamName: string; id: string } }) {
  const [teamInfo, setTeamInfo] = useState<TeamInfoResponse>()
  const [recruitmentDetail, setRecruitmentDetail] = useState<TeamAnnouncementDetail['result']>()
  const [showApplyModal, setShowApplyModal] = useState(false)
  const { isLogin } = useAuthStore()
  const router = useRouter()
  const toast = useToast()

  useEffect(() => {
    const fetchData = async () => {
      try {
        window.scrollTo(0, 0)
        const [teamResponse, recruitmentResponse] = await Promise.all([
          getTeamInfo(params.teamName),
          getTeamAnnouncement(params.teamName, Number(params.id)),
        ])
        setTeamInfo(teamResponse)
        setRecruitmentDetail(recruitmentResponse.result)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      }
    }
    fetchData()
  }, [params.teamName, params.id])

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
      <div className="absolute left-0 flex w-full justify-center bg-[#FCFCFD] py-[3.63rem]">
        <div className="flex w-[83%] justify-center gap-8 ">
          <div className="w-[49rem] ">
            {recruitmentDetail && <TeamViewRecruitDetail recruitmentDetail={recruitmentDetail} />}
          </div>
          <div>{teamInfo && <MiniTeamCard teamInfo={teamInfo} />}</div>
        </div>
      </div>

      {/* 플로팅 버튼 */}
      {!teamInfo?.result.isMyTeam && (
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
          teamInfo={teamInfo.result.teamInformMenu}
          recruitmentDetail={recruitmentDetail}
          onClose={() => setShowApplyModal(false)}
        />
      )}
    </>
  )
}
