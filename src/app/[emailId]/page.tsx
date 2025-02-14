import ProfileViewLayout from '@/features/profile/view/component/common/ProfileViewLayout'

export default async function UserProfilePage({ params }: { params: { emailId: string } }) {
  return (
    <div className="flex w-full justify-center pt-[3.63rem] lg:pl-[4.25rem]">
      <ProfileViewLayout />
    </div>
  )
}
