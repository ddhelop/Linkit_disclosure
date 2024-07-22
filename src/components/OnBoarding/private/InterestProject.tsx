'use client'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { GetOnBoardingData, PostProfileTeamBuildingField } from '@/lib/action'
import { useRecoilValue } from 'recoil'
import { accessTokenState } from '@/context/recoil-context'
import OnBoardingHeader from '../OnBoardingHeader'

const ShortTerm: string[] = ['공모전', '대회', '해커톤', '사이드 프로젝트', '포트폴리오', '스터디', '창업']

interface FormValues {
  selectedShortTermFields: string[]
}

export default function InterestProject() {
  const router = useRouter()
  const [selectedShortTermFields, setSelectedShortTermFields] = useState<string[]>([])
  const accessToken = useRecoilValue(accessTokenState) || ''

  // 온보딩 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      if (accessToken) {
        try {
          const data = await GetOnBoardingData(accessToken)
          if (data && data.profileTeamBuildingFieldResponse) {
            const { teamBuildingFieldNames } = data.profileTeamBuildingFieldResponse
            setSelectedShortTermFields(teamBuildingFieldNames ?? [])
          }
        } catch (error) {
          console.error('Failed to fetch onboarding data', error)
        }
      }
    }
    fetchData()
  }, [accessToken])

  const {
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  // 온보딩 데이터 저장하기
  const onSubmit = async () => {
    const response = await PostProfileTeamBuildingField(accessToken, selectedShortTermFields)
    if (response?.ok) {
      router.push('/onBoarding/person/location')
    }
  }

  const onClickPrev = async () => {
    const response = await PostProfileTeamBuildingField(accessToken, selectedShortTermFields)
    if (response?.ok) {
      router.push('/onBoarding/person/select')
    }
  }

  const toggleSelection = (field: string) => {
    setSelectedShortTermFields((prevSelected) =>
      prevSelected.includes(field) ? prevSelected.filter((item) => item !== field) : [...prevSelected, field],
    )
  }

  return (
    <div>
      <OnBoardingHeader percentage={33} />
      <div className="flex h-screen w-full flex-col overflow-hidden bg-[#fff] lg:pt-[69px]">
        <div className="flex w-full flex-col items-center py-16">
          <div className="flex w-[90%] justify-between text-sm font-medium leading-9 text-grey60 sm:w-[55%]">
            <span>내 이력서 가이드</span>
          </div>
          <div className="flex w-[90%] flex-col items-start leading-9 sm:w-[55%]">
            <span className="text-2xl font-bold">관심있는 프로젝트를 선택해주세요</span>
            <span className="pt-1 text-sm text-grey60">*중복선택 가능</span>
          </div>
          {/* 단기 */}
          <div className="flex w-[90%] flex-col pt-8 sm:w-[55%]">
            <div className="flex flex-col gap-x-2 gap-y-3 lg:flex-row">
              {ShortTerm.map((el, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => toggleSelection(el)}
                  className={`border px-3 py-2 lg:py-1 ${
                    selectedShortTermFields.includes(el)
                      ? 'border-[#2563EB] bg-[#D3E1FE66] text-[#2563EB]'
                      : 'border-[#CBD4E1] text-[#64748B]'
                  } rounded-md`}
                >
                  {el}
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="fixed bottom-0 left-0 w-full shadow-soft-shadow lg:bg-[#fff]">
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
                  className={`${selectedShortTermFields.length > 0 ? 'bg-[#2563EB]' : 'bg-[#7EA5F8]'} rounded  px-12 py-2 text-[#fff] lg:px-16`}
                  disabled={!(selectedShortTermFields.length > 0)}
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
