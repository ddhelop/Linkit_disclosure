import TeamViewProducts from '@/features/team/view/products/TeamViewProducts'

export default function TeamProductsPage({ params }: { params: { teamName: string } }) {
  return (
    <div className="">
      <TeamViewProducts teamName={params.teamName} />
    </div>
  )
}
