'use client'
import { useProfile } from '@/entities/profile/model/ProfileContext'
import { EditableContainer } from './common/EditableContainer'

export default function ProfileViewSkills() {
  const { profileData } = useProfile()
  const skillItems = profileData?.profileSkillItems || []
  const isMyProfile = profileData?.isMyProfile

  return (
    <EditableContainer
      isEditable={isMyProfile}
      editPath="/profile/edit/skills"
      className="flex w-[95%] flex-col gap-5 rounded-xl bg-white px-[2.75rem] py-[1.88rem]"
    >
      <h1 className="font-semibold">보유스킬</h1>
      <div className="flex flex-wrap gap-2">
        {/* 데이터가 없을 시 */}
        {skillItems.length === 0 && (
          <div className="flex w-full items-center text-sm text-grey60">
            수정 버튼을 눌러 내용을 작성하면 매칭 가능성이 높아져요
          </div>
        )}
        {skillItems.map((skill) => (
          <div key={skill.profileSkillId} className="group relative w-fit">
            <div className="min-w-[100px] rounded-[62.5rem] bg-[#D3E1FE] px-7 py-1 text-center text-sm font-semibold text-grey80 transition-opacity duration-300 group-hover:opacity-0">
              {skill.skillName}
            </div>
            <div className="absolute left-0 top-0 w-full min-w-[100px] rounded-[62.5rem] bg-[#D3E1FE] px-7 py-1 text-center text-sm font-semibold text-grey80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Lv.{skill.skillLevel}
            </div>
          </div>
        ))}
      </div>
    </EditableContainer>
  )
}
