import ProfileEditBottomNav from '@/features/profile/edit/components/common/ProfileEditBottomNav'
import TeamEditMembersList from '@/features/team/edit/members/TeamEditMembersList'

export default function TeamEditMembersPage({ params }: { params: { teamName: string } }) {
  const teamName = params.teamName

  return (
    <>
      <div className="flex flex-col pb-16 md:pb-0">
        <h1 className=" text-xl font-bold">팀 구성원</h1>

        <TeamEditMembersList teamName={params.teamName} />
      </div>

      <ProfileEditBottomNav prevPath={`/team/${teamName}/edit/recruit`} nextPath={`/team/${teamName}/edit/products`} />
    </>
  )
}
