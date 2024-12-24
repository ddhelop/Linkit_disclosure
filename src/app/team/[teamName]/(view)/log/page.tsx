import TeamViewLog from '@/features/team/view/log/TeamViewLog'

export default function TeamLogPage({ params }: { params: { teamName: string } }) {
  return (
    <div className="pt-[3rem]">
      <TeamViewLog params={params} />
    </div>
  )
}
