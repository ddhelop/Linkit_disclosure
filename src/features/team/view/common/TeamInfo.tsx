'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getTeamInfo, teamScrap } from '../../api/teamApi'
import { Button } from '@/shared/ui/Button/Button'
import { useMatching } from '@/shared/hooks/useMatching'
import MatchingModal from '@/features/profile/view/component/common/MatchingModal'
import MatchingRequestModal from '@/features/profile/view/component/common/MatchingRequestModal'
import { useToast } from '@/shared/hooks/useToast'

interface TeamData {
  isMyTeam: boolean
  teamInformMenu: {
    teamCode: string
    isTeamScrap: boolean
    teamCurrentStates: Array<{ teamStateName: string }>
    teamName: string
    teamShortDescription: string
    teamLogoImagePath: string
    teamScaleItem: {
      teamScaleName: string
    }
    regionDetail: {
      cityName: string
      divisionName: string
    }
  }
}

export default function TeamInfo({ params }: { params: { teamName: string } }) {
  const [teamData, setTeamData] = useState<TeamData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isScrapLoading, setIsScrapLoading] = useState(false)
  const [isTeamScrap, setIsTeamScrap] = useState(false)
  const router = useRouter()
  const toast = useToast()

  const {
    isProfileModalOpen,
    isRequestModalOpen,
    matchingData,
    selectedProfile,
    onClickMatching,
    handleSelectProfile,
    handleCloseModals,
    type,
  } = useMatching({
    type: 'TEAM',
    id: teamData?.teamInformMenu?.teamCode || '',
  })

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const teamName = params.teamName as string
        const response = await getTeamInfo(teamName)
        if (response.isSuccess) {
          setTeamData(response.result)
          setIsTeamScrap(response.result.teamInformMenu.isTeamScrap)
        }
      } catch (error) {
        console.error('Failed to fetch team data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTeamData()
  }, [params.teamName])

  if (isLoading) return <div>Loading...</div>
  if (!teamData) return <div>Team not found</div>

  const { teamInformMenu } = teamData

  // 팀 스크랩
  const onClickTeamScrap = async () => {
    if (isScrapLoading) return

    const newScrapState = !isTeamScrap

    // 즉시 UI 업데이트
    setIsTeamScrap(newScrapState)

    try {
      setIsScrapLoading(true)
      const data = await teamScrap(params.teamName, newScrapState)

      if (data.isSuccess) {
        toast.success('스크랩 상태가 변경되었습니다.')
      } else {
        // API 실패시 원래 상태로 롤백
        setIsTeamScrap(!newScrapState)
        toast.alert(data.message || '스크랩 상태 변경에 실패했습니다.')
      }
    } catch (error) {
      // 에러 발생시 원래 상태로 롤백
      setIsTeamScrap(!newScrapState)
      console.error('Failed to update scrap:', error)
      toast.alert('스크랩 상태 변경에 실패했습니다.')
    } finally {
      setIsScrapLoading(false)
    }
  }

  return (
    <>
      <div className="flex w-full justify-between">
        <div className="flex flex-col">
          <div className="flex gap-2">
            {teamInformMenu.teamCurrentStates.map((state, index) => (
              <span key={index} className="rounded-[0.38rem] bg-[#4D82F3] px-2 py-1 text-xs text-white">
                {state.teamStateName}
              </span>
            ))}
          </div>

          <div className="mt-5 flex justify-between">
            <div className="flex gap-8">
              <Image
                src={teamInformMenu.teamLogoImagePath || '/common/default_profile.svg'}
                alt="team-profile"
                className="rounded-xl"
                width={132}
                height={132}
              />
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-grey90">{teamInformMenu.teamName}</h1>
                </div>

                <div className="mt-2 flex flex-col gap-1">
                  <span className="flex gap-2 text-xs text-grey50">
                    팀원 | <span className="text-grey70">{teamInformMenu.teamScaleItem.teamScaleName}</span>
                  </span>
                  <span className="flex gap-2 text-xs text-grey50">
                    지역 |{' '}
                    <span className="text-grey70">
                      {teamInformMenu.regionDetail.cityName} {teamInformMenu.regionDetail.divisionName}
                    </span>
                  </span>

                  <span className="mt-2 text-xs text-grey70">{teamInformMenu.teamShortDescription}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {teamData.isMyTeam ? (
          <div className="mt-12">
            <Button
              onClick={() => {
                router.push(`/team/${params.teamName}/edit/log`)
              }}
              animationMode="grey"
              className=" flex gap-2 rounded-full border border-grey30 bg-white px-6 py-3 text-sm text-grey60"
              mode="custom"
            >
              <Image src="/common/icons/pencil.svg" alt="edit" width={16} height={16} />
              수정하기
            </Button>
          </div>
        ) : (
          <div className="mt-12 flex flex-col gap-5">
            <div
              onClick={onClickTeamScrap}
              className="flex w-[19rem] cursor-pointer justify-center gap-3 rounded-full bg-[#D3E1FE] px-[1.38rem] py-3"
            >
              <Image
                src={isTeamScrap ? '/common/icons/save.svg' : '/common/icons/not_save.svg'}
                alt="scrap"
                width={20}
                height={20}
              />
              <span className="text-sm font-semibold text-[#4D82F3]">스크랩 하기</span>
            </div>
            <div
              onClick={onClickMatching}
              className="flex w-[19rem] cursor-pointer justify-center gap-3 rounded-full bg-[#D3E1FE] px-[1.38rem] py-3"
            >
              <Image src="/common/icons/send.svg" alt="scrap" width={20} height={20} />
              <span className="text-sm font-semibold text-[#4D82F3]">매칭 요청하기</span>
            </div>
          </div>
        )}
      </div>

      <MatchingModal
        isOpen={isProfileModalOpen}
        onClose={handleCloseModals}
        matchingData={matchingData}
        onSelectProfile={handleSelectProfile}
        type="TEAM"
      />

      <MatchingRequestModal
        isOpen={isRequestModalOpen}
        onClose={handleCloseModals}
        selectedProfile={selectedProfile}
        receiverProfile={
          type === 'TEAM' && matchingData && 'receiverTeamInformation' in matchingData
            ? matchingData.receiverTeamInformation
            : null
        }
        type="TEAM"
      />
    </>
  )
}
