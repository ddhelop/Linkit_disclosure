'use client'
import { getTeamHistoryCalendar } from '@/features/team-view/api/TeamDataViewApi'
import TeamViewNotView from '@/features/team-view/ui/teamInfo/TeamViewNotView'
import { TeamHistoryCalendar, YearHistory, MonthHistory, TeamHistory } from '@/features/team/types/team.types'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'

export default function TeamViewHistory({ teamName }: { teamName: string }) {
  const { data: historyData } = useQuery({
    queryKey: ['teamHistoryCalendar', teamName],
    queryFn: () => getTeamHistoryCalendar(teamName),
  })
  const isTeamManager = historyData?.result.isTeamManager
  const historyCalendar = historyData?.result.teamHistoryCalendar

  if (!historyCalendar || historyCalendar.length === 0) {
    return (
      <div className="">
        {isTeamManager ? (
          <TeamViewNotView url="history" />
        ) : (
          <div className="mt-[3rem] flex w-full flex-col items-center font-semibold text-grey60">
            아직 작성한 내용이 없어요
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      <div className="mt-7">
        {/* 제목 및 수정하기 버튼 */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">연혁</h1>
          {isTeamManager && (
            <Link
              href={`/team/${teamName}/edit/history`}
              className="flex items-center gap-2 rounded-full bg-grey80 px-6 py-3 text-sm text-white hover:brightness-125"
            >
              <Image src={'/common/icons/white_pencil.svg'} alt="pencil" width={16} height={16} />
              <span>수정하기</span>
            </Link>
          )}
        </div>

        {/* 연혁 리스트 */}
        <div className="mt-8 space-y-8">
          {historyCalendar.map((yearData: YearHistory) => {
            const year = Object.keys(yearData)[0]
            const monthsData = yearData[year]

            return (
              <div key={year}>
                <h2 className="mb-4 text-2xl font-bold text-[#4263EB]">{year}</h2>
                <div className="">
                  {monthsData.map((monthData: MonthHistory) => {
                    const month = Object.keys(monthData)[0]
                    const histories = monthData[month]

                    return (
                      <div key={`${year}-${month}`} className={`rounded-xl border bg-white p-6`}>
                        <h3 className="mb-2 text-xl font-semibold text-[#4D82F3]">{month}</h3>
                        <ul className="flex flex-col gap-6">
                          {histories.map((history, index) => (
                            <>
                              <li key={history.teamHistoryId} className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                  <p className="font-semibold text-grey80">{history.historyName}</p>
                                  <p className=" text-xs text-grey60">
                                    {history.historyStartDate} -{' '}
                                    {history.isHistoryInProgress ? '진행 중' : history.historyEndDate || ''}
                                  </p>
                                </div>
                                {history.historyDescription && (
                                  <p className="text-xs text-grey60">{history.historyDescription}</p>
                                )}
                              </li>
                              {index < histories.length - 1 && <div className="h-[1px] w-full bg-[#DDE1E6]" />}
                            </>
                          ))}
                        </ul>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
