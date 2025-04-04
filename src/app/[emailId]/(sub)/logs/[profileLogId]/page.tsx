import { loadProfileLogDetailData } from '@/features/profile-view/loader'
import { HydrationBoundary } from '@tanstack/react-query'
import ProfileViewLogDetail from '@/features/profile-view/ui/ProfileViewLogDetail'

export default async function ProfileLogDetailPage({ params }: { params: { emailId: string; profileLogId: number } }) {
  const dehydratedState = await loadProfileLogDetailData(params.profileLogId)

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="flex flex-col lg:px-[4.62rem] lg:pb-[3.62rem]">
        <ProfileViewLogDetail profileLogId={params.profileLogId} />
      </div>
    </HydrationBoundary>
  )
}
