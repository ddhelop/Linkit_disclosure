'use client'
import { ChangeEvent, KeyboardEvent, useState } from 'react'
import Image from 'next/image'

export default function TeamMemberAnnouncement() {
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  const handleButtonClick = () => {
    alert('API 연결 필요')
    setIsFormVisible(!isFormVisible)
  }

  const handleRoleClick = (role: string) => {
    setSelectedRole(role)
  }

  const [skills, setSkills] = useState<string[]>([])
  const [inputValue, setInputValue] = useState('')

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
        <span className="text-lg font-semibold text-grey100">팀원 공고</span>
      </div>

      {/* Form */}
      {isFormVisible && (
        <div className="mt-4">
          <div className="flex flex-col gap-4">
            <div>
              <label className="flex font-normal text-grey100">
                직무/역할 <p className="pl-1 font-normal text-[#2563EB]">*</p>
              </label>
              <div className="mt-2 flex flex-wrap gap-2">
                {['기획', '마케팅', '디자이너', 'SW개발자', '리서처', '기타'].map((role) => (
                  <button
                    key={role}
                    className={`rounded border px-4 py-2 ${
                      selectedRole === role
                        ? 'bg-blue-500 border border-[#2563EB] bg-[#D3E1FE66] bg-opacity-40 font-semibold text-[#2563EB]'
                        : 'border-grey40 text-grey60'
                    }`}
                    onClick={() => handleRoleClick(role)}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-8">
              <label className="flex font-normal text-grey100">
                주요 업무 <p className="pl-1 font-normal text-[#2563EB]">*</p>
              </label>
              <textarea
                className="mt-2 block w-full resize-none rounded-md border border-grey30 p-[0.56rem] text-grey50 shadow-sm"
                rows={3}
                placeholder="주요 업무"
              />
            </div>

            {/* 요구 기술 */}
            <label className="mt-8 flex font-normal text-grey100">
              직무/역할 <p className="pl-1 font-normal text-[#2563EB]">*</p>
            </label>
            <div>
              {/* 버튼들 */}
              <div className="flex flex-wrap gap-2 pt-1">
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
                <span className="py-[0.88rem] text-sm font-normal text-grey60">보유 기술을 하나씩 입력해주세요</span>
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

            <div className="pt-8">
              <label className="block font-normal text-grey100">지원 절차</label>
              <textarea
                className="mt-2 block w-full resize-none rounded-md border border-grey30 p-[0.56rem] text-grey50 shadow-sm"
                rows={3}
                placeholder="지원 절차"
              />
            </div>

            <div className="mt-4 flex justify-end border-b border-grey30 pb-4">
              <button className="text-white rounded bg-[#2563EB] px-4 py-2 text-[#fff]">저장하기</button>
            </div>

            <div className="flex  items-center justify-between border border-grey30 p-5">
              <div className="flex flex-col">
                <p className="text-sm text-grey60">(주)링킷</p>
                <p className="pt-[0.44rem]">마케팅</p>
                <div className="flex gap-2 pt-[0.88rem]">
                  <div className="rounded-[0.31rem] border border-grey40 px-[0.88rem] py-[0.25rem] text-sm text-grey60">
                    Figma
                  </div>
                  <div className="rounded-[0.31rem] border border-grey40 px-[0.88rem] py-[0.25rem] text-sm text-grey60">
                    Notion
                  </div>
                </div>
              </div>
              <div className="flex ">
                <Image src="/assets/icons/pencil.svg" width={27} height={27} alt="plus" className="cursor-pointer" />
                <Image src="/assets/icons/delete.svg" width={27} height={27} alt="plus" className="cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={handleButtonClick}
        className="mt-[0.38rem] flex w-full items-center justify-center rounded-[0.63rem] border border-grey30 bg-grey20 py-[1.2rem]"
      >
        <Image src="/assets/icons/plus.svg" width={20} height={20} alt="plus" />
      </button>
    </div>
  )
}
