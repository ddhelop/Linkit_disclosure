import TeamEditBasic from '@/features/team/edit/basic/TeamEditBasic'

export default function TeamEditBasicPage({ params }: { params: { teamName: string } }) {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl font-bold">기본정보</h1>
      <TeamEditBasic params={params} />
    </div>
  )
}
