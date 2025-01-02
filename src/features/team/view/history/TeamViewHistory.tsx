'use client'

import { useEffect, useState } from 'react'
import { getTeamHistory } from '../../api/teamViewApi'

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
    return <div className="ml-8 text-grey60">등록된 연혁이 없습니다.</div>
  }

  return (
    <div className="relative ml-8">
      {/* 타임라인 세로선 */}
      <div className="absolute left-0 top-0 h-full w-[1px] bg-grey20" />

      {/* 연도별 그룹 */}
      {historyData.map((yearGroup) => {
        const year = Object.keys(yearGroup)[0]
        const months = yearGroup[year]

        return (
          <div key={year} className="relative mb-12">
            {/* 연도 표시 */}
            <div className="mb-8 text-2xl font-semibold text-main">{year}</div>

            {/* 월별 그룹 */}
            {months.map((monthGroup, monthIndex) => {
              const month = Object.keys(monthGroup)[0]
              const histories = monthGroup[month]

              return (
                <div key={`${year}-${month}`} className="relative mb-8">
                  {/* 월 표시와 점 */}
                  <div className="relative mb-4 flex items-center">
                    <div className="absolute -left-[2.15rem] h-4 w-4 rounded-full border-2 border-main bg-white" />
                    <span className="ml-4 text-xl font-medium text-main">{month}</span>
                  </div>

                  {/* 해당 월의 연혁들 */}
                  {histories.map((history: HistoryItem) => (
                    <div key={history.teamHistoryId} className="mb-4 ml-4 rounded-xl bg-white p-6 shadow-sm">
                      <div className="mb-2 flex items-center justify-between">
                        <h3 className="text-lg font-medium text-grey80">{history.historyName}</h3>
                        <span className="text-sm text-grey60">
                          {history.historyStartDate} ~ {history.isHistoryInProgress ? '진행중' : history.historyEndDate}
                        </span>
                      </div>
                      <p className="text-grey70">{history.historyDescription}</p>
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
