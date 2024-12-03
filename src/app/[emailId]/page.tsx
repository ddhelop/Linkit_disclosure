import ProfileViewLayout from '@/features/profile/view/component/common/ProfileViewLayout'

export default async function UserProfilePage({ params }: { params: { emailId: string } }) {
  return (
    <div className="pl-[4.25rem] pt-[3.63rem]">
      <ProfileViewLayout />
    </div>
  )
}
