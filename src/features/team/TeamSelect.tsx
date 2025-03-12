'use client'
import { useRouter } from 'next/navigation'
import TeamItem from './TeamItem'
import { useQuery } from '@tanstack/react-query'
import { getTeamList } from '../team-view/api/TeamDataViewApi'

export default function TeamSelect() {
  const router = useRouter()

  const { data } = useQuery({
    queryKey: ['teamList'],
    queryFn: () => getTeamList(),
  })
  const teams = data?.result.teamInformMenus

  return (
    <>
      {teams?.length === 0 ? (
        <div className="mt-[1.62rem] flex w-full flex-col items-center justify-center gap-8 rounded-[1.88rem] border border-grey30 bg-grey10 px-6 py-8">
          <div className="flex w-full flex-col items-center">
            <span className="font-semibold text-grey90">앗! 아직 등록된 팀이 없어요</span>
            <span className="text-xs font-normal text-grey60">정보를 입력하고 팀을 생성해 보세요</span>
          </div>
        </div>
      ) : (
        <div className="mt-[1.63rem] flex flex-col gap-4">
          {teams?.map((team, index) => (
            <TeamItem
              key={index}
              team={team}
              onClick={() => {
                router.push(`/team/${encodeURIComponent(team.teamCode)}/log`)
              }}
            />
          ))}
        </div>
      )}
    </>
  )
}
