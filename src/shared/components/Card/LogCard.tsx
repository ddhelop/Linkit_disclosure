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
          ? `/${log.logInformDetails.emailId}/logs/${log.id}`
          : `/team/${log.logInformDetails.teamCode}/log/${log.id}`
      }
      className="flex flex-col gap-3 rounded-xl border border-transparent px-8 py-6 hover:border-main"
      style={{ boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)' }}
    >
      <div className="flex items-center gap-2">
        <div className="relative h-[28px] w-[28px] rounded-lg">
          {log.domainType === 'PROFILE' ? (
            <Image
              src={log.logInformDetails.profileImagePath || '/common/default_profile.svg'}
              alt="팀 로고"
              fill
              className="rounded-lg object-cover"
            />
          ) : (
            <Image
              src={log.logInformDetails.teamLogoImagePath}
              alt="팀 로고"
              fill
              className="rounded-lg object-cover"
            />
          )}
        </div>
        {log.domainType === 'PROFILE' ? (
          <span className="text-sm font-semibold text-grey90">{log.logInformDetails.memberName}</span>
        ) : (
          <span className="text-sm font-semibold text-grey90">{log.logInformDetails.teamName}</span>
        )}
      </div>
      <div className="flex justify-between">
        <div className="flex items-start gap-1">
          <span className="w-full text-lg font-semibold text-grey80">{log.logTitle}</span>
        </div>
      </div>

      {/* 내용 */}
      <div className="text-sm text-grey60">{truncateText(stripHtmlAndImages(log.logContent), 250)}</div>
    </Link>
  )
}
