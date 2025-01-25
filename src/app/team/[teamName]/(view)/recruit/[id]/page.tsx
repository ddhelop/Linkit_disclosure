'use client'

import MiniTeamCard from '@/shared/components/MiniTeamCard'
import { Button } from '@/shared/ui/Button/Button'
import { getTeamInfo, getTeamAnnouncement, TeamAnnouncementDetail } from '@/features/team/api/teamApi'
import TeamViewRecruitDetail from '@/features/team/view/recruitment/TeamViewRecruitDetail'
import { useEffect, useState } from 'react'
import { TeamInfoResponse } from '@/features/team/types/team.types'
import ApplyModal from '@/features/team/view/recruitment/components/ApplyModal'

export default function TeamViewRecruitDetailPage({ params }: { params: { teamName: string; id: string } }) {
  const [teamInfo, setTeamInfo] = useState<TeamInfoResponse>()
  const [recruitmentDetail, setRecruitmentDetail] = useState<TeamAnnouncementDetail['result']>()
  const [showApplyModal, setShowApplyModal] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
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

  return (
    <>
      <div className="absolute left-0 flex h-[calc(100vh-4rem)] w-full justify-center bg-[#FCFCFD] pt-[3.63rem]">
        <div className="flex w-[83%] justify-center gap-8">
          <div className="w-[49rem]">
            {recruitmentDetail && <TeamViewRecruitDetail recruitmentDetail={recruitmentDetail} />}
          </div>
          <div>{teamInfo && <MiniTeamCard teamInfo={teamInfo} />}</div>
        </div>
      </div>

      {/* 플로팅 버튼 */}
      {!teamInfo?.result.isMyTeam && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2">
          <Button
            mode="main"
            size="custom"
            className="w-[12.5rem] rounded-xl py-4 text-base font-semibold hover:bg-[#486FEE]"
            onClick={() => setShowApplyModal(true)}
          >
            지원하기
          </Button>
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
