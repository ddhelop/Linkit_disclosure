'use client'
import { Controller, useForm } from 'react-hook-form'
import OnBoardingHeader from '../../Layout/onBoardingHeader'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import OnBoardingFooter from '@/components/Layout/onBoardingFooter'

interface FormValues {
  selectedFields: string[]
  skills: string[] // 보유기술
  skillInput: string // 사용자 입력을 임시 저장할 필드
  teamSize: string // 팀 규모
}

export default function OnBoardingStep2Team() {
  const teamBuilidngData = ['공모전', '대회', '해커톤', '사이드 프로젝트', '포트폴리오', '스터디', '창업']
  const activityWay = ['사무실 있음', '사무실 없음', '대면 활동 선호', '대면 + 비대면']
  const hopeMember = ['기획', '마케팅', '디자이너', 'SW개발자', '리서치', '기타']
  const { control, watch, setValue, getValues, register } = useForm<FormValues>({
    defaultValues: {
      selectedFields: [],
      skills: [],
      teamSize: '',
    },
  })
  // `watch` 함수를 사용하여 폼 필드 'selectedFields'와 'teamSize'를 관찰
  const selectedFields = watch('selectedFields')
  const skills = watch('skills')
  const teamSize = watch('teamSize')

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

  useEffect(() => {
    console.log(selectedFields)
  }, [selectedFields])

  console.log('현재 보유 기술 목록:', skills) // 콘솔에 현재 보유 기술 목록 출력

  return (
    <>
      <OnBoardingHeader />
      <OnBoardingFooter />
      <div className="relative">
        <div className="fixed top-[4.5rem] z-40 h-[0.18rem] w-2/3 bg-[#2563EB]"></div>{' '}
      </div>

      <div className="flex w-full flex-col items-center py-16">
        <div className="flex w-[901px] flex-col items-center py-20">
          <div className="flex w-full justify-between text-sm font-medium leading-9 text-grey60">
            <span>가이드</span>
            <span>3/3</span>
          </div>

          <div className="flex w-full flex-col items-start leading-9">
            <span className="text-2xl font-bold">팀 역량을 알려주세요</span>
            <span className="text-grey60">
              링킷은 팀빌딩이 필요한 사람들을 연결해주고 성공으로 이어나갈 수 있도록 돕습니다.{' '}
            </span>
          </div>

          {/* 본문 */}
          <div className="flex w-full flex-col pt-16">
            <span className="text-lg font-bold leading-5">
              희망 팀빌딩 분야{' '}
              <span className="pl-3 text-sm font-normal text-grey80">
                <span className="font-sm text-[#FF345F]">*</span>중복선택 가능
              </span>
            </span>

            <div className="flex flex-col gap-y-[3.75rem]">
              {/* 희망 팀빌딩 분야 */}
              <div className="flex gap-x-2 pt-5">
                {teamBuilidngData.map((el, index) => (
                  <Controller
                    key={index}
                    name="selectedFields"
                    control={control}
                    render={({ field }) => (
                      <button
                        className={`border px-3 py-1 ${selectedFields.includes(el) ? ' border-[#2563EB] bg-[#D3E1FE66] text-[#2563EB]' : 'border-[#CBD4E1] text-[#64748B]'} rounded-md`}
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

              {/* 규모, 분야 */}
              <div className="flex gap-[0.81rem]">
                {/* 규모 */}
                <div className="flex flex-col">
                  <span className="font-semibold text-grey100">
                    규모 <span className="font-sm text-[#FF345F]">*</span>
                  </span>
                  <select
                    {...register('teamSize')}
                    className="mt-3 w-[18.75rem] appearance-none rounded-md border border-grey30 bg-no-repeat px-[0.88rem] py-2 text-sm text-grey60"
                    style={{
                      backgroundImage: "url('/assets/onBoarding/selectToggle.svg')",
                      backgroundPosition: 'calc(100% - 1rem) center',
                    }}
                    value={teamSize}
                    onChange={(e) => setValue('teamSize', e.target.value)}
                  >
                    <option value="" disabled>
                      선택
                    </option>
                    <option value="1-5인">1-5인</option>
                    <option value="5-10인">5-10인</option>
                    <option value="10-20인">10-20인</option>
                    <option value="20인 이상">20인 이상</option>
                  </select>
                </div>
                {/* 분야 */}
                <div className="flex flex-col">
                  <span className="font-semibold text-grey100">
                    분야 <span className="font-sm text-[#FF345F]">*</span>
                  </span>
                  <select
                    {...register('teamSize')}
                    className="mt-3 w-[18.75rem] appearance-none rounded-md border border-grey30 bg-no-repeat px-[0.88rem] py-2 text-sm text-grey60"
                    style={{
                      backgroundImage: "url('/assets/onBoarding/selectToggle.svg')",
                      backgroundPosition: 'calc(100% - 1rem) center',
                    }}
                    value={teamSize}
                    onChange={(e) => setValue('teamSize', e.target.value)}
                  >
                    <option value="" disabled>
                      선택
                    </option>
                    <option value="1-5인">1-5인</option>
                    <option value="5-10인">5-10인</option>
                    <option value="10-20인">10-20인</option>
                    <option value="20인 이상">20인 이상</option>
                  </select>
                </div>
              </div>

              {/* 활동방식 */}
              <div>
                <span className="text-lg font-bold leading-5">
                  활동방식{' '}
                  <span className="pl-3 text-sm font-normal text-grey80">
                    <span className="font-sm text-[#FF345F]">*</span> 중복선택 가능
                  </span>
                </span>

                <div className="flex gap-x-2 pt-5">
                  {activityWay.map((el, index) => (
                    <Controller
                      key={index}
                      name="selectedFields"
                      control={control}
                      render={({ field }) => (
                        <button
                          className={`border px-3 py-1 ${selectedFields.includes(el) ? ' border-[#2563EB] bg-[#D3E1FE66] text-[#2563EB]' : 'border-[#CBD4E1] text-[#64748B]'} rounded-md`}
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
              </div>

              {/* 활동 지역/위치 */}
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-5">
                  활동 지역/위치 <span className="font-sm text-[#FF345F]">*</span>
                </span>

                <input
                  className="mt-3 h-[2.75rem] w-[16.75rem] border border-grey30 px-3 text-sm"
                  placeholder="ex) 서울특별시 동작구"
                />
              </div>

              {/* 희망 팀원 * */}
              <div>
                <span className="text-lg font-bold leading-5">
                  희망팀원{' '}
                  <span className="pl-3 text-sm font-normal text-grey80">
                    <span className="font-sm text-[#FF345F]">*</span> 중복선택 가능
                  </span>
                </span>

                <div className="flex gap-x-2 pt-5">
                  {hopeMember.map((el, index) => (
                    <Controller
                      key={index}
                      name="selectedFields"
                      control={control}
                      render={({ field }) => (
                        <button
                          className={`border px-3 py-1 ${selectedFields.includes(el) ? ' border-[#2563EB] bg-[#D3E1FE66] text-[#2563EB]' : 'border-[#CBD4E1] text-[#64748B]'} rounded-md`}
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
              </div>

              {/* 활동 지역/위치 */}
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-5">팀 링크</span>

                <input className="mt-3 h-[2.75rem] w-[25.75rem] border border-grey30 px-3 text-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
