'use client'

import { useQuery } from '@tanstack/react-query'
import { useScrollTopOnMount } from '@/shared/hooks/useScrollTopOnMount'
import { getTeamLogDetail } from '@/features/team-view/api/TeamDataViewApi'
import useLinkifyContent from '@/shared/hooks/useLinkifyContent'
import ShareLinkButton from '@/shared/components/ShareLinkButton'
import CommentSection from '@/shared/components/Comment/CommentSection'

export default function TeamViewDetail({ teamName, id }: { teamName: string; id: number }) {
  const { data: log } = useQuery({
    queryKey: ['teamLogDetail', teamName, id],
    queryFn: () => getTeamLogDetail(teamName, id),
  })

  // 페이지 마운트 시 스크롤 상단으로 이동
  useScrollTopOnMount()

  // 링크 자동 변환 훅 사용
  useLinkifyContent('log-content', log?.result?.logContent)

  return (
    <div className="flex w-full flex-col rounded-xl border-grey40 bg-white p-8 lg:border">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {log?.result?.logType === 'REPRESENTATIVE_LOG' && (
            <div className="rounded-md bg-grey20 px-2 py-1 text-xs text-main">대표글</div>
          )}
          <span className="text-lg font-semibold text-grey80">{log?.result?.logTitle}</span>
        </div>
        <ShareLinkButton />
      </div>

      <div className="mt-3 flex gap-2">
        <span className="text-sm font-normal text-grey60">
          {new Date(log?.result?.modifiedAt ?? '').toLocaleDateString()}
        </span>
        <span className="text-sm font-normal text-grey60"> · </span>
        <span className="text-sm font-normal text-grey60">조회수 {log?.result?.logViewCount}</span>
      </div>

      <hr className="my-7" />

      <div id="log-content" className="prose w-full max-w-none rounded-xl text-sm text-grey70 "></div>

      <hr className="my-7" />

      <CommentSection targetId={id} targetType="TEAM_LOG" />
    </div>
  )
}
