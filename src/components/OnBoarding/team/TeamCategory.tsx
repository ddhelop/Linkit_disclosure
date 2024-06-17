'use client'
import Link from 'next/link'
import { useForm, Controller } from 'react-hook-form'
import { useState } from 'react'
import { TeamOnBoardingField } from '@/lib/action'
import { access } from 'fs'

const ShortTerm = ['공모전', '대회', '해커톤', '사이드 프로젝트', '포트폴리오', '스터디', '창업']

interface FormInputs {
  teamName: string
  teamSize: string
  teamField: string
  teamBuildingFieldNames: string[]
}

export default function TeamCategory() {
  const [teamBuildingFieldNames, setTeamBuildingFieldNames] = useState<string[]>([])

  const { control, handleSubmit, watch, setValue } = useForm<FormInputs>({
    defaultValues: {
      teamName: '',
      teamSize: '',
      teamField: '',
      teamBuildingFieldNames: [],
    },
  })

  const onSubmit = async (data: FormInputs) => {
    const accessToken = localStorage.getItem('accessToken') || ''
    const response = await TeamOnBoardingField(accessToken, data)

    console.log('Data:', response)
  }

  const toggleShortTermField = (field: string) => {
    const newFields = teamBuildingFieldNames.includes(field)
      ? teamBuildingFieldNames.filter((v) => v !== field)
      : [...teamBuildingFieldNames, field]
    setTeamBuildingFieldNames(newFields)
    setValue('teamBuildingFieldNames', newFields)
  }

  const formValues = watch()
  const { teamName, teamSize, teamField } = formValues
  const isNextButtonEnabled = teamBuildingFieldNames.length > 0 && teamName && teamSize && teamField

  return (
    <div className="bg-[#FCFCFD]">
      <div className="flex w-full flex-col py-[69px]">
        <div className="t-[69px] fixed h-[0.18rem] w-2/3 bg-[#2563EB]"></div>
        <div className="flex w-full flex-col items-center py-16">
          <div className="flex w-[80%] justify-between text-sm font-medium leading-9 text-grey60 sm:w-[55%]">
            <span>팀 이력서 가이드</span>
          </div>
          <div className="flex w-[80%] flex-col items-start leading-9 sm:w-[55%]">
            <span className="text-2xl font-bold">희망하는 팀 빌딩분야를 알려주세요</span>
            <span className="text-grey60">*중복선택 가능</span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col items-center">
            {/* 단기 */}
            <div className="flex w-[80%] flex-col pt-8 sm:w-[55%]">
              <div className="flex gap-x-2">
                {ShortTerm.map((el, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`border px-3 py-1 ${
                      teamBuildingFieldNames.includes(el)
                        ? 'border-[#2563EB] bg-[#D3E1FE66] text-[#2563EB]'
                        : 'border-[#CBD4E1] text-[#64748B]'
                    } rounded-md`}
                    onClick={() => toggleShortTermField(el)}
                  >
                    {el}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex w-[80%] flex-col pt-16 sm:w-[55%]">
              <span className="text-lg font-bold leading-5">
                팀명을 입력해주세요 <span className="pl-1 text-sm font-normal text-[#FF345F]">*</span>
              </span>
              <Controller
                name="teamName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    type="text"
                    className="mt-[1.19rem] w-[65%] rounded-lg border border-grey30 px-3 py-3"
                    {...field}
                  />
                )}
              />
            </div>

            <div className="flex w-[80%] gap-5 pt-16 sm:w-[55%]">
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-5">
                  규모 <span className="pl-1 text-sm font-normal text-[#FF345F]">*</span>
                </span>
                <Controller
                  name="teamSize"
                  control={control}
                  defaultValue="2~3명"
                  render={({ field }) => (
                    <select className="mt-[1.19rem] w-[17.5rem] rounded-lg border border-grey30 px-3 py-3" {...field}>
                      <option value="1-5인">1-5인</option>
                      <option value="5-10인">5-10인</option>
                      <option value="10-20인">10-20인</option>
                      <option value="20인 이상">20인 이상</option>
                    </select>
                  )}
                />
              </div>

              <div className="flex flex-col">
                <span className="text-lg font-bold leading-5">
                  분야 <span className="pl-1 text-sm font-normal text-[#FF345F]">*</span>
                </span>
                <Controller
                  name="teamField"
                  control={control}
                  defaultValue="개발"
                  render={({ field }) => (
                    <select className="mt-[1.19rem] w-[17.5rem] rounded-lg border border-grey30 px-3 py-3" {...field}>
                      <option value="딥테크">딥테크</option>
                      <option value="핀테크">핀테크</option>
                      <option value="이커머스">이커머스</option>
                      <option value="패션/뷰티">패션/뷰티</option>
                      <option value="바이오/의료">바이오/의료</option>
                      <option value="물류/유통">물류/유통</option>
                      <option value="블록체인">블록체인</option>
                      <option value="AI">AI</option>
                      <option value="SaaS">SaaS</option>
                    </select>
                  )}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* Footer */}
      <div className="bg-white fixed bottom-0 left-0 w-full shadow-soft-shadow">
        <div className="flex justify-end p-4 pr-96">
          <Link href="/onBoarding/select">
            <button className="bg-blue-100 text-blue-700 mr-4 rounded bg-grey20 px-16 py-2">이전</button>
          </Link>
          <button
            className={`mr-4 rounded px-16 py-2 ${
              isNextButtonEnabled ? 'bg-[#2563EB] text-[#fff]' : 'bg-[#7EA5F8] text-[#fff]'
            }`}
            disabled={!isNextButtonEnabled}
            onClick={handleSubmit(onSubmit)}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  )
}
