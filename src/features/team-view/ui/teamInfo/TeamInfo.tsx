'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { TeamScrapButton } from './TeamScrapButton'
import { TeamMatchingButton } from './TeamMatchingButton'
import { TeamDeleteActions } from './TeamDeleteActions'
import { TeamInvitationActions } from './TeamInvitationActions'
import { TeamDropdownMenu } from './TeamDropdownMenu'
import { getTeamDetail } from '@/features/team-view/api/TeamDataViewApi'
import { useQuery } from '@tanstack/react-query'

export default function TeamInfo({ teamName }: { teamName: string }) {
  const router = useRouter()

  const { data } = useQuery({
    queryKey: ['teamInfo', teamName],
    queryFn: () => getTeamDetail(teamName),
  })
  const teamData = data?.result.teamInformMenu

  return (
    <>
      <div className="flex w-full flex-col lg:flex-row lg:justify-between lg:gap-8">
        <div className="flex flex-col">
          <div className="flex gap-2">
            {teamData?.teamCurrentStates.map((state, index) => (
              <span key={index} className="rounded-[0.38rem] bg-[#4D82F3] px-2 py-1 text-xs text-white">
                {state.teamStateName}
              </span>
            ))}
          </div>

          <div className="mt-5 flex justify-between">
            <div className="flex items-center gap-8">
              <div className="relative aspect-square h-[90px] w-[90px] rounded-xl md:h-[8rem] md:w-[8rem]">
                <Image
                  src={teamData?.teamLogoImagePath || '/common/default_profile.svg'}
                  alt="team-profile"
                  className="rounded-xl object-cover"
                  fill
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex flex-col gap-3 md:flex-row md:items-center">
                  <h1 className="text-2xl font-bold text-grey90">{teamData?.teamName}</h1>
                  <div className="flex gap-2">
                    <span className="text-xs text-grey70">스크랩 수 {teamData?.teamScrapCount}</span>
                    {data?.result.isMyTeam && (
                      <TeamDropdownMenu
                        teamCode={teamData?.teamCode ?? ''}
                        onDeleteTeam={() => router.push(`/team/${teamName}/delete`)}
                      />
                    )}
                  </div>
                </div>

                <div className="mt-2 flex flex-col gap-1">
                  <span className="flex gap-2 text-xs text-grey50">
                    팀원 | <span className="text-grey70">{teamData?.teamScaleItem.teamScaleName}</span>
                  </span>
                  <span className="flex gap-2 text-xs text-grey50">
                    지역 |{' '}
                    <span className="text-grey70">
                      {teamData?.regionDetail.cityName} {teamData?.regionDetail.divisionName}
                    </span>
                  </span>

                  <span className="mt-2 text-xs text-grey70">{teamData?.teamShortDescription}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {data?.result.isMyTeam ? (
          // 내 팀인 경우
          data?.result.isTeamManager ? (
            // 관리자인 경우
            <div className="mt-5 lg:mt-12">
              <TeamDeleteActions
                teamName={teamData?.teamName ?? ''}
                teamCode={teamData?.teamCode ?? ''}
                isTeamDeleteInProgress={data?.result.isTeamDeleteInProgress ?? false}
                isTeamDeleteRequester={data?.result.isTeamDeleteRequester ?? false}
              />
            </div>
          ) : (
            // 일반 멤버인 경우
            <div className="mt-12 flex flex-col gap-5">
              <TeamScrapButton
                teamName={teamName}
                initialIsScrap={teamData?.isTeamScrap ?? false}
                teamScrapCount={teamData?.teamScrapCount ?? 0}
              />
              <TeamMatchingButton teamCode={teamData?.teamCode ?? ''} />
            </div>
          )
        ) : // 내 팀이 아닌 경우
        data?.result.isTeamInvitationInProgress ? (
          // 초대 대기중
          <TeamInvitationActions teamCode={teamData?.teamCode ?? ''} />
        ) : (
          // 일반 외부인
          <div className="mt-6 flex flex-row gap-5 lg:mt-12 lg:flex-col">
            <TeamScrapButton
              teamName={teamName}
              initialIsScrap={teamData?.isTeamScrap ?? false}
              teamScrapCount={teamData?.teamScrapCount ?? 0}
            />
            <TeamMatchingButton teamCode={teamData?.teamCode ?? ''} />
          </div>
        )}
      </div>
    </>
  )
}
