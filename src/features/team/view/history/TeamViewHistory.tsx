'use client'

import { useEffect, useState } from 'react'
import { getTeamHistory } from '../../api/teamViewApi'
import TeamViewNotView from '../../../team-view/ui/teamInfo/TeamViewNotView'
import { useTeamStore } from '../../store/useTeamStore'
import { useRouter } from 'next/navigation'

interface HistoryItem {
  teamHistoryId: number
  historyName: string
  historyStartDate: string
  historyEndDate: string
  isHistoryInProgress: boolean
  historyDescription: string
}

interface MonthData {
  [key: string]: HistoryItem[]
}

interface YearData {
  [key: string]: MonthData[]
}

export default function TeamViewHistory({ teamName }: { teamName: string }) {
  const { isTeamManager } = useTeamStore()
  const router = useRouter()
  const [historyData, setHistoryData] = useState<YearData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setIsLoading(true)
        const response = await getTeamHistory(teamName)
        setHistoryData(response.result.teamHistoryCalendar || [])
      } catch (error) {
        console.error('연혁 데이터 로딩 실패:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchHistory()
  }, [teamName])

  if (isLoading) {
    return <div className="ml-8 text-grey60">로딩중...</div>
  }

  if (!historyData || historyData.length === 0) {
    return (
      <div className="">
        {isTeamManager ? (
          <TeamViewNotView />
        ) : (
          <div className="mt-[3rem] flex w-full justify-center font-semibold text-grey60">
            아직 작성한 내용이 없어요
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      <div className="relative mx-auto max-w-[960px] px-4 lg:px-32">
        {/* 타임라인 세로선 - 모바일에서 더 정확한 위치로 조정 */}
        <div className="absolute left-[34.5px] top-0 h-full w-[2px] bg-grey40 lg:left-[219px]" />

        {/* 연도별 그룹 */}
        {historyData.map((yearGroup, index) => {
          const year = Object.keys(yearGroup)[0]
          const months = yearGroup[year]

          return (
            <div key={year} className="mb-20">
              {/* 연도 표시와 회색 동그라미 */}
              <div className="relative mb-12">
                <h2 className="absolute -left-4 text-2xl font-bold text-[#4168F6] lg:text-[28px]">{year}</h2>
                <div
                  className="absolute left-[14px] top-[35px] h-[9px] w-[9px] rounded-full bg-grey40 lg:left-[87.5px]"
                  style={{ transform: 'translateX(0px)' }}
                />
              </div>

              {/* 월별 그룹 */}
              {months.map((monthGroup) => {
                const month = Object.keys(monthGroup)[0]
                const histories = monthGroup[month]

                return (
                  <div key={`${year}-${month}`} className="last:mb-0">
                    <div className="relative flex">
                      {/* 월 표시와 파란색 동그라미 */}
                      <div className="relative flex w-[80px] items-center lg:w-[150px]">
                        <div
                          className="absolute left-[14px] h-[10px] w-[10px] rounded-full border-2 border-[#4D82F3] bg-white lg:left-[87px]"
                          style={{ transform: 'translateX(0px)' }}
                        />
                        <span className="absolute left-[50px] text-lg font-bold text-[#4D82F3] lg:left-[110px] lg:text-xl">
                          {month}
                        </span>
                      </div>

                      {/* 해당 월의 연혁들 */}
                      <div className="mt-16 flex-1 pl-1 lg:mt-24 lg:pl-0">
                        {histories.map((history: HistoryItem) => (
                          <div key={history.teamHistoryId} className="mb-4 rounded-xl bg-white p-4 lg:p-5">
                            <div className="flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-2">
                              <h3 className="font-semibold text-grey80">{history.historyName}</h3>
                              <div className="text-xs text-grey60">
                                {history.historyStartDate} ~{' '}
                                {history.isHistoryInProgress ? '진행중' : history.historyEndDate}
                              </div>
                            </div>
                            {history.historyDescription && (
                              <div className="mt-3 text-xs text-grey60 lg:mt-4">{history.historyDescription}</div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </>
  )
}
