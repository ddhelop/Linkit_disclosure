'use client'
import { accessTokenState } from '@/context/recoil-context'
import { GetOnBoardingData, PostRoleData } from '@/lib/action'
import { Skills } from '@/lib/data'
import { JobAndSkillResponse } from '@/lib/types'
import { useRouter } from 'next/navigation'
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

const Positions = ['기획·경영', '개발·데이터', '마케팅·광고', '디자인']

interface MyResumeCompletionProps {
  data: JobAndSkillResponse
}

export default function MySkillComponent({ data }: MyResumeCompletionProps) {
  const [isEditing, setIsEditing] = useState(false)

  const handleEditClick = () => {
    if (isEditing) {
      onSubmit()
    } else {
      setIsEditing(true)
    }
  }

  const [skills, setSkills] = useState<string[]>([])
  const [inputValue, setInputValue] = useState('')
  const [filteredSkills, setFilteredSkills] = useState<string[]>([])

  const [roleFields, setSelectedRoleFields] = useState<string[]>([])
  const accessToken = useRecoilValue(accessTokenState) || ''

  // 온보딩 데이터 fetch
  useEffect(() => {
    if (accessToken) {
      GetOnBoardingData(accessToken).then((data) => {
        const profileRegionResponse = data.jobAndSkillResponse
        if (profileRegionResponse) {
          setSelectedRoleFields(profileRegionResponse.jobRoleNames || [])
          setSkills(profileRegionResponse.skillNames || [])
        }
      })
    }
  }, [accessToken])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setInputValue(value)
    if (value) {
      setFilteredSkills(Skills.filter((skill) => skill.toLowerCase().includes(value.toLowerCase())))
    } else {
      setFilteredSkills([])
    }
  }

  const handleAddSkill = (skill: string) => {
    if (skill.trim() !== '' && Skills.includes(skill) && !skills.includes(skill)) {
      setSkills([...skills, skill.trim()])
      setInputValue('')
      setFilteredSkills([])
    }
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAddSkill(inputValue)
    }
  }

  // 포지션 토글
  const toggleRoleSelection = (field: string) => {
    setSelectedRoleFields((prevSelected) =>
      prevSelected.includes(field) ? prevSelected.filter((item) => item !== field) : [...prevSelected, field],
    )
  }

  const onSubmit = async () => {
    const response = await PostRoleData(accessToken, roleFields, skills)
    if (response.ok) {
      alert('수정되었습니다.')
      setIsEditing(false)
    } else {
      alert('요청 실패')
    }
  }

  return (
    <div className="w-full rounded-2xl bg-[#fff] px-[2.06rem] py-[1.38rem] shadow-resume-box-shadow">
      {/* contents */}
      {isEditing ? (
        <>
          {/* title */}
          <div className="flex items-center gap-[0.56rem]">
            <span className="text-lg font-semibold text-grey100">희망 역할</span>
            {/* {isEditing && <span className="text-sm text-[#2563EB]">Tip : 본인의 역할을 선택해주세요!</span>} */}
          </div>
          <div className="flex flex-grow flex-col items-center pt-[0.12rem]">
            {/* 포지션 */}
            <div className="flex w-full flex-col">
              <div className="flex flex-wrap gap-2 pt-2">
                {Positions.map((el, index) => (
                  <button
                    key={index}
                    className={` rounded-md border px-[0.88rem] py-2 ${
                      roleFields.includes(el)
                        ? 'border-[#2563EB] bg-[#D3E1FE66] text-[#2563EB]'
                        : 'border-[#CBD4E1] bg-[#fff] text-[#64748B]'
                    }`}
                    onClick={() => toggleRoleSelection(el)}
                  >
                    {el}
                  </button>
                ))}
              </div>
            </div>
            {/* 보유한 기술 */}
            <div className="flex w-full flex-col pt-8">
              <div className="flex items-center gap-[0.56rem]">
                <span className="text-lg font-semibold leading-5">보유 역량</span>
                {/* {isEditing && (
                  <span className="text-sm text-[#2563EB]">Tip : 본인이 보유하고 있는 핵심 기술을 선택해주세요!</span>
                )} */}
              </div>
              {/* contents */}
              <div>
                {/* 버튼들 */}
                <div className="flex flex-wrap gap-2 pt-4">
                  {skills.map((skill, index) => (
                    <div
                      key={index}
                      onClick={() => handleRemoveSkill(skill)}
                      className="flex cursor-pointer items-center rounded-lg border border-[#2563EB] bg-[#E0E7FF] bg-opacity-40 px-3 py-2 font-semibold"
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
                  <span className="py-[0.88rem] text-sm font-normal">보유 역량을 하나씩 입력해주세요</span>
                  <div className="flex w-[16.1rem] items-center gap-[0.63rem]">
                    <input
                      type="text"
                      className=" flex-1 rounded border border-grey40 p-2"
                      value={inputValue}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      placeholder="기획"
                    />
                    <button
                      onClick={() => handleAddSkill(inputValue)}
                      className="rounded bg-[#2563EB] px-4 py-2 text-sm text-[#fff]"
                    >
                      추가
                    </button>
                  </div>
                  {inputValue && filteredSkills.length > 0 && (
                    <ul className="mt-2 max-h-32 w-[16.1rem] overflow-y-auto rounded border border-grey40 bg-[#fff]">
                      {filteredSkills.map((skill, index) => (
                        <li
                          key={index}
                          className="cursor-pointer p-2 hover:bg-grey20"
                          onClick={() => handleAddSkill(skill)}
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* 희망 역할 */}
          <div className="flex flex-col gap-[1.56rem]">
            <div className="flex flex-col gap-1">
              <span className="text-lg font-semibold text-grey100">희망 역할</span>
              <div className="flex flex-wrap gap-2 pt-2">
                {roleFields.map((role, index) => (
                  <div
                    key={index}
                    className="flex items-center rounded-[0.31rem] border border-grey40 px-[0.88rem] py-2"
                  >
                    <span className="text-grey60">{role}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 보유 기술 */}
            <div className="flex flex-col gap-1">
              <span className=" text-lg font-semibold text-grey100">보유 역량</span>
              <div className="flex flex-wrap gap-2 pt-2">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center rounded-[0.31rem] border border-grey40 px-[0.88rem] py-2"
                  >
                    <span className="text-grey60">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
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
