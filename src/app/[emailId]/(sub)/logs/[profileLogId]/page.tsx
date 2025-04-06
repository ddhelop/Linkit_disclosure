import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import ProfileViewLogDetail from '@/features/profile/log/ui/ProfileViewLogDetail'
import { queryClient } from '@/shared/lib/react-query/queryClient'
import { getProfileLogDetail } from '@/features/profile/log/api/getProfileLog'

export default async function ProfileLogDetailPage({ params }: { params: { emailId: string; profileLogId: number } }) {
  await queryClient.prefetchQuery({
    queryKey: ['profileLogDetail', params.profileLogId],
    queryFn: () => getProfileLogDetail(params.profileLogId),
  })
  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="flex flex-col lg:px-[4.62rem] lg:pb-[3.62rem]">
        <ProfileViewLogDetail profileLogId={params.profileLogId} />
      </div>
    </HydrationBoundary>
  )
}
