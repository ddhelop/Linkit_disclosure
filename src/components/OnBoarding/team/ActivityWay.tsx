'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useForm, Controller } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { addressData } from '@/lib/addressSelectData'
import { TeamOnBoardingActivityWay, TeamOnBoardingData } from '@/lib/action'
import { TeamOnBoardingActivityWayFormInputs } from '@/lib/types'
import { accessTokenState } from '@/context/recoil-context'
import { useRecoilValue } from 'recoil'
import OnBoardingHeader from '../OnBoardingHeader'
import Select from '@/components/common/component/Basic/Select'

const ShortTerm = ['사무실 있음', '사무실 없음', '대면 활동 선호', '비대면 활동 선호', '대면 + 비대면']

export default function ActivityWay() {
  const router = useRouter()
  const [selectedShortTermFields, setSelectedShortTermFields] = useState<string[]>([])
  const accessToken = useRecoilValue(accessTokenState) || ''

  const { control, handleSubmit, watch, setValue } = useForm<TeamOnBoardingActivityWayFormInputs>({
    defaultValues: {
      cityName: '',
      divisionName: '',
      activityTagNames: [],
    },
  })

  const selectedArea = watch('cityName')
  const selectedSubArea = watch('divisionName')

  const subAreas = addressData.find((area) => area.name === selectedArea)?.subArea || []

  // Fetch onboarding data
  useEffect(() => {
    const fetchData = async () => {
      if (accessToken) {
        try {
          const data = await TeamOnBoardingData(accessToken)

          if (data.activityResponse) {
            const { activityTagName, cityName, divisionName } = data.activityResponse
            setValue('cityName', cityName || '')
            setValue('divisionName', divisionName || '')
            setValue('activityTagNames', activityTagName || [])
            setSelectedShortTermFields(activityTagName || [])
          }
        } catch (error) {
          console.error('Failed to fetch onboarding data', error)
        }
      }
    }
    fetchData()
  }, [setValue, accessToken])

  const onSubmit = async (data: TeamOnBoardingActivityWayFormInputs) => {
    const response = await TeamOnBoardingActivityWay(accessToken, data)

    if (response.ok) {
      router.push('/onBoarding/team/profile')
    }
  }

  const toggleShortTermField = (field: string) => {
    const newFields = selectedShortTermFields.includes(field)
      ? selectedShortTermFields.filter((v) => v !== field)
      : [...selectedShortTermFields, field]
    setSelectedShortTermFields(newFields)
    setValue('activityTagNames', newFields)
  }

  const formValues = watch()
  const isNextButtonEnabled = selectedShortTermFields.length > 0 && selectedArea && selectedSubArea

  return (
    <div className="h-screen bg-[#FFF]">
      <OnBoardingHeader percentage={55} />
      <div className="flex w-full flex-col pt-6 lg:py-[69px]">
        <div className="flex w-full flex-col items-center pb-24 pt-16">
          <div className="flex w-[90%] justify-between text-sm font-medium leading-9 text-grey60 sm:w-[55%]">
            <span>팀 소개서 가이드</span>
          </div>
          <div className="flex w-[90%] flex-col items-start leading-9 sm:w-[55%]">
            <span className="text-2xl font-bold">활동 형태를 선택해 주세요</span>
            <span className="text-grey60">*중복선택 가능</span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col items-center">
            {/* Activity Type */}
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
                활동 지역 <span className="pl-1 text-sm font-normal text-[#FF345F]">*</span>
              </span>
            </div>

            <div className="flex w-[90%] flex-col gap-5 pt-8 sm:w-[55%] lg:flex-row">
              <div className="flex flex-col gap-3">
                <span className="text-lg font-bold leading-5">시/도</span>
                {/* 시/도 */}
                <Controller
                  name="cityName"
                  control={control}
                  render={({ field }) => (
                    <Select
                      name={field.name}
                      selectedValue={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      className="px-3 py-3"
                      options={[
                        { value: '', label: '지역 선택' },
                        ...addressData.map((area) => ({ value: area.name, label: area.name })),
                      ]}
                    />
                  )}
                />
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-lg font-bold leading-5">시/군/구</span>

                {/* 시/군/구 */}
                <Controller
                  name="divisionName"
                  control={control}
                  render={({ field }) => (
                    <Select
                      name={field.name}
                      className="px-3 py-3"
                      selectedValue={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      options={[
                        { value: '', label: '시,군,구 선택' },
                        ...subAreas.map((subArea) => ({ value: subArea, label: subArea })),
                      ]}
                    />
                  )}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* Footer */}
      <div className="fixed bottom-0 left-0 w-full bg-[#fff] shadow-soft-shadow">
        <div className="flex justify-center p-4 lg:justify-end lg:pr-96">
          <Link href="/onBoarding/select">
            <button className=" mr-4 rounded bg-grey20 px-12 py-2 text-blue-700 lg:px-16">이전</button>
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
