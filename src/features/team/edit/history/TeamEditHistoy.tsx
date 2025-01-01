'use client'

import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import { deleteTeamHistory, getTeamHistory } from '../../api/teamApi'
import { TeamHistory } from '../../types/team.types'
import { useOnClickOutside } from '@/shared/hooks/useOnClickOutside'
import Link from 'next/link'

export default function TeamEditHistoy({ teamName }: { teamName: string }) {
  const [history, setHistory] = useState<TeamHistory[]>([])
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useOnClickOutside({
    refs: [menuRef],
    handler: () => setOpenMenuId(null),
    isEnabled: !!openMenuId,
  })

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
        // 삭제 후 목록 다시 불러오기 대신 상태 직접 업데이트
        setHistory(history.filter((item) => item.teamHistoryId !== teamHistoryId))
        setOpenMenuId(null) // 메뉴 닫기
        alert('연혁이 삭제되었습니다.')
      }
    } catch (error) {
      console.error('연혁 삭제 중 오류 발생:', error)
      alert('연혁 삭제 중 오류가 발생했습니다.')
    }
  }

  return (
    <div className="mt-5 flex flex-col gap-5">
      {history.map((item) => (
        <div key={item.teamHistoryId} className="rounded-xl bg-white px-10 py-5">
          <div className="flex justify-between">
            <div className="flex flex-col gap-2">
              <Link
                href={`/team/${teamName}/edit/history/new?id=${item.teamHistoryId}`}
                className="font-semibold text-grey80"
              >
                {item.historyName}
              </Link>
              <span className="text-xs font-normal text-grey60">
                {item.historyStartDate} ~ {item.historyEndDate}
              </span>
            </div>
            <div className="relative">
              <Image
                src="/common/icons/more_row.svg"
                alt="more"
                width={20}
                height={20}
                className="cursor-pointer"
                onClick={() => setOpenMenuId(item.teamHistoryId.toString())}
              />

              {/* 더보기 메뉴 */}
              {openMenuId === item.teamHistoryId.toString() && (
                <div ref={menuRef} className="absolute right-0 top-8 z-10 w-[120px] rounded-lg bg-white shadow-md">
                  <div className="flex flex-col py-2">
                    <Link
                      href={`/team/${teamName}/edit/history/new?id=${item.teamHistoryId}`}
                      className="px-4 py-2 text-left text-sm text-grey80 hover:bg-grey10"
                    >
                      수정하기
                    </Link>
                    <button
                      onClick={() => handleDeleteHistory(item.teamHistoryId)}
                      className="px-4 py-2 text-left text-sm text-[#FF345F] hover:bg-grey10"
                    >
                      삭제하기
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
