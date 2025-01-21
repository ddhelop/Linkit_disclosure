import Image from 'next/image'
import { ILogCard } from '@/shared/types/Card/LogCardTypes'
import Link from 'next/link'

export default function LogCard({ log }: { log: ILogCard }) {
  return (
    <div
      className="flex flex-col gap-3 rounded-xl px-8 py-6"
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
      <div className="text-sm text-grey60">{log.logContent}</div>

      {/* 더보기 */}
      <Link
        href={
          log.domainType === 'PROFILE'
            ? `/${log.logInformDetails.memberName}/log/${log.logInformDetails.emailId}`
            : `/team/${log.logInformDetails.teamName}log/${log.logInformDetails.teamCode}`
        }
        className="flex w-full justify-end "
      >
        <div className="flex cursor-pointer items-center justify-center rounded-lg bg-grey10 py-2 pl-5 pr-3">
          <div className=" text-xs text-grey60">더보기</div>
          <Image src={'/common/icons/right_arrow.svg'} alt="더보기" width={20} height={20} />
        </div>
      </Link>
    </div>
  )
}
