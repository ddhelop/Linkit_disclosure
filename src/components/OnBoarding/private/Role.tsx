'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

const Positions = ['기획자', 'SW 개발자', '디자이너', '리서처', '마케터', '데이터 분석', '기타']
const Skills = [
  '기획자 기술1',
  '기획자 기술2',
  '기획자 기술3',
  '기획자 기술4',
  '기획자 기술5',
  '기획자 기술6',
  '디자이너 기술1',
  '디자이너 기술2',
  '디자이너 기술3',
  '디자이너 기술4',
  '디자이너 기술5',
  '디자이너 기술6',
]

interface FormValues {
  selectedRoleFields: string[]
  selectedSkillFields: string[]
}

export default function Role() {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()
  const [selectedRoleFields, setSelectedRoleFields] = useState<string[]>([])
  const [selectedSkillFields, setSelectedSkillFields] = useState<string[]>([])

  // 포지션 토글
  const toggleRoleSelection = (field: string) => {
    setSelectedRoleFields((prevSelected) =>
      prevSelected.includes(field) ? prevSelected.filter((item) => item !== field) : [...prevSelected, field],
    )
  }

  // 기술 토글
  const toggleSkillSelection = (field: string) => {
    setSelectedSkillFields((prevSelected) =>
      prevSelected.includes(field) ? prevSelected.filter((item) => item !== field) : [...prevSelected, field],
    )
  }

  const onSubmit = (data: FormValues) => {
    // API 미완성
  }

  return (
    <div className="flex h-screen flex-col pt-[69px]">
      <div className="t-[69px] fixed h-[0.18rem] w-2/3 bg-[#2563EB]"></div>
      <div className="flex flex-grow flex-col items-center py-16">
        <div className="flex w-[80%] justify-between text-sm font-medium leading-9 text-grey60 sm:w-[55%]">
          <span>내 이력서 가이드</span>
        </div>
        <div className="flex w-[80%] flex-col items-start leading-9 sm:w-[55%]">
          <span className="text-2xl font-bold">희망하는 역할을 알려주세요</span>
          <span className="text-grey60">*중복선택 가능</span>
        </div>
        {/* 포지션 */}
        <div className="flex w-[80%] flex-col sm:w-[55%]">
          <div className="flex gap-x-2 pt-5">
            {Positions.map((el, index) => (
              <button
                key={index}
                className={`rounded-md border px-3 py-1 ${selectedRoleFields.includes(el) ? 'border-[#2563EB] bg-[#D3E1FE66] text-[#2563EB]' : 'border-[#CBD4E1] text-[#64748B]'}`}
                onClick={() => toggleRoleSelection(el)}
              >
                {el}
              </button>
            ))}
          </div>
        </div>
        {/* 보유한 기술 */}
        <div className="flex w-[80%] flex-col pt-16 sm:w-[55%]">
          <span className="text-lg font-bold leading-5">
            보유한 기술을 알려주세요 <span className="text-sm font-normal text-grey80">*중복선택가능</span>
          </span>
          <div className="flex flex-wrap gap-x-2 pt-5">
            {Skills.map((el, index) => (
              <button
                key={index}
                className={`mt-2 rounded-md border px-3 py-1 ${selectedSkillFields.includes(el) ? 'border-[#2563EB] bg-[#D3E1FE66] text-[#2563EB]' : 'border-[#CBD4E1] text-[#64748B]'}`}
                onClick={() => toggleSkillSelection(el)}
              >
                {el}
              </button>
            ))}
          </div>
        </div>
        {/* Footer */}
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white fixed bottom-0 left-0 w-full shadow-soft-shadow">
          <div className="flex justify-end p-4 pr-96">
            <Link href="/onBoarding/project">
              <button className="bg-blue-100 text-blue-700 mr-4 rounded bg-grey20 px-16 py-2">이전</button>
            </Link>

            <button
              className={`${selectedRoleFields.length > 0 && selectedSkillFields.length > 0 ? 'bg-[#2563EB]' : 'bg-[#7EA5F8]'} mr-4 rounded  px-16 py-2 text-[#fff]`}
              disabled={!(selectedRoleFields.length > 0 && selectedSkillFields.length > 0)}
              type="submit"
            >
              다음
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
