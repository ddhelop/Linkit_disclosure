'use client'
import { Controller, useForm } from 'react-hook-form'
import OnBoardingHeader from '../Layout/onBoardingHeader'
import Image from 'next/image'
import { useEffect } from 'react'

interface FormValues {
  selectedFields: string[]
  skills: string[] // 보유기술
  skillInput: string // 사용자 입력을 임시 저장할 필드
}

export default function OnBoardingStep2Person() {
  const teamBuilidngData = ['공모전', '대회', '해커톤', '사이드 프로젝트', '포트폴리오', '스터디', '창업']
  const { control, watch, setValue, getValues, register } = useForm<FormValues>({
    defaultValues: {
      selectedFields: [],
      skills: [],
    },
  })
  // `watch` 함수를 사용하여 폼 필드 'selectedFields'를 관찰
  const selectedFields = watch('selectedFields')
  const skills = watch('skills')

  const onSubmitTech = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const newSkill = getValues('skillInput') // 입력 필드에서 기술 이름을 가져옵니다.
    if (newSkill) {
      setValue('skills', [...skills, newSkill]) // 기존 기술 목록에 새 기술을 추가합니다.
      setValue('skillInput', '') // 입력 필드를 비웁니다.
    }
  }
  const handleDeleteSkill = (skillToDelete: string) => {
    setValue(
      'skills',
      skills.filter((skill) => skill !== skillToDelete),
    ) // 선택된 기술을 목록에서 제거합니다.
  }

  // 1
  useEffect(() => {
    console.log(selectedFields)
  }, [selectedFields])

  console.log('현재 보유 기술 목록:', skills) // 콘솔에 현재 보유 기술 목록 출력

  return (
    <div>
      <div className="w-full h-screen flex flex-col ">
        <OnBoardingHeader />
        <div className="w-2/3 h-[0.18rem] bg-[#2563EB]"></div>

        <div className="w-full flex flex-col items-center py-16">
          <div className="w-[80%] sm:w-[55%] flex justify-between text-sm font-medium text-grey60 leading-9">
            <span>가이드</span>
            <span>2/3</span>
          </div>

          <div className="w-[80%] sm:w-[55%] flex flex-col items-start leading-9">
            <span className="text-2xl font-bold">나의 정보 및 역량을 알려주세요</span>
            <span className="text-grey60">구체적으로 작성할 수록 매칭 확률이 올라가요</span>
          </div>

          {/* 본문 */}
          <div className="w-[80%] sm:w-[55%] flex flex-col  pt-16">
            <span className="text-lg font-bold leading-5">
              희망 팀빌딩 분야 <span className="text-sm font-normal text-grey80 pl-3">*중복선택 가능</span>
            </span>

            {/* 희망 팀빌딩 분야 */}
            <div className="flex gap-x-2 pt-5">
              {teamBuilidngData.map((el, index) => (
                <Controller
                  key={index}
                  name="selectedFields"
                  control={control}
                  render={({ field }) => (
                    <button
                      className={`px-3 py-1 border ${selectedFields.includes(el) ? ' border-[#2563EB] text-[#2563EB] bg-[#D3E1FE66]' : 'border-[#CBD4E1] text-[#64748B]'} rounded-md`}
                      onClick={() =>
                        field.onChange(
                          field.value.includes(el) ? field.value.filter((v) => v !== el) : [...field.value, el],
                        )
                      }
                    >
                      {el}
                    </button>
                  )}
                />
              ))}
            </div>

            {/* 보유 기술 */}
            <span className="text-lg font-bold leading-5 pt-20">
              보유 기술<span className="text-sm font-normal text-grey80 pl-3">*중복선택 가능</span>
            </span>

            {/* 기술 목록 */}
            <div className="flex gap-x-2 pt-5 flex-wrap">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-center pb-4">
                  <button
                    className="flex border px-4 py-1 border-[#2563EB] gap-x-2 items-center rounded-md"
                    onClick={() => handleDeleteSkill(skill)}
                  >
                    <span className="font-semibold text-[#2563EB]">{skill}</span>
                    <Image src={'/assets/icons/x.svg'} width={7} height={7} alt="delete" />
                  </button>
                </div>
              ))}
            </div>

            {/* 입력창 */}
            <form className="w-full h-11 flex border border-grey30" onSubmit={onSubmitTech}>
              <input
                className="w-[96%] h-full outline-none p-4"
                placeholder="보유기술을 입력해주세요."
                {...register('skillInput')} // 입력 필드에 react-hook-form 등록
              />
              <button type="submit">
                <Image src={'/assets/icons/search.svg'} width={24} height={24} alt="search" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
