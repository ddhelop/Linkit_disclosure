import Image from 'next/image'

import Link from 'next/link'
import { TeamLog } from '../../types/team.types'

export default function TeamViewLogComponent({ log, teamName }: { log: TeamLog; teamName: string }) {
  return (
    <Link
      href={`/team/${teamName}/log/${log.teamLogId}`}
      className="flex w-full cursor-pointer flex-col gap-5 rounded-xl border border-grey30 bg-white p-5 transition-all hover:border-main"
    >
      <div className="flex items-center gap-2">
        {log.logType === 'REPRESENTATIVE_LOG' && <Image src="/common/icons/pin.svg" width={20} height={20} alt="pin" />}
        <h1 className="font-semibold text-grey80">{log.logTitle}</h1>
        <span className="text-xs font-normal text-grey60">|</span>
        <span className="text-xs font-normal text-grey60">{new Date(log.modifiedAt).toLocaleDateString()}</span>
      </div>
    </Link>
  )
}
