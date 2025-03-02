'use client'
import type { LogCardType } from '@/shared/types/LogCardTypes'
import Image from 'next/image'
import Link from 'next/link'
import parse from 'html-react-parser'
import { useEffect, useState } from 'react'

export default function LogCard({ log }: { log: LogCardType }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !log || !log.logInformDetails) {
    return <div>Loading...</div> // 데이터가 없을 경우 대비
  }

  return (
    <Link
      href={
        log.domainType === 'PROFILE'
          ? `/${log.logInformDetails?.emailId}/logs/${log.id}`
          : `/team/${log.logInformDetails?.teamCode}/log/${log.id}`
      }
      className="flex flex-col gap-3 rounded-xl border border-transparent px-8 py-6 hover:border-main"
      style={{ boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)' }}
    >
      <div className="flex items-center gap-2">
        <div className="relative h-[28px] w-[28px] rounded-lg">
          {log.domainType === 'PROFILE' ? (
            <Image
              src={log.logInformDetails?.profileImagePath || '/common/default_profile.svg'}
              alt="팀 로고"
              fill
              className="rounded-lg object-cover"
            />
          ) : (
            <Image
              src={log.logInformDetails?.teamLogoImagePath || '/common/default_team.svg'}
              alt="팀 로고"
              fill
              className="rounded-lg object-cover"
            />
          )}
        </div>
        {log.domainType === 'PROFILE' ? (
          <span className="text-sm font-semibold text-grey90">{log.logInformDetails?.memberName || '이름 없음'}</span>
        ) : (
          <span className="text-sm font-semibold text-grey90">{log.logInformDetails?.teamName || '팀 없음'}</span>
        )}
      </div>
      <div className="flex justify-between">
        <div className="flex items-start gap-1">
          <span className="w-full text-lg font-semibold text-grey80">{log.logTitle}</span>
        </div>
      </div>

      {/* 내용 */}
      <div
        className="overflow-hidden text-sm text-grey60"
        style={{
          display: '-webkit-box',
          WebkitLineClamp: '4',
          WebkitBoxOrient: 'vertical',
          maxHeight: '5.6em', // line-height: 1.4 * 4줄
        }}
      >
        {log.logContent ? parse(log.logContent) : '내용 없음'}
      </div>
    </Link>
  )
}
