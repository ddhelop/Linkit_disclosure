import ProfileEditSkills from '@/features/profile/edit/components/ProfileEditSkills'

export default function ProfileEditSkillsPage() {
  return (
    <>
      <label className="text-xl font-bold">보유 스킬</label>

      <div className="mt-5 rounded-xl">
        <ProfileEditSkills />
      </div>
    </>
  )
}
