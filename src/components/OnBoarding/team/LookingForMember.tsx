'use client'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { TeamOnBoardingData } from '@/lib/action'

const positions = ['기획', '마케팅', '개발자', '디자이너', '리서치', '기타']

interface FormInputs {
  teamName: string
  teamSize: string
  teamField: string
  selectedPositions: string[]
}

export default function LookingForMember() {
  const [selectedPositions, setSelectedPositions] = useState<string[]>([])
  const { control, handleSubmit, watch, setValue } = useForm<FormInputs>({
    defaultValues: {
      teamName: '',
      teamSize: '',
      teamField: '',
      selectedPositions: [],
    },
  })

  // 팀온보딩 데이터 가져오기
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken') || ''
    const fetchData = async () => {
      if (accessToken) {
        try {
          const data = await TeamOnBoardingData(accessToken)
          console.log('onBoardingData', data)
        } catch (error) {
          console.error('Failed to fetch onboarding data', error)
        }
      }
    }
    fetchData()
  }, [setValue])

  // Watch form fields
  const { teamName, teamSize, teamField } = watch()

  // Handle form submission
  const onSubmit = (data: FormInputs) => {
    console.log('Form Data:', data)
  }

  // Toggle position selection
  const togglePosition = (position: string) => {
    const newPositions = selectedPositions.includes(position)
      ? selectedPositions.filter((v) => v !== position)
      : [...selectedPositions, position]
    setSelectedPositions(newPositions)
    setValue('selectedPositions', newPositions)
  }

  // Enable the "Next" button only if one or more positions are selected
  const isNextButtonEnabled = selectedPositions.length > 0

  return (
    <div className="bg-[#FCFCFD]">
      <div className="flex w-full flex-col lg:py-[69px]">
        <div className="fixed mt-[53px] h-[0.18rem] w-2/3 bg-[#2563EB] lg:mt-0"></div>
        <div className="flex w-full flex-col items-center py-16">
          <div className="flex w-[90%] justify-between text-sm font-medium leading-9 text-grey60 sm:w-[55%]">
            <span>팀 이력서 가이드</span>
          </div>
          <div className="flex w-[90%] flex-col items-start leading-9 sm:w-[55%]">
            <span className="text-2xl font-bold">구하는 팀원을 알려주세요</span>
            <span className="text-grey60">*중복선택 가능</span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col items-center">
            {/* 구하는 팀원 */}
            <div className="flex w-[90%] flex-col pt-5 sm:w-[55%]">
              <div className="flex flex-wrap gap-2  lg:pt-5">
                {positions.map((position, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`border px-3 py-1 ${
                      selectedPositions.includes(position)
                        ? 'border-[#2563EB] bg-[#D3E1FE66] text-[#2563EB]'
                        : 'border-[#CBD4E1] text-[#64748B]'
                    } rounded-md`}
                    onClick={() => togglePosition(position)}
                  >
                    {position}
                  </button>
                ))}
              </div>
            </div>
          </form>

          {/* 이벤트 */}
          {selectedPositions.length > 0 && (
            <div className="mt-12 flex w-[80%] flex-col rounded-xl border border-grey30 px-6 py-[1.12rem] sm:w-[55%]">
              <span className="mb-2 font-semibold text-grey90">
                🎉 링킷 오픈 이벤트<span className=" pl-3 font-medium text-grey50">(2024.05.24~2024.10.10)</span>
              </span>
              {selectedPositions.map((position, index) => (
                <span key={index} className="pt-2 text-grey80">
                  - {position} 공고를 무료로 N회 올릴 수 있어요
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Footer */}
      <div className="bg-white fixed bottom-0 left-0 w-full shadow-soft-shadow">
        <div className="flex justify-center p-4 lg:justify-end lg:pr-96">
          <Link href="/onBoarding/select">
            <button className="bg-blue-100 text-blue-700 mr-4 rounded bg-grey20 px-12 py-2 lg:px-16">이전</button>
          </Link>
          <button
            className={`mr-4 rounded px-12 py-2 lg:px-16 ${
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
