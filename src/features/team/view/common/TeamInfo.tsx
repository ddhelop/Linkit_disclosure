'use client'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getTeamInfo, teamScrap } from '../../api/teamApi'
import Link from 'next/link'
import { Button } from '@/shared/ui/Button/Button'

interface TeamData {
  isMyTeam: boolean
  teamInformMenu: {
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

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const teamName = params.teamName as string
        const response = await getTeamInfo(teamName)
        setTeamData(response.result)
        setIsTeamScrap(response.result.teamInformMenu.isTeamScrap)
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
    if (isScrapLoading) return // 이미 처리 중이면 중복 요청 방지

    try {
      setIsScrapLoading(true)
      const response = await teamScrap(params.teamName, isTeamScrap)
      setIsTeamScrap(response.result.isTeamScrap)
    } catch (error) {
      console.error('Failed to scrap team:', error)
    } finally {
      setIsScrapLoading(false)
    }
  }

  // 매칭 요청
  const onClickTeamMatching = () => {
    alert('구현중')
  }

  return (
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
            onClick={onClickTeamMatching}
            className="flex w-[19rem] cursor-pointer justify-center gap-3 rounded-full bg-[#D3E1FE] px-[1.38rem] py-3"
          >
            <Image src="/common/icons/send.svg" alt="scrap" width={20} height={20} />
            <span className="text-sm font-semibold text-[#4D82F3]">매칭 요청하기</span>
          </div>
        </div>
      )}
    </div>
  )
}
