import TeamViewHistory from '@/features/team/view/history/TeamViewHistory'

export default function TeamHistoryPage({ params }: { params: { teamName: string } }) {
  const { teamName } = params
  return (
    <div className="">
      <TeamViewHistory teamName={teamName} />
    </div>
  )
}
