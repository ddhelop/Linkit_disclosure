import { loadTeamProducts } from '@/features/team-view/loader'
import TeamViewProducts from '@/features/team/view/products/TeamViewProducts'
import { HydrationBoundary } from '@tanstack/react-query'

export default async function TeamProductsPage({ params }: { params: { teamName: string } }) {
  const { teamName } = params

  const dehydratedState = await loadTeamProducts(teamName)

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="">
        <TeamViewProducts teamName={teamName} />
      </div>
    </HydrationBoundary>
  )
}
