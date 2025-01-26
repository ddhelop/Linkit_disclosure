import TeamViewLog from '@/features/team/view/log/TeamViewLog'

export default function TeamLogPage({ params }: { params: { teamName: string } }) {
  return (
    <div className="flex flex-col">
      <TeamViewLog params={params} />
    </div>
  )
}
