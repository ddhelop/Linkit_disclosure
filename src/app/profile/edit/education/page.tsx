import ProfileEditEducation from '@/features/profile/edit/components/ProfileEditEducation'

export default function ProfileEditEducationPage() {
  return (
    <div className="pl-[4.25rem] pr-[8.69rem] pt-[3.75rem]">
      <label className="text-xl font-bold">학력</label>

      <div className="mt-5 rounded-xl">
        <ProfileEditEducation />
      </div>
    </div>
  )
}
