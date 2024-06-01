'use client'
import Link from 'next/link'
import { useForm, Controller } from 'react-hook-form'
import { useState } from 'react'

const ShortTerm = ['공모전', '대회', '해커톤', '사이드 프로젝트', '포트폴리오', '스터디', '창업']
const LongTerm = ['공모전', '대회', '해커톤', '사이드 프로젝트', '포트폴리오', '스터디', '창업']

interface FormInputs {
  teamName: string
  teamSize: string
  teamField: string
  selectedShortTermFields: string[]
  selectedLongTermFields: string[]
}

export default function TeamCategory() {
  const [selectedShortTermFields, setSelectedShortTermFields] = useState<string[]>([])
  const [selectedLongTermFields, setSelectedLongTermFields] = useState<string[]>([])

  const { control, handleSubmit, watch, setValue } = useForm<FormInputs>({
    defaultValues: {
      teamName: '',
      teamSize: '2~3명',
      teamField: '개발',
      selectedShortTermFields: [],
      selectedLongTermFields: [],
    },
  })

  const onSubmit = (data: FormInputs) => {
    console.log('Form Data:', data)
  }

  const toggleShortTermField = (field: string) => {
    const newFields = selectedShortTermFields.includes(field)
      ? selectedShortTermFields.filter((v) => v !== field)
      : [...selectedShortTermFields, field]
    setSelectedShortTermFields(newFields)
    setValue('selectedShortTermFields', newFields)
  }

  const toggleLongTermField = (field: string) => {
    const newFields = selectedLongTermFields.includes(field)
      ? selectedLongTermFields.filter((v) => v !== field)
      : [...selectedLongTermFields, field]
    setSelectedLongTermFields(newFields)
    setValue('selectedLongTermFields', newFields)
  }

  const formValues = watch()
  const { teamName, teamSize, teamField } = formValues
  const isNextButtonEnabled =
    (selectedShortTermFields.length > 0 || selectedLongTermFields.length > 0) && teamName && teamSize && teamField

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
            <div className="flex w-[80%] flex-col pt-16 sm:w-[55%]">
              <span className="text-lg font-bold leading-5">
                단기 <span className="text-sm font-normal text-grey80">(2개월 이내)</span>
              </span>
              <div className="flex gap-x-2 pt-5">
                {ShortTerm.map((el, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`border px-3 py-1 ${
                      selectedShortTermFields.includes(el)
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
            {/* 장기 */}
            <div className="flex w-[80%] flex-col pt-16 sm:w-[55%]">
              <span className="text-lg font-bold leading-5">
                장기 <span className="text-sm font-normal text-grey80">(2개월 이상)</span>
              </span>
              <div className="flex gap-x-2 pt-5">
                {LongTerm.map((el, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`border px-3 py-1 ${
                      selectedLongTermFields.includes(el)
                        ? 'border-[#2563EB] bg-[#D3E1FE66] text-[#2563EB]'
                        : 'border-[#CBD4E1] text-[#64748B]'
                    } rounded-md`}
                    onClick={() => toggleLongTermField(el)}
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
                      <option value="2~3명">2~3명</option>
                      <option value="4~5명">4~5명</option>
                      <option value="6~7명">6~7명</option>
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
                      <option value="개발">개발</option>
                      <option value="디자인">디자인</option>
                      <option value="기획">기획</option>
                      <option value="마케팅">마케팅</option>
                      <option value="기타">기타</option>
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
