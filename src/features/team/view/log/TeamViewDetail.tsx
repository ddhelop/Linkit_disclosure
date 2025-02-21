'use client'
import { useEffect, useState } from 'react'
import { getTeamLogDetail } from '../../api/teamViewApi'
import { TeamLogItem } from '../../types/team.types'

export default function TeamViewDetail({ teamName, id }: { teamName: string; id: number }) {
  const [log, setLog] = useState<TeamLogItem | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await getTeamLogDetail(teamName, id)
      // URL 처리를 위해 logContent의 a 태그 href 수정
      if (response.result?.logContent) {
        const parser = new DOMParser()
        const doc = parser.parseFromString(response.result.logContent, 'text/html')
        const links = doc.getElementsByTagName('a')

        for (let link of links) {
          const href = link.getAttribute('href')
          if (href) {
            // URL에 프로토콜이 없으면 추가
            const hasProtocol = href.startsWith('http://') || href.startsWith('https://')
            link.href = hasProtocol ? href : `https://${href}`
            link.target = '_blank' // 새 탭에서 열기
            link.rel = 'noopener noreferrer' // 보안을 위한 속성 추가
          }
        }

        response.result.logContent = doc.body.innerHTML
      }
      setLog(response.result)
    }
    fetchData()
  }, [id, teamName])

  return (
    <div className="flex w-full flex-col gap-6 rounded-xl border-grey30 bg-white lg:border lg:px-5 lg:py-7">
      <div className="flex items-center gap-2 lg:pl-5">
        <span className="text-xl font-semibold text-grey80">{log?.logTitle}</span>
        <span className="text-sm font-normal text-grey60">|</span>
        <span className="text-sm font-normal text-grey60">{new Date(log?.modifiedAt ?? '').toLocaleDateString()}</span>
      </div>

      <div
        className="prose w-full max-w-none rounded-xl text-sm text-grey70 lg:bg-grey10 lg:p-6"
        dangerouslySetInnerHTML={{ __html: log?.logContent ?? '' }}
      />
    </div>
  )
}
