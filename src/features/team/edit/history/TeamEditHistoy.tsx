'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { deleteTeamHistory, getTeamHistory } from '../../api/teamApi'
import { TeamHistory } from '../../types/team.types'
import Link from 'next/link'
import { useToast } from '@/shared/hooks/useToast'
import NotContentsUi from '@/features/profile/edit/components/common/NotContentsUi'
import DropdownMenu from '@/shared/components/DropdownMenu'
import { useRouter } from 'next/navigation'

export default function TeamEditHistoy({ teamName }: { teamName: string }) {
  const [history, setHistory] = useState<TeamHistory[]>([])
  const toast = useToast()
  const router = useRouter()

  useEffect(() => {
    fetchHistory()
  }, [teamName])

  // 연혁 조회 함수
  const fetchHistory = async () => {
    const history = await getTeamHistory(teamName)
    setHistory(history.result.teamHistoryItems)
  }

  // 연혁 삭제하기
  const handleDeleteHistory = async (teamHistoryId: number) => {
    try {
      if (confirm('정말로 삭제하시겠습니까?')) {
        await deleteTeamHistory(teamName, teamHistoryId)
        setHistory(history.filter((item) => item.teamHistoryId !== teamHistoryId))
        toast.success('연혁이 삭제되었습니다.')
      }
    } catch (error) {
      console.error('연혁 삭제 중 오류 발생:', error)
      toast.alert('연혁 삭제 중 오류가 발생했습니다.')
    }
  }

  const getMenuItems = (item: TeamHistory) => [
    {
      text: '수정하기',
      onClick: () => router.push(`/team/${teamName}/edit/history/new?id=${item.teamHistoryId}`),
      textColor: '#4D4D4D',
    },
    {
      text: '삭제하기',
      onClick: () => handleDeleteHistory(item.teamHistoryId),
      textColor: '#FF4343',
    },
  ]

  return (
    <div className="mt-5 flex flex-col gap-3">
      {history.length > 0 ? (
        history.map((item) => (
          <Link
            href={`/team/${teamName}/edit/history/new?id=${item.teamHistoryId}`}
            key={item.teamHistoryId}
            className="rounded-xl border border-transparent bg-white p-5 hover:border-main md:px-10 md:py-5"
          >
            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <span className="font-semibold text-grey80">{item.historyName}</span>
                <span className="text-xs font-normal text-grey60">
                  {item.historyStartDate} ~ {item.historyEndDate}
                </span>
              </div>
              <DropdownMenu items={getMenuItems(item)} />
            </div>
          </Link>
        ))
      ) : (
        <NotContentsUi />
      )}
    </div>
  )
}
