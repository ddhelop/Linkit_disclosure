import { stripHtmlAndImages } from '@/shared/utils/stringUtils'
import Link from 'next/link'
import { ProfileLogDetailType } from '@/features/profile/types/profile.type'

export default function ProfileLogCard({ logItem, emailId }: { logItem: ProfileLogDetailType; emailId: string }) {
  return (
    <Link
      href={`/${emailId}/logs/${logItem?.profileLogId}`}
      className="flex w-full flex-col gap-4 rounded-xl border border-transparent bg-white p-4 hover:border-main lg:px-[2.75rem] lg:py-[1.88rem]"
    >
      <div className="flex items-center gap-2">
        <span className="font-semibold text-grey80">{logItem?.logTitle}</span>
        <span className="text-xs text-grey50">|</span>
        <span className="text-xs font-normal text-grey60">{new Date(logItem?.modifiedAt).toLocaleDateString()}</span>
      </div>
      <div className="overflow-hidden rounded-xl bg-grey10 px-6 py-[1.31rem] text-sm text-grey70">
        <div
          className="overflow-hidden"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: '6',
            WebkitBoxOrient: 'vertical',
          }}
          dangerouslySetInnerHTML={{
            __html: logItem?.logContent,
          }}
        />
      </div>
    </Link>
  )
}
