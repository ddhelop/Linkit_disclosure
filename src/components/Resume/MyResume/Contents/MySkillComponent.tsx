'use client'
import { ChangeEvent, KeyboardEvent, useState } from 'react'

export default function MySkillComponent() {
  const [isEditing, setIsEditing] = useState(false)
  const [skills, setSkills] = useState<string[]>([])
  const [inputValue, setInputValue] = useState('')

  const handleEditClick = () => {
    setIsEditing(!isEditing)
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleAddSkill = () => {
    if (inputValue.trim() !== '') {
      setSkills([...skills, inputValue.trim()])
      setInputValue('')
    }
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAddSkill()
    }
  }

  return (
    <div className="w-full rounded-2xl bg-[#fff] px-[2.06rem] py-[1.38rem] shadow-resume-box-shadow">
      {/* title */}
      <div className="flex items-center gap-[0.56rem]">
        <span className="text-lg font-semibold text-grey100">보유기술</span>
        {isEditing && (
          <span className="text-sm text-[#2563EB]">
            Tip : 본인의 경험을 바탕으로 핵심 역량과 보유 기술을 간단히 작성해주세요!
          </span>
        )}
      </div>

      {/* contents */}
      {isEditing ? (
        <div>
          {/* 버튼들 */}
          <div className="flex flex-wrap gap-2 pt-4">
            {skills.map((skill, index) => (
              <div
                key={index}
                onClick={() => handleRemoveSkill(skill)}
                className="flex cursor-pointer items-center rounded-lg border border-[#2563EB] bg-[#E0E7FF] px-3 py-1"
              >
                <span className="text-[#2563EB]">{skill}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemoveSkill(skill)
                  }}
                  className="ml-2 flex h-4 w-4 items-center justify-center rounded-full text-[#2563EB]"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* input container */}
          <div className="mt-[0.88rem] flex flex-col border-t border-grey40">
            <span className="py-[0.88rem] text-sm font-normal">희망 팀빌딩 분야를 선택해주세요</span>
            <div className="flex w-[16.1rem] items-center gap-[0.63rem]">
              <input
                type="text"
                className="flex-1 rounded border border-grey40 p-2"
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="ex. Notion"
              />
              <button onClick={handleAddSkill} className="rounded bg-[#2563EB] px-4 py-2 text-sm text-[#fff]">
                추가
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2 pt-2">
          {skills.map((skill, index) => (
            <div key={index} className="flex items-center rounded-lg bg-[#E0E7FF] px-3 py-1">
              <span className="text-[#2563EB]">{skill}</span>
            </div>
          ))}
        </div>
      )}

      {/* button */}
      <div className="mt-[0.94rem] flex w-full justify-end">
        <button onClick={handleEditClick} className="h-10 rounded bg-[#2563EB] px-4 text-sm text-[#fff]">
          {isEditing ? '수정완료' : '수정하기'}
        </button>
      </div>
    </div>
  )
}
