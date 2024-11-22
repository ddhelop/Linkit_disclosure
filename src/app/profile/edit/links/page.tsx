import ProfileEditLinks from '@/features/profile/edit/components/ProfileEditLinks'

export default function ProfileEditLinksPage() {
  return (
    <div className="pl-[4.25rem] pr-[8.69rem] pt-[3.75rem]">
      <label className="text-xl font-bold">링크</label>

      <div className="mt-5 rounded-xl">
        <ProfileEditLinks />
      </div>
    </div>
  )
}
