'use client'
import { ChangeEvent, useEffect, useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { addressData } from '@/lib/addressSelectData'
import { TeamOnBoardingActivityWay, TeamOnBoardingData } from '@/lib/action'
import { TeamOnBoardingActivityWayFormInputs } from '@/lib/types'

const ShortTerm = ['사무실 있음', '사무실 없음', '대면 활동 선호', '대면 + 비대면']

export default function ActivityWay() {
  const router = useRouter()
  const [selectedShortTermFields, setSelectedShortTermFields] = useState<string[]>([])
  const [selectedArea, setSelectedArea] = useState<string>('')
  const [selectedSubArea, setSelectedSubArea] = useState<string>('')

  const { control, handleSubmit, watch, setValue } = useForm<TeamOnBoardingActivityWayFormInputs>({
    defaultValues: {
      selectedArea: '',
      selectedSubArea: '',
      selectedShortTermFields: [],
    },
  })

  const handleAreaChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setSelectedArea(value)
    setValue('selectedArea', value)
    setSelectedSubArea('')
    setValue('selectedSubArea', '')
  }

  const handleSubAreaChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setSelectedSubArea(value)
    setValue('selectedSubArea', value)
  }

  const subAreas = addressData.find((area) => area.name === selectedArea)?.subArea || []

  // 팀온보딩 데이터 가져오기
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken') || ''
    const fetchData = async () => {
      if (accessToken) {
        try {
          const data = await TeamOnBoardingData(accessToken)
          console.log('onBoardingData', data)

          if (data.activityResponse) {
            const { activityTagName, cityName, divisionName } = data.activityResponse
            setValue('selectedArea', cityName || '')
            setValue('selectedSubArea', divisionName || '')
            setValue('selectedShortTermFields', activityTagName || [])
            setSelectedArea(cityName || '')
            setSelectedSubArea(divisionName || '')
            setSelectedShortTermFields(activityTagName || [])
          }
        } catch (error) {
          console.error('Failed to fetch onboarding data', error)
        }
      }
    }
    fetchData()
  }, [setValue])

  const onSubmit = async (data: TeamOnBoardingActivityWayFormInputs) => {
    const accessToken = localStorage.getItem('accessToken') || ''
    const response = await TeamOnBoardingActivityWay(accessToken, data)

    console.log(response)
    if (response.ok) {
      router.push('/onBoarding/team/profile')
    }
  }

  const toggleShortTermField = (field: string) => {
    const newFields = selectedShortTermFields.includes(field)
      ? selectedShortTermFields.filter((v) => v !== field)
      : [...selectedShortTermFields, field]
    setSelectedShortTermFields(newFields)
    setValue('selectedShortTermFields', newFields)
  }

  const formValues = watch()
  const isNextButtonEnabled = selectedShortTermFields.length > 0 && selectedArea && selectedSubArea

  return (
    <div className="bg-[#FCFCFD]">
      <div className="flex w-full flex-col lg:py-[69px]">
        <div className="fixed mt-[53px] h-[0.18rem] w-2/3 bg-[#2563EB] lg:mt-0"></div>
        <div className="flex w-full flex-col items-center pb-24 pt-16">
          <div className="flex w-[90%] justify-between text-sm font-medium leading-9 text-grey60 sm:w-[55%]">
            <span>팀 이력서 가이드</span>
          </div>
          <div className="flex w-[90%] flex-col items-start leading-9 sm:w-[55%]">
            <span className="text-2xl font-bold">활동방식을 선택해주세요</span>
            <span className="text-grey60">*중복선택 가능</span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col items-center">
            {/* 활동 방식 */}
            <div className="flex w-[90%] flex-col sm:w-[55%]">
              <div className="flex flex-wrap gap-2 pt-5">
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

            <div className="flex w-[90%] flex-col pt-16 sm:w-[55%]">
              <span className="text-lg font-bold leading-5">
                활동 지역/위치 <span className="pl-1 text-sm font-normal text-[#FF345F]">*</span>
              </span>
            </div>

            <div className="flex w-[90%] flex-col gap-5 pt-8 lg:w-[55%] lg:flex-row">
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-5">시/도</span>
                {/* 시/도 */}
                <select
                  value={selectedArea}
                  onChange={handleAreaChange}
                  className="mt-5 rounded-md border px-2 py-3 text-grey60"
                >
                  <option value="">지역을 선택해주세요</option>
                  {addressData.map((area) => (
                    <option key={area.name} value={area.name}>
                      {area.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <span className="text-lg font-bold leading-5">시/군/구</span>

                {/* 시/군/구 */}
                <select
                  value={selectedSubArea}
                  onChange={handleSubAreaChange}
                  className="mt-5 rounded-md border px-2 py-3 text-grey60"
                >
                  <option value="">시,군,구를 선택해주세요</option>
                  {subAreas.map((subArea) => (
                    <option key={subArea} value={subArea}>
                      {subArea}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* Footer */}
      <div className="fixed bottom-0 left-0 w-full bg-[#fff] shadow-soft-shadow">
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
