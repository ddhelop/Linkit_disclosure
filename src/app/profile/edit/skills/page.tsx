import ProfileEditSkills from '@/features/profile/edit/components/ProfileEditSkills'

export default function ProfileEditSkillsPage() {
  return (
    <div className="pl-[4.25rem] pr-[8.69rem] pt-[3.75rem]">
      <label className="text-xl font-bold">보유 스킬</label>

      <div className="mt-5 rounded-xl">
        <ProfileEditSkills />
      </div>
    </div>
  )
}
