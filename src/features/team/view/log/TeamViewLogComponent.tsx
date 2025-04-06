import Link from 'next/link'
import { TeamLog } from '../../types/team.types'
import { useDateFormat } from '@/shared/hooks/useDateFormat'
import useExtractText from '@/shared/hooks/useExtractText'
import { extractTextFromHtml } from '@/shared/lib/extractTextFromHtml'

export default function TeamViewLogComponent({ log, teamName }: { log: TeamLog; teamName: string }) {
  const { formatToKorean } = useDateFormat()
  return (
    <Link
      href={`/team/${teamName}/log/${log.teamLogId}`}
      className="flex w-full cursor-pointer flex-col gap-5 rounded-xl border border-grey30 bg-white p-5 transition-all hover:border-main"
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {log.logType === 'REPRESENTATIVE_LOG' && (
            <span className="rounded-md bg-grey20 px-2 py-1 text-xs font-normal text-main">대표글</span>
          )}
          <h1 className="font-semibold text-grey80">{log.logTitle}</h1>
        </div>
        <div>
          <span className="text-xs font-normal text-grey60">{formatToKorean(log.modifiedAt)}</span>
          <span className="text-xs font-normal text-grey60"> · </span>
          <span className="text-xs font-normal text-grey60">댓글 {log.commentCount}</span>
        </div>
      </div>

      <hr className="" />

      <div className="text-sm leading-6 text-grey60">{extractTextFromHtml(log.logContent, { maxLength: 250 })}</div>
    </Link>
  )
}
