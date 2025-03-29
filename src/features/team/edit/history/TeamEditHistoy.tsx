'use client'

import { deleteTeamHistory } from '../../api/teamApi'

import Link from 'next/link'
import { useToast } from '@/shared/hooks/useToast'
import NotContentsUi from '@/features/profile/edit/components/common/NotContentsUi'
import DropdownMenu from '@/shared/components/DropdownMenu'
import { useRouter } from 'next/navigation'

import { useQuery } from '@tanstack/react-query'
import { getTeamHistoryList } from '@/features/team-view/api/TeamDataViewApi'
import { TeamHistory } from '../../types/teamHistory.types'

export default function TeamEditHistoy({ teamName }: { teamName: string }) {
  const toast = useToast()
  const router = useRouter()

  const { data: historyData, refetch } = useQuery({
    queryKey: ['teamHistoryList', teamName],
    queryFn: () => getTeamHistoryList(teamName),
  })
  const history = historyData?.result.teamHistoryItems

  // 연혁 삭제하기
  const handleDeleteHistory = async (teamHistoryId: number) => {
    try {
      if (confirm('정말로 삭제하시겠습니까?')) {
        await deleteTeamHistory(teamName, teamHistoryId)
        await refetch()
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
      {history && history.length > 0 ? (
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
