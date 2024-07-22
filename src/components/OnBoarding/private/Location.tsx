'use client'
import { accessTokenState } from '@/context/recoil-context'
import { GetOnBoardingData, PostProfileRegion } from '@/lib/action'
import { addressData } from '@/lib/addressSelectData'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import OnBoardingHeader from '../OnBoardingHeader'

interface FormInputs {
  selectedArea: string
  selectedSubArea: string
}

export default function Location() {
  // recoil에서 accessTokenState를 가져옴
  const accessToken = useRecoilState(accessTokenState)[0]
  const [selectedArea, setSelectedArea] = useState<string>('')
  const [selectedSubArea, setSelectedSubArea] = useState<string>('')
  const router = useRouter()

  const { control, handleSubmit, watch, setValue } = useForm<FormInputs>({
    defaultValues: {
      selectedArea: '',
      selectedSubArea: '',
    },
  })

  // 온보딩 데이터 fetch
  useEffect(() => {
    if (accessToken) {
      GetOnBoardingData(accessToken).then((data) => {
        const profileRegionResponse = data.profileRegionResponse
        if (profileRegionResponse) {
          setSelectedArea(profileRegionResponse.cityName)
          setValue('selectedArea', profileRegionResponse.cityName)
          setSelectedSubArea(profileRegionResponse.divisionName)
          setValue('selectedSubArea', profileRegionResponse.divisionName)
        }
      })
    }
  }, [accessToken, setValue])

  const onSubmit = async () => {
    if (accessToken) {
      const response = await PostProfileRegion(accessToken, selectedArea, selectedSubArea)

      if (response.ok) {
        router.push('/onBoarding/person/role')
      }
    }
  }

  const onClickPrev = async () => {
    router.push('/onBoarding/person/project')
  }

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

  const isNextButtonEnabled = selectedArea !== '' && selectedSubArea !== ''

  return (
    <div className="bg-[#FCFCFD]">
      <OnBoardingHeader percentage={45} />
      <div className="flex h-screen w-full flex-col overflow-hidden lg:pt-[69px]">
        <div className="flex w-full flex-col items-center py-16">
          <div className="flex w-[90%] justify-between text-sm font-medium leading-9 text-grey60 sm:w-[55%]">
            <span>내 이력서 가이드</span>
          </div>
          <div className="flex w-[90%] flex-col items-start leading-9 sm:w-[55%]">
            <span className="text-2xl font-bold">활동 지역을 알려주세요</span>
          </div>

          <div className="flex w-[90%] flex-col gap-5 pt-8 sm:w-[55%] lg:flex-row">
            <div className="flex flex-col">
              <span className="text-lg font-bold leading-5">시/도</span>
              {/* 시/도 */}
              <select
                value={selectedArea}
                onChange={handleAreaChange}
                className="mt-5 rounded-md border px-2 py-3 text-grey60"
              >
                <option value="">지역을 선택해주세요</option>
                {addressData.map((area, index) => (
                  <option key={`${area.name}-${index}`} value={area.name}>
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
                {subAreas.map((subArea, index) => (
                  <option key={`${subArea}-${index}`} value={subArea}>
                    {subArea}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Footer */}
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="fixed bottom-0 left-0 w-full bg-white shadow-soft-shadow">
              <div className="flex justify-center gap-4 p-2 lg:justify-end lg:pr-96">
                <button
                  type="button"
                  onClick={onClickPrev}
                  className="rounded bg-grey20 px-12 py-2 text-blue-700 lg:px-16"
                >
                  이전
                </button>

                <button
                  type="submit"
                  className={`${isNextButtonEnabled ? 'bg-[#2563EB]' : 'bg-[#7EA5F8]'} rounded px-12 py-2 text-[#fff] lg:px-16`}
                  disabled={!isNextButtonEnabled}
                >
                  다음
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
