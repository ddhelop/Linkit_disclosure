import { ProfileLogItem } from '@/features/profile/api/getProfileLogs'
import { stripHtmlAndImages } from '@/shared/utils/stringUtils'
import Link from 'next/link'

export default function ProfileLogCard({ logItem, emailId }: { logItem: ProfileLogItem; emailId: string }) {
  return (
    <Link
      href={`/${emailId}/logs/${logItem?.profileLogId}`}
      className="flex w-full flex-col gap-4 rounded-xl border border-transparent bg-white px-[2.75rem] py-[1.88rem] hover:border-main"
    >
      <div className="flex items-center gap-2">
        <span className="font-semibold text-grey80">{logItem?.logTitle}</span>
        <span className="text-xs text-grey50">|</span>
        <span className="text-xs font-normal text-grey60">{new Date(logItem?.modifiedAt).toLocaleDateString()}</span>
      </div>

      <div className="rounded-xl bg-grey10 px-6 py-[1.31rem] text-sm text-grey70">
        {stripHtmlAndImages(logItem?.logContent)}
      </div>
    </Link>
  )
}
