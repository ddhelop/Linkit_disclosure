import TeamViewMembers from '@/features/team/view/members/TeamViewMembers'

export default function TeamMembersPage({ params }: { params: { teamName: string } }) {
  return (
    <div className="">
      <TeamViewMembers params={params} />
    </div>
  )
}
