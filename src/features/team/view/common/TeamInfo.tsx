'use client'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getTeamInfo } from '../../api/teamApi'

interface TeamData {
  isMyTeam: boolean
  teamInformMenu: {
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

export default function TeamInfo() {
  const params = useParams()
  const [teamData, setTeamData] = useState<TeamData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const teamName = params.teamName as string
        const response = await getTeamInfo(teamName)
        setTeamData(response.result)
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

        <div className="mt-5 flex justify-center">
          <div className="flex gap-8">
            <Image
              src={teamInformMenu.teamLogoImagePath || '/common/default_profile.svg'}
              alt="team-profile"
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
    </div>
  )
}
