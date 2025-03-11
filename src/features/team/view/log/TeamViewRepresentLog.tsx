'use client'
import Link from 'next/link'
import { TeamLog } from '@/shared/types/TeamType'

export default function TeamViewRepresentLog({ log, teamName }: { log: TeamLog; teamName: string }) {
  return (
    <Link
      href={`/team/${teamName}/log/${log.teamLogId}`}
      className="flex w-full flex-col gap-6 rounded-xl border border-grey30 bg-white p-5 hover:border-main md:px-5 md:py-7"
    >
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:pl-5">
        <span className="text-xl font-semibold text-grey80">{log?.logTitle}</span>
        <span className="hidden text-sm font-normal text-grey60 md:flex">|</span>
        <span className="text-sm font-normal text-grey60">{new Date(log?.modifiedAt ?? '').toLocaleDateString()}</span>
      </div>

      <div
        className="prose w-full max-w-none rounded-xl text-sm text-grey70 lg:bg-grey10 lg:p-6"
        dangerouslySetInnerHTML={{ __html: log?.logContent ?? '' }}
      />
    </Link>
  )
}
