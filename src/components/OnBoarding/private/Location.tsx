'use client'
import { accessTokenState } from '@/context/recoil-context'
import { GetOnBoardingData, PostProfileRegion } from '@/lib/action'
import { addressData } from '@/lib/addressSelectData'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'

interface FormInputs {
  selectedArea: string
  selectedSubArea: string
}

export default function Location() {
  // recoil에서 accessTokenState를 가져옴
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState)
  const [selectedArea, setSelectedArea] = useState<string>('')
  const [selectedSubArea, setSelectedSubArea] = useState<string>('')
  const router = useRouter()

  // accessToken이 없을 경우 로그인 페이지로 이동
  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken')
    if (!storedAccessToken || storedAccessToken === 'undefined') {
      alert('로그인이 필요한 페이지입니다.')
      router.push('/login')
    }
  }, [accessToken, router])

  // 온보딩 데이터 fetch
  useEffect(() => {
    if (accessToken) {
      GetOnBoardingData(accessToken).then((data) => {
        console.log(data)
      })
    }
  }, [accessToken])

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

  const { control, handleSubmit, watch, setValue } = useForm<FormInputs>({
    defaultValues: {
      selectedArea: '',
      selectedSubArea: '',
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

  const isNextButtonEnabled = selectedArea !== '' && selectedSubArea !== ''

  return (
    <div className="bg-[#FCFCFD]">
      <div className="flex h-screen w-full flex-col overflow-hidden pt-[69px]">
        <div className="t-[69px] fixed h-[0.18rem] w-2/3 bg-[#2563EB]"></div>
        <div className="flex w-full flex-col items-center py-16">
          <div className="flex w-[80%] justify-between text-sm font-medium leading-9 text-grey60 sm:w-[55%]">
            <span>내 이력서 가이드</span>
          </div>
          <div className="flex w-[80%] flex-col items-start leading-9 sm:w-[55%]">
            <span className="text-2xl font-bold">활동 지역 및 위치를 알려주세요</span>
          </div>

          <div className="flex w-[80%] gap-5 pt-8 sm:w-[55%]">
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
            <div className="bg-white fixed bottom-0 left-0 w-full shadow-soft-shadow">
              <div className="flex justify-end p-4 pr-96">
                <button
                  type="button"
                  onClick={onClickPrev}
                  className="bg-blue-100 text-blue-700 mr-4 rounded bg-grey20 px-16 py-2"
                >
                  이전
                </button>

                <button
                  type="submit"
                  className={`${isNextButtonEnabled ? 'bg-[#2563EB]' : 'bg-[#7EA5F8]'} mr-4 rounded px-16 py-2 text-[#fff]`}
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
