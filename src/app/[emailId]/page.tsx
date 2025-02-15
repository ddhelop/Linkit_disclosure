import ProfileViewLayout from '@/features/profile/view/component/common/ProfileViewLayout'

export default async function UserProfilePage({ params }: { params: { emailId: string } }) {
  return (
    <div className="flex w-full justify-center pt-5 lg:pl-[4.25rem] lg:pt-[3.63rem]">
      <ProfileViewLayout />
    </div>
  )
}
