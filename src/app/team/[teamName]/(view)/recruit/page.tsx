import TeamViewRecruitment from '@/features/team/view/recruitment/TeamViewRecruitment'

export default function TeamRecruitPage({ params }: { params: { teamName: string } }) {
  return (
    <div className="">
      <TeamViewRecruitment teamName={params.teamName} />
    </div>
  )
}
