'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Skills } from '@/lib/data'
import { GetOnBoardingData, PostRoleData } from '@/lib/action'
import { useRecoilValue } from 'recoil'
import { accessTokenState } from '@/context/recoil-context'
import OnBoardingHeader from '../OnBoardingHeader'

const Positions = ['기획·경영', '개발·데이터', '마케팅·광고', '디자인']

interface FormValues {
  jobRoleNames: string[]
  skillNames: string[]
}

export default function Role() {
  const [skills, setSkills] = useState<string[]>([])
  const [inputValue, setInputValue] = useState('')
  const [filteredSkills, setFilteredSkills] = useState<string[]>([])
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()
  const [roleFields, setSelectedRoleFields] = useState<string[]>([])
  const router = useRouter()
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
      router.push('/onBoarding/person/school')
    } else {
      alert('요청 실패')
    }
  }

  return (
    <div className="flex h-screen flex-col bg-[#fff] lg:pt-[62px]">
      <OnBoardingHeader percentage={40} />
      <div className="flex flex-grow flex-col items-center py-16">
        <div className="flex w-[90%] justify-between text-sm font-medium leading-9 text-grey60 sm:w-[55%]">
          <span>내 이력서 가이드</span>
        </div>
        <div className="flex w-[90%] flex-col items-start leading-9 sm:w-[55%]">
          <span className="text-2xl font-bold">나의 역할을 알려주세요</span>
          <span className="text-grey60">*중복선택 가능</span>
        </div>

        {/* 포지션 */}
        <div className="flex w-[90%] flex-col sm:w-[55%]">
          <div className="flex flex-wrap gap-2 pt-5">
            {Positions.map((el, index) => (
              <button
                key={index}
                className={` rounded-md border px-[0.88rem] py-2 ${roleFields.includes(el) ? 'border-[#2563EB] bg-[#D3E1FE66] text-[#2563EB]' : 'border-[#CBD4E1] bg-[#fff] text-[#64748B]'}`}
                onClick={() => toggleRoleSelection(el)}
              >
                {el}
              </button>
            ))}
          </div>
        </div>
        {/* 보유한 기술 */}
        <div className="flex w-[90%] flex-col pt-8 sm:w-[55%] lg:pt-16">
          <span className="text-lg font-bold leading-5">
            보유 역량을 알려주세요 <span className="text-sm font-normal text-grey80">*중복선택가능</span>
          </span>
          {/* contents */}
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
              <span className="py-[0.88rem] text-sm font-normal">보유 역량을 하나씩 입력해주세요</span>
              <div className="flex w-[16.1rem] items-center gap-[0.63rem]">
                <input
                  type="text"
                  className=" flex-1 rounded border border-grey40 p-2"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="ex.기획"
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
        {/* Footer */}
        <form onSubmit={handleSubmit(onSubmit)} className="fixed bottom-0 left-0 w-full bg-white shadow-soft-shadow">
          <div className="flex justify-center p-4 lg:justify-end lg:pr-96">
            <Link href="/onBoarding/person/location">
              <button className=" mr-4 rounded bg-grey20 px-12 py-2 text-blue-700 lg:px-16">이전</button>
            </Link>

            <button
              className={`${roleFields.length > 0 && skills.length > 0 ? 'bg-[#2563EB]' : 'bg-[#7EA5F8]'} mr-4 rounded  px-16 py-2 text-[#fff]`}
              disabled={!(roleFields.length > 0 && skills.length > 0)}
            >
              다음
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
