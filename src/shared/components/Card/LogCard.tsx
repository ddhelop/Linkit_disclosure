import Image from 'next/image'
import { ILogCard } from '@/shared/types/Card/LogCardTypes'
import Link from 'next/link'
import { stripHtmlAndImages } from '@/shared/hooks/useHtmlToString'
import { truncateText } from '@/shared/utils/stringUtils'

export default function LogCard({ log }: { log: ILogCard }) {
  return (
    <Link
      href={
        log.domainType === 'PROFILE'
          ? `/${log.logInformDetails.emailId}/log/${log.id}`
          : `/team/${log.logInformDetails.teamCode}/log/${log.id}`
      }
      className="flex h-[10rem] flex-col gap-3 rounded-xl border border-transparent px-8 py-6 hover:border-main"
      style={{ boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)' }}
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <span className="text-lg font-semibold text-grey80">{log.logTitle}</span>
          <span className="px-1 text-grey50">|</span>
          <span className="text-xs font-normal text-grey60">{log.logInformDetails.teamName}</span>
        </div>
        <div className="flex items-center gap-2">
          <Image
            src={log.logInformDetails.teamLogoImagePath}
            alt="팀 로고"
            width={28}
            height={28}
            className="rounded-lg"
          />
          <span className="text-sm font-semibold text-grey90">{log.logInformDetails.teamName}</span>
        </div>
      </div>

      {/* 내용 */}
      <div className="text-sm text-grey60">{truncateText(stripHtmlAndImages(log.logContent), 100)}</div>
    </Link>
  )
}
