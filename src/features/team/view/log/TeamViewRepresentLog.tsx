'use client'
import { useEffect, useState } from 'react'
import { TeamLogItem } from '../../types/team.types'
import Link from 'next/link'

export default function TeamViewRepresentLog({ log, teamName }: { log: TeamLogItem; teamName: string }) {
  return (
    <Link
      href={`/team/${teamName}/log/${log.teamLogId}`}
      className="flex w-full flex-col gap-6 rounded-xl border-grey30 bg-white hover:border-main lg:border lg:px-5 lg:py-7"
    >
      <div className="flex items-center gap-2 lg:pl-5">
        <span className="text-xl font-semibold text-grey80">{log?.logTitle}</span>
        <span className="text-sm font-normal text-grey60">|</span>
        <span className="text-sm font-normal text-grey60">{new Date(log?.modifiedAt ?? '').toLocaleDateString()}</span>
      </div>

      <div
        className="prose w-full max-w-none rounded-xl text-sm text-grey70 lg:bg-grey10 lg:p-6"
        dangerouslySetInnerHTML={{ __html: log?.logContent ?? '' }}
      />
    </Link>
  )
}
