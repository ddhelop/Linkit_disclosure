import Link from 'next/link'
import { loadProfileLogDetailData } from '@/features/profile-view/loader'
import { HydrationBoundary } from '@tanstack/react-query'
import ProfileViewLogDetail from '@/features/profile-view/ui/ProfileViewLogDetail'

export default async function ProfileLogDetailPage({ params }: { params: { emailId: string; profileLogId: number } }) {
  const dehydratedState = await loadProfileLogDetailData(params.profileLogId)

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="flex flex-col lg:px-[4.62rem] lg:pb-[3.62rem]">
        <ProfileViewLogDetail profileLogId={params.profileLogId} />
        <div className="mt-5 flex">
          <Link
            href={`/${params.emailId}/logs`}
            className="ml-3 cursor-pointer rounded-[0.63rem] border border-grey40 bg-[#FCFCFD] px-5 py-[0.38rem] text-grey70 hover:bg-grey10 lg:ml-0"
          >
            목록으로
          </Link>
        </div>
      </div>
    </HydrationBoundary>
  )
}
