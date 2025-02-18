import ProfileEditBottomNav from '@/features/profile/edit/components/common/ProfileEditBottomNav'
import TeamEditBasic from '@/features/team/edit/basic/TeamEditBasic'

export default function TeamEditBasicPage({ params }: { params: { teamName: string } }) {
  const teamName = params.teamName

  return (
    <>
      <div className="flex flex-col gap-5 pb-16 md:pb-0">
        <h1 className="text-xl font-bold">기본정보</h1>
        <TeamEditBasic params={params} />
      </div>

      <ProfileEditBottomNav prevPath={`/team/${teamName}/edit/log`} nextPath={`/team/${teamName}/edit/recruit`} />
    </>
  )
}
