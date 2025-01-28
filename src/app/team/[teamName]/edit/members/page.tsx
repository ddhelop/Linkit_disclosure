import TeamEditMembersList from '@/features/team/edit/members/TeamEditMembersList'

export default function TeamEditMembersPage({ params }: { params: { teamName: string } }) {
  return (
    <div className="flex flex-col ">
      <h1 className=" text-xl font-bold">팀 구성원</h1>

      <TeamEditMembersList teamName={params.teamName} />
    </div>
  )
}
